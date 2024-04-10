import React, { useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [description, setDescription] = useState('');
  const [dataName, setDataName] = useState('');
  const [amountGoal, setAmountGoal] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [dataType, setDataType] = useState('entity');
  const [points, setPoints] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/challenges/admin', {
        description,
        dataName,
        amountGoal,
        startDate,
        endDate,
        categoryId,
        dataType,
        points,
      });
      // Reset form fields and show success message
      setDescription('');
      setDataName('');
      setAmountGoal(0);
      setStartDate('');
      setEndDate('');
      setCategoryId('');
      setDataType('entity');
      setPoints(0);
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
          <label htmlFor="dataName">Data Name:</label>
          <input
            type="text"
            id="dataName"
            value={dataName}
            onChange={(e) => setDataName(e.target.value)}
            required
          />
        </div>
        <div>
            <label htmlFor="dataType">Data Type:</label>
            <select
              id="dataType"
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              required
            >
              <option value="entity">Entity</option>
              <option value="block">Block</option>
            </select>
          </div>
        <div>
          <label htmlFor="amountGoal">Amount of thing:</label>
          <input
            type="number"
            id="amountGoal"
            value={amountGoal}
            onChange={(e) => setAmountGoal(parseInt(e.target.value))}
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
        <div>
            <label htmlFor="points">Points:</label>
            <input
              type="number"
              id="points"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value))}
              required
            />
          </div>
        <button type="submit">Create Challenges</button>
      </form>
    </div>
  );
}

export default AdminPage;