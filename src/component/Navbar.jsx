// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Navbar.css';

export default function Navbar() {
  // const [buyers, setBuyers] = useState([]);

  // // Function to add a member (you can modify this as per your requirements)
  // const addMember = () => {
  //   // Add functionality to add a member
  //   console.log("Add this business")
  // };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container ">
      <a className="navbar-brand" href="/">
          <span style={{ fontSize: '24px', fontFamily: 'Arial', fontWeight: 'bold', color: '#1877F2' }}>MY</span>
          <span style={{ fontFamily: 'Arial', color: '#1877F2' }}>book</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              
            </li>
            {/* Add other navbar items as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
