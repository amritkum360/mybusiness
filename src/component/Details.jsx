import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import "./tick.css"


export default function Details() {
    

    const { collectionId } = useParams(); // Extract collectionName from URL params
    const [collectionDetails, setCollectionDetails] = useState(null);
    const [paidStatuses, setPaidStatuses] = useState([]);
    const [showPaidDetails, setShowPaidDetails] = useState(false); // State to control displaying paid details
    const [showUnpaidDetails, setShowUnpaidDetails] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    
    useEffect(() => {
        // Fetch inner details of the collection based on collectionId
        fetch(`https://dataserver-l2f9.onrender.com/api/collections/${collectionId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCollectionDetails(data); // Set the fetched details in state
            })
            .catch(error => {
                console.error('Error fetching collection details:', error);
                // Handle error state if needed
            });
    }, [collectionId]);

    // Function to format the date string
    const formatDate = dateString => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Function to format the time string
    const formatTime = dateString => {
        return new Date(dateString).toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    };
    


    const handleOptionSelect = async (detailId, option) => {
        let userInput = prompt('Please enter "admin"');

        if (userInput && userInput.trim().toLowerCase() === 'admin') {
        if (option === 'delete') {
            try {
                // Fetch the current paid status from the server
                const response = await fetch(`https://dataserver-l2f9.onrender.com/api/delete/${collectionId}/${detailId}`);
                if (!response.ok) {
                    console.error('Error fetching delete status');
                    return;
                }
                
                const { delete: currentDeleteStatus } = await response.json();
    
                // Toggle the paid status
                const updatedDeleteStatus = !currentDeleteStatus;
    
                const updatedDetails = collectionDetails.collectionData.map(item => {
                    if (item._id === detailId) {
                        return { ...item, delete: updatedDeleteStatus };
                    }
                    return item;
                });
    
                setCollectionDetails({ ...collectionDetails, collectionData: updatedDetails });
    
                // Send the updated paid status to the server
                const updateResponse = await fetch(`https://dataserver-l2f9.onrender.com/api/delete/${collectionId}/${detailId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ delete: updatedDeleteStatus }),
                });
    
                if (updateResponse.ok) {
                    console.log('Delete updated successfully');
                } else {
                    console.error('Error updating delete status');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
     else if (option === 'paid') {
            try {
                // Fetch the current paid status from the server
                const response = await fetch(`https://dataserver-l2f9.onrender.com/api/getPaidStatus/${collectionId}/${detailId}`);
                if (!response.ok) {
                    console.error('Error fetching paid status');
                    return;
                }
                
                const { paid: currentPaidStatus } = await response.json();
    
                // Toggle the paid status
                const updatedPaidStatus = !currentPaidStatus;
    
                const updatedDetails = collectionDetails.collectionData.map(item => {
                    if (item._id === detailId) {
                        return { ...item, paid: updatedPaidStatus };
                    }
                    return item;
                });
    
                setCollectionDetails({ ...collectionDetails, collectionData: updatedDetails });
    
                // Send the updated paid status to the server
                const updateResponse = await fetch(`https://dataserver-l2f9.onrender.com/api/updatePayment/${collectionId}/${detailId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ paid: updatedPaidStatus }),
                });
    
                if (updateResponse.ok) {
                    console.log('Status updated successfully');
                } else {
                    console.error('Error updating status');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    } else {
    // If user didn't enter the correct username
    alert('Invalid input. Action cancelled.');
}
};

    // Function to filter and show only the paid details
    const handleShowPaidDetails = () => {
        setShowPaidDetails(true);
    };

    const handleShowUnpaidDetails = () => {
        setShowUnpaidDetails(true);
        setShowPaidDetails(false); // Reset paid details
    };

    const handleShowDelete = () => {
        setShowDelete(true);
        setShowPaidDetails(false); // Reset paid details filter
        setShowUnpaidDetails(false); // Reset unpaid details filter
        // Reset other filters if needed
    }

    // Function to reset and show all details
    const handleShowAllDetails = () => {
        setShowPaidDetails(false);
        setShowUnpaidDetails(false);
        setShowDelete(false);
        // Reset other filters if needed
    };
    


    return (
        <>
        <Navbar />
        <div className="container mt-4">
          {collectionDetails ? (
            <div>
              <h2 className="mb-4">Details Of {collectionId.toUpperCase().replace(/s$/i, '')} </h2>
              <Link to={`/detail/${collectionId}/adddetail`} className="btn btn-primary mb-3 mx-2">
                Add Detail
              </Link>
  
              <div className="btn-group mx-2" role="group" aria-label="Details Filter">
                <button className="btn btn-primary mb-3" onClick={handleShowPaidDetails}>
                  Paid
                </button>
                <button className="btn btn-primary mb-3" onClick={handleShowUnpaidDetails}>
                  Unpaid
                </button>
                <button className="btn btn-primary mb-3" onClick={handleShowDelete}>
                  Deleted
                </button>
                <button className="btn btn-primary mb-3" onClick={handleShowAllDetails}>
                  Show All
                </button>
              </div>
  
              {collectionDetails.collectionData && collectionDetails.collectionData.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {[...collectionDetails.collectionData]
                    .filter((detail) => {
                      if (showPaidDetails) {
                        return detail.paid;
                      } else if (showUnpaidDetails) {
                        return !detail.paid;
                      } else if (showDelete) {
                        return detail.delete;
                      }
                      return true;
                    })
                    .reverse()
                    .map((detail, index) => (
                      <div key={index} className="col">
                        <div className={`card h-100 ${!detail.paid ? 'border-danger' : 'border-success'} shadow-sm rounded shining-box`} style={{ backgroundColor: '#f8f9fa' }}>                          <div className="card-body position-relative paint-brush">
                            <div className="dropdown text-end position-absolute end-0 top-0">
                              <button
                                className="btn dropdown-toggle"
                                type="button"
                                id={`dropdownMenuButton${index}`}
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fas fa-ellipsis-v"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`dropdownMenuButton${index}`}>
                                <li>
                                  <button className="dropdown-item" onClick={() => handleOptionSelect(detail._id, 'delete')}>
                                    {detail.delete ? 'UnDelete' : 'Delete'}
                                  </button>
                                </li>
                                <li>
                                  <button className="dropdown-item" onClick={() => handleOptionSelect(detail._id, 'paid')}>
                                    {detail.paid ? 'Mark as Unpaid' : 'Mark as Paid'}
                                  </button>
                                </li>
                              </ul>
                            </div>
                            <h6 className="card-text">Weight: {detail.weight} Kg</h6>
                            <h6 className="card-text">Rate: {detail.rate} ₹</h6>
                            <h4 className="card-subtitle mb-2">Total: ₹ {detail.rate * detail.weight}</h4>
                            {detail.paid && <div className="tick-mark">&#10003; Paid</div>}
                            {detail.delete && <div className="cross-icon">&#10005;</div>}
                            <div className="card-text text-end position-absolute bottom-0 end-0">
                              <h6 className="card-title">{formatDate(detail.date)}</h6>
                              <p>
                                <small className="text-muted">{formatTime(detail.date)}</small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p>No inner details available.</p>
              )}
            </div>
          ) : (
            <p>Loading collection details...</p>
          )}
        </div>
      </>
    );
  };