import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const AddDetails = () => {
  const { collectionName } = useParams();

  // Function to get today's date in the format "YYYY-MM-DD"
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, '0'); // January is 0
    const day = `${today.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [weight, setWeight] = useState('');
  const [rate, setRate] = useState('');
  const [date, setDate] = useState(getTodayDate()); // Initialize date with today's date
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if weight, rate, or date is null
    if (!weight || !rate || !date) {
      setError('Please enter values for weight, rate, and date.');
      return;
    }

    try {
      const response = await fetch(`https://dataserver-l2f9.onrender.com/adddetail/${collectionName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weight: Number(weight), rate: Number(rate), date }),
      });

      if (response.ok) {
        console.log('Details added successfully');
        setWeight('');
        setRate('');
        setDate(getTodayDate()); // Reset date to today's date after successful submission
        setError('');

        // Redirect to the detail page after awaiting the data to be saved
        await waitForDataSaved(); // Replace this with the function that awaits data to be saved
        window.location.href = `/detail/${collectionName}`; // Redirect to the detail page
      } else {
        console.error('Error adding details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to simulate waiting for the data to be saved (Replace this with your actual logic)
  const waitForDataSaved = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000); // Simulating a delay (2 seconds) for the data to be saved
    });
  };

  return (
    <>
    <Navbar />
    
    <div className="container mt-4">
      <h2>Add Details for Collection: {collectionName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">Weight</label>
          <input
            type="text"
            className="form-control"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rate" className="form-label">Rate</label>
          <input
            type="text"
            className="form-control"
            id="rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </>
  );
};

export default AddDetails;
