import React, { useState } from 'react';
import "./home.css"

export default function home() {

  document.title = "VisualEase";

  return (
    <div className="homeContainer">
      <p class="homeTitle" data-aos="fade-up" data-aos-duration="3000">Welcome to VisualEase!</p>
      <h1 className="slogan" data-aos="fade-up" data-aos-duration="3000">Visualizing, made <span className="sloganpt2">easy</span></h1>
      <p data-aos="fade-up" data-aos-duration="3000">Transform your boring textbook to simple terms and definitions or images for you to study woo.</p>
      <a href="/visualize"><button class="tryButton" data-aos="fade-up" data-aos-duration="3000">Try it now!</button></a>
    </div>
  )
}
