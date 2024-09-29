import React, { useState } from 'react';
import "./home.css"

export default function home() {

  document.title = "VisualEase";

  return (
    <div className="homeContainer">
      <div style={{paddingLeft: '20px', paddingRight: '20px'}}><p class="homeTitle">Welcome to VisualEase!</p></div>
      <h1 className="slogan" data-aos="fade-up" data-aos-duration="3000">Visualizing, made <span className="sloganpt2">easy</span></h1>
      <p className="homeSubTitle"style={{paddingLeft: '20px', paddingRight: '20px'}}>Transform your boring textbook to simple terms and definitions or images for you to study woo.</p>
      <a href="/visualize"><button class="tryButton">Try it now!</button></a>
    </div>
  )
}
