from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from gradio_client import Client
import shutil
import os

app = Flask(__name__)
# Allow CORS for specific origin (your React app on localhost:3000)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Directly include your API token in the script
hf_token = "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" # Enter API Key

# Set up the client with the specific model
client = Client("black-forest-labs/FLUX.1-schnell", hf_token=hf_token)

# Define your desired save directory and ensure it exists
save_directory = "generated_images"
if not os.path.exists(save_directory):
    os.makedirs(save_directory)

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.json
    prompt = data.get('textPart')
    
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    try:
        # Make the prediction
        result = client.predict(
            prompt=prompt,
            seed=0,
            randomize_seed=True,
            width=1024,
            height=1024,
            num_inference_steps=4,
            api_name="/infer"
        )

        # Assuming the result returns a tuple where the first element is the image path
        image_path, _ = result

        # Define your desired save directory and file name
        save_directory = "C:\\Users\\User\\Documents\\New folder\\HackGt11Project\\VisualEase\\backend\\GroqAPI"
        save_path = f"{save_directory}\\generated_image.webp"

# Copy the file to the new location
        shutil.copy(image_path, save_path)

        print(f"Image saved at {save_path}")


        # Define the save path
        save_path = os.path.join(save_directory, "generated_image.webp")

        # Copy the file to the new location
        shutil.copy(image_path, save_path)

        return jsonify({'imageUrl': save_path})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generated_images/<filename>')
def send_image(filename):
    return send_from_directory(save_directory, filename)

if __name__ == '__main__':
    # Run the Flask app on port 5002
    app.run(host='0.0.0.0', port=5002)
