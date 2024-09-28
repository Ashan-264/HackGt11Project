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
          <div><a href="/"><h1><span style={{ color: '#FFFFFF' }}>VISUAL</span><span className="logopt2">EASE</span></h1></a></div>
        </div>

        <a id="burger" onClick={toggleNav} className="toggle-button burger burgerinitial">
          <span className="bar line1"></span>
          <span className="bar line2"></span>
          <span className="bar line3"></span>
        </a>

      </div>


      <div id="navRight" className="navRight">
        <ul>
          <li><a href="/visualize"><button component={Link} className="menuItem">Term Visualizer</button></a></li>
          <li><a href="/termfinder"><button component={Link} className="menuItem">Term Finder</button></a></li>
          <li><a href="/about"><button component={Link} className="menuItem">About</button></a></li>
        </ul>
      </div>
    </nav>
  )
}