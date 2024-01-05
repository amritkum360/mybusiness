import React, { useState } from 'react';
import Navbar from './Navbar';

const AddMember = () => {
  const [buyerName, setBuyerName] = useState('');

  const handleNameChange = (e) => {
    setBuyerName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://dataserver-l2f9.onrender.com/addmember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: buyerName }),
      });

      if (response.ok) {
        // Buyer added successfully
        console.log('Buyer added successfully');
        // Reset form field
        setBuyerName('');

        // Redirect to home page after awaiting the collection creation
        await waitForCollectionCreation(); // Replace this line with the actual function to wait for collection creation
        window.location.href = '/'; // Redirect to the home page ("/")
      } else {
        console.error('Error adding buyer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to simulate waiting for collection creation (Replace this with your logic)
  const waitForCollectionCreation = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000); // Simulating a delay (2 seconds) for collection creation
    });
  };

  return (
    <>
    
    <Navbar />
    <div className="container">
      <div className="box mt-5 p-4 border rounded shadow-sm">
        <h1 className="mb-4">Buyer Name Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="buyerName" className="form-label">
              Buyer Name
            </label>
            <input
              type="text"
              className="form-control"
              id="buyerName"
              placeholder="Enter buyer's name"
              value={buyerName}
              onChange={handleNameChange}
            />
          </div>
          {/* Add other form fields as needed */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddMember;
