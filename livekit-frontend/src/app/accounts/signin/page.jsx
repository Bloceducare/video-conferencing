"use client"
import React, { useState } from 'react';
import './signin.module.css';

const SignIn = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const activateButton = (event) => {
    // Add any button activation logic here
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = document.getElementById('Username').value;
    const password = document.getElementById('password').value;

    const formData = {
      username: username,
      password: password,
    };

    fetch('/accounts/signin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful response
        alert('login success');
        window.location.href = ''; // Replace with the desired URL
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className="all">

      <form method="post" id="signin-form" onSubmit={handleSubmit} className='form'>
        <div className="cent">
          <p>Web3bridge Meet</p>
          <p>
            <a href="#login">login</a>
          </p>
        </div>

        <label className='label' htmlFor="Username">Username</label>
        <input className='input' type="text" id="Username" name="Username" required />

        <label className='label' htmlFor="password">password:</label>
        <input className='input' type="password" id="password" name="password" required />

        <div className="additional-options">
          <label className="checkbox-container label">
            Remember this device
            <input className='' type="checkbox" name="remember-me" />
            <span className="checkmark"></span>
          </label>
          <a href="/accounts/reset_password/">Forgot Password?</a>
        </div>

        <button className="reg" type="submit">
          Log in
        </button>

        <div className="line-container">
          <hr />
          <div className="content">or log in with</div>
          <hr />
        </div>

        <a href="/github_login/" className="github-button" type="submit">
          <img
            src="/githublogo.png"
            alt="GitHub Logo"
          />
          GitHub
        </a>
      </form>
    </div>
  );
};

export default SignIn;
