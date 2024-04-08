import React, { useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [description, setDescription] = useState('');
  const [entityName, setEntityName] = useState('');
  const [amountToKill, setAmountToKill] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/challenges/admin', {
        description,
        entityName,
        amountToKill,
        startDate,
        endDate,
        categoryId,
      });
      // Reset form fields and show success message
      setDescription('');
      setEntityName('');
      setAmountToKill(0);
      setStartDate('');
      setEndDate('');
      setCategoryId('');
      alert('Challenge created successfully!');
    } catch (error) {
      console.error('Error creating challenges:', error);
      // Show error message
      alert('Error creating challenges. Please try again.');
    }
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <h3>Challenge Panel</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Challenge Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="entityName">Entity Name:</label>
          <input
            type="text"
            id="entityName"
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amountToKill">Amount to Kill:</label>
          <input
            type="number"
            id="amountToKill"
            value={amountToKill}
            onChange={(e) => setAmountToKill(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="categoryId">Category ID:</label>
          <input
            type="text"
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Challenges</button>
      </form>
    </div>
  );
}

export default AdminPage;