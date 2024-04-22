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
  const [regularRewardsCount, setRegularRewardsCount] = useState(0);
  const [donatorRewardsCount, setDonatorRewardsCount] = useState(0);
  const [category, setCategory] = useState(0);
  const [regularRewards, setRegularRewards] = useState([]);
  const [donatorRewards, setDonatorRewards] = useState([]);
  const [newsHeading, setNewsHeading] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsImage, setNewsImage] = useState(null);

  const handleNewsImageUpload = (e) => {
    setNewsImage(e.target.files[0]);
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('heading', newsHeading);
      formData.append('content', newsContent);
      if (newsImage) {
        formData.append('image', newsImage);
      }

      await axios.post('http://localhost:3001/api/news', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setNewsHeading('');
      setNewsContent('');
      setNewsImage(null);
      alert('News post created successfully!');
    } catch (error) {
      console.error('Error creating news post:', error);
      alert('Error creating news post. Please try again.');
    }
  };

  const handleRegularRewardChange = (index, field, value) => {
    const updatedRewards = [...regularRewards];
    updatedRewards[index] = { ...updatedRewards[index], [field]: value };
    setRegularRewards(updatedRewards);
  };

  const handleDonatorRewardChange = (index, field, value) => {
    const updatedRewards = [...donatorRewards];
    updatedRewards[index] = { ...updatedRewards[index], [field]: value };
    setDonatorRewards(updatedRewards);
  };

  const handleChallengeRoadSubmit = async (e) => {
    e.preventDefault();
    try {
      const rewards = [
        ...regularRewards.map((reward, index) => ({
          ...reward,
          type: `regular`,
        })),
        ...donatorRewards.map((reward, index) => ({
          ...reward,
          type: `donator`,
        })),
      ];

      const data = {
        regularRewardsCount,
        donatorRewardsCount,
        category,
        rewards,
      };

      await axios.post('http://localhost:3001/api/admin/challenge-road', data);
      // Show success message
      alert('Challenge road created successfully!');
    } catch (error) {
      console.error('Error creating challenge road:', error);
      // Show error message
      alert('Error creating challenge road. Please try again.');
    }
  };

  const validateRewardsCount = (count) => {
    const parsedCount = parseInt(count);
    return isNaN(parsedCount) || parsedCount < 0 ? 0 : parsedCount;
  };

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
      <h3>Challenge Road Panel</h3>
      <form onSubmit={handleChallengeRoadSubmit}>
        <div>
          <label htmlFor="regularRewardsCount">Regular Rewards Count:</label>
          <input
            type="number"
            id="regularRewardsCount"
            min="0"
            value={regularRewardsCount}
            onChange={(e) => setRegularRewardsCount(validateRewardsCount(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="donatorRewardsCount">Donator Rewards Count:</label>
          <input
            type="number"
            id="donatorRewardsCount"
            min="0"
            value={donatorRewardsCount}
            onChange={(e) => setDonatorRewardsCount(validateRewardsCount(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category ID:</label>
          <input
            type="number"
            id="category"
            min="0"
            value={category}
            onChange={(e) => setCategory(validateRewardsCount(e.target.value))}
            required
          />
        </div>
        {[...Array(regularRewardsCount)].map((_, index) => (
          <div key={`regular-${index}`}>
            <h4>Regular Reward {index + 1}</h4>
            <div>
              <label htmlFor={`regular-image-${index}`}>Image URL:</label>
              <input
                type="text"
                id={`regular-image-${index}`}
                value={regularRewards[index]?.image || ''}
                onChange={(e) => handleRegularRewardChange(index, 'image', e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor={`regular-caption-${index}`}>Caption:</label>
              <input
                type="text"
                id={`regular-caption-${index}`}
                value={regularRewards[index]?.caption || ''}
                onChange={(e) => handleRegularRewardChange(index, 'caption', e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor={`regular-points-${index}`}>Points:</label>
              <input
                type="number"
                id={`regular-points-${index}`}
                value={regularRewards[index]?.points || ''}
                onChange={(e) => handleRegularRewardChange(index, 'points', parseInt(e.target.value))}
                required
              />
            </div>
          </div>
        ))}
        {[...Array(donatorRewardsCount)].map((_, index) => (
          <div key={`donator-${index}`}>
            <h4>Donator Reward {index + 1}</h4>
            <div>
              <label htmlFor={`donator-image-${index}`}>Image URL:</label>
              <input
                type="text"
                id={`donator-image-${index}`}
                value={donatorRewards[index]?.image || ''}
                onChange={(e) => handleDonatorRewardChange(index, 'image', e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor={`donator-caption-${index}`}>Caption:</label>
              <input
                type="text"
                id={`donator-caption-${index}`}
                value={donatorRewards[index]?.caption || ''}
                onChange={(e) => handleDonatorRewardChange(index, 'caption', e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor={`donator-points-${index}`}>Points:</label>
              <input
                type="number"
                id={`donator-points-${index}`}
                value={donatorRewards[index]?.points || ''}
                onChange={(e) => handleDonatorRewardChange(index, 'points', parseInt(e.target.value))}
                required
              />
            </div>
          </div>
        ))}
        <button type="submit">Create Challenge Road</button>
      </form>

      <h3>News Panel</h3>
      <form onSubmit={handleNewsSubmit}>
        <div>
          <label htmlFor="newsHeading">Heading:</label>
          <input
            type="text"
            id="newsHeading"
            value={newsHeading}
            onChange={(e) => setNewsHeading(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newsContent">Content:</label>
          <textarea
            id="newsContent"
            value={newsContent}
            onChange={(e) => setNewsContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="newsImage">Image:</label>
          <input
            type="file"
            id="newsImage"
            accept="image/*"
            onChange={handleNewsImageUpload}
          />
        </div>
        <button type="submit">Create News Post</button>
      </form>
          </div>
        );
      }

export default AdminPage;