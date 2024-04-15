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
  const [deleteType, setDeleteType] = useState('');
  const [deleteFilters, setDeleteFilters] = useState({});

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:3001/api/admin/${deleteType}`, {
        data: deleteFilters,
      });
      // Show success message
      alert('Objects deleted successfully!');
    } catch (error) {
      console.error('Error deleting objects:', error);
      // Show error message
      alert('Error deleting objects. Please try again.');
    }
  };

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
      <h3>Delete Panel</h3>
            <form onSubmit={handleDeleteSubmit}>
              <div>
                <label htmlFor="deleteType">Delete Type:</label>
                <select
                  id="deleteType"
                  value={deleteType}
                  onChange={(e) => setDeleteType(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="challenges">Challenges</option>
                  <option value="galleryPosts">Gallery Posts</option>
                  <option value="users">Users</option>
                </select>
              </div>
              {deleteType === 'challenges' && (
                <>
                  <div>
                    <label htmlFor="challengeId">Challenge ID:</label>
                    <input
                      type="text"
                      id="challengeId"
                      value={deleteFilters.id || ''}
                      onChange={(e) => setDeleteFilters({ ...deleteFilters, id: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="challengeDescription">Description:</label>
                    <input
                      type="text"
                      id="challengeDescription"
                      value={deleteFilters.description || ''}
                      onChange={(e) => setDeleteFilters({ ...deleteFilters, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="challengeTargetUsername">Target Username:</label>
                    <input
                      type="text"
                      id="challengeTargetUsername"
                      value={deleteFilters.targetUsername || ''}
                      onChange={(e) => setDeleteFilters({ ...deleteFilters, targetUsername: e.target.value })}
                    />
                  </div>
                </>
              )}
              {deleteType === 'galleryPosts' && (
                <>
                  <div>
                    <label htmlFor="galleryPostId">Gallery Post ID:</label>
                    <input
                      type="text"
                      id="galleryPostId"
                      value={deleteFilters.id || ''}
                      onChange={(e) => setDeleteFilters({ ...deleteFilters, id: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="galleryPostUsername">Username:</label>
                    <input
                      type="text"
                      id="galleryPostUsername"
                      value={deleteFilters.username || ''}
                      onChange={(e) => setDeleteFilters({ ...deleteFilters, username: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="galleryPostCaption">Caption:</label>
                    <input
                      type="text"
                      id="galleryPostCaption"
                      value={deleteFilters.caption || ''}
                      onChange={(e) => setDeleteFilters({ ...deleteFilters, caption: e.target.value })}
                    />
                  </div>
                </>
              )}
              {deleteType === 'users' && (
                <>
                  <div>
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      id="username"
                      value={deleteFilters.username || ''}
                      onChange={(e) => setDeleteFilters({ ...deleteFilters, username: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="uuid">UUID:</label>
                    <input
                      type="text"
                      id="uuid"
                      value={deleteFilters.uuid || ''}
                      onChange={(e) => setDeleteFilters({ ...deleteFilters, uuid: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="teamId">Team ID:</label>
                    <input
                      type="text"
                      id="teamId"
                      value={deleteFilters.teamId || ''}
                      onChange={(e) => setDeleteFilters({ ...deleteFilters, teamId: e.target.value })}
                    />
                  </div>
                </>
              )}
              <button type="submit">Delete</button>
            </form>
          </div>
        );
      }

export default AdminPage;