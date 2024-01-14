"use client"
import React, { useState } from 'react';

const SignUp = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const activateButton = (event) => {
    // Add any button activation logic here
  };

  return (
    <div className="all bg-white">
      {/* <nav className="navbar flex justify-between items-center p-10">
        <div className="logo font-bold m-15">Web3bridge Meet</div>
        <div className="menu flex justify-between">
          <button
            className="button"
            style={{ backgroundColor: '#333' }}
            onClick={(e) => activateButton(e)}
          >
            <a href="#">Register</a>
          </button>
          <button
            className="button"
            onClick={(e) => activateButton(e)}
          >
            <a href="/acounts/login.html">Login</a>
          </button>
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="toggle-icon" id="toggleIcon">
            &#9776;
          </div>
          <div
            className="cancel-icon"
            id="cancelIcon"
            style={{ display: menuActive ? 'block' : 'none' }}
          >
            &#10006;
          </div>
          <div
            className={`menu-buttons ${menuActive ? 'active' : ''}`}
          >
            <button
              className="button"
              onClick={(e) => activateButton(e)}
            >
              <a href="signup.html">Register</a>
            </button>
            <button
              className="button"
              onClick={(e) => activateButton(e)}
            >
              <a href="login.html">Login</a>
            </button>
          </div>
        </div>
      </nav> */}

      <form className="p-8">
        <div className="cent text-center mb-5">
          <p>Web3bridge Meet</p>
          <p>
            <a href="#register">Register</a>
          </p>
        </div>

        <label htmlFor="username" className="block mb-2 font-bold">
          Name:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="input"
          required
        />

        {/* Add the rest of your form fields here using Tailwind CSS classes */}
        
        <label htmlFor="email" className="block mb-2 font-bold">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input"
          required
        />

        <label htmlFor="password" className="block mb-2 font-bold">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="input"
          required
        />

        <button className="reg" type="submit">
          Sign Up
        </button>

        <div className="line-container mt-5 mb-5">
          <hr className="inline-block w-30 border-0 h-1 bg-gray-300" />
          <div className="content inline-block px-5">or register with</div>
          <hr className="inline-block w-30 border-0 h-1 bg-gray-300" />
        </div>

        <button className="github-button" type="submit">
          <img src="images/githublogo.png" alt="GitHub Logo" className="w-5 h-5 mr-2" />
          GitHub
        </button>
      </form>
    </div>
  );
};

export default SignUp;
