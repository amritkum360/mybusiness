import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Buyername() {
  const [collections, setCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await fetch('https://dataserver-l2f9.onrender.com/api/collectionPaidCounts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Set all collections without filtering
      setCollections(data.collectionPaidCounts);
    } catch (error) {
      console.error('Error fetching collections:', error);
      // Handle error state if needed
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search collections..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {filteredCollections.length === 0 ? (
        <p>No collections available.</p>
      ) : (
        <div className="list-group">
          {filteredCollections.map((collection, index) => (
            <Link
              key={index}
              to={`/detail/${encodeURIComponent(collection.name)}`}
              className="list-group-item-action custom-link colt-brd"
            >
              <span>
                {collection.name.toUpperCase().replace(/s$/i, '')}
                {collection.paidCount > 0 && (
                  <span className="message-count"> {collection.paidCount} </span>
                )}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
