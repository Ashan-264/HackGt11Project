from flask import Flask, request, jsonify, send_file
from dotenv import load_dotenv
from groq import Groq
import os
from flask_cors import CORS  # Import CORS



from PIL import Image
import io
import torch
from min_dalle import MinDalle




# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


model = MinDalle(
    models_root='./pretrained',
    dtype=torch.float32,
    device='cpu',
    is_mega=True, 
    is_reusable=True
) 

@app.route('/generate_image', methods=['POST'])
def generate_image():
    text = request.form['text']
    image = model.generate_image(
        text=text,
        seed=-1,
        grid_size=1,
        is_seamless=False,
        temperature=1,
        top_k=256,
        supercondition_factor=32,
        is_verbose=False
    )
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    return send_file(img_byte_arr, mimetype='image/png')

# Get the Groq API key from the environment
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY)

@app.route('/extract_terms', methods=['POST'])
def extract_terms():
    data = request.json
    text = data.get('text')
    study_level = data.get('level')

    # Log the received input
    print(f"Received text: {text}")
    print(f"Study level: {study_level}")

    # Construct the prompt for the LLM
    prompt = f"Extract uncommon terms and definitions from the following text for a {study_level} student: {text}"
    
    # Log the constructed prompt
    print(f"Constructed prompt: {prompt}")

    response = client.chat.completions.create(
        messages=[
            {"role": "user", "content": prompt}
        ],
        model="llama3-70b-8192"
    )

    # Log the response from the Groq API
    print(f"Groq API response: {response}")

    result = response.choices[0].message.content
    
    # Log the final result
    print(f"Final result: {result}")
    
    return jsonify({"terms_and_definitions": result})

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Run Flask on port 5001
    app.run(debug=True)
