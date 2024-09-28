import React from 'react'

export default function termDef() {

  document.title = "termDef";

  return (
    <div className="container">
      <h1 className="contact_title">Contact Us!</h1>
      <div>
        <h2>Input Term</h2>
        <textarea>Text area</textarea>
        <h2>Input Definition</h2>
        <textarea>Text area</textarea>
      </div>
    </div>
  )
}
