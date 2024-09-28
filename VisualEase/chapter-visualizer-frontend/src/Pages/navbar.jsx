import React from 'react'
import "./navbar.css"
import { Link } from "react-router-dom";
import logo from '../logo.svg'

export default function Navbar() {
  const toggleNav = () => {
    var navRightElement = document.getElementById("navRight");
    navRightElement.classList.toggle("active");
    var burgerElement = document.getElementById("burger");
    burgerElement.classList.toggle("toggle");
  }

  return (
    <nav>
      <div className="mobile">

        <div className="navLeft">
          <div><a href="/"><img src={logo} /></a></div>
          <div><a href="/"><h1><span style={{ color: '#000000' }}>Visual</span><span style={{ color: '#000000' }}>Ease</span></h1></a></div>
        </div>

        <a id="burger" onClick={toggleNav} className="toggle-button burger burgerinitial">
          <span className="bar line1"></span>
          <span className="bar line2"></span>
          <span className="bar line3"></span>
        </a>

      </div>


      <div id="navRight" className="navRight">
        <ul>
          <li><a href="/visualize"><button component={Link} className="menuItem">Visualize</button></a></li>
          <li><a href="/Text Chunker"><button component={Link} className="menuItem">TextChunker</button></a></li>
          <li><a href="/term"><button component={Link} className="menuItem">Term</button></a></li>
          <li><a href="/about"><button component={Link} className="menuItem">About</button></a></li>
        </ul>
      </div>
    </nav>
  )
}