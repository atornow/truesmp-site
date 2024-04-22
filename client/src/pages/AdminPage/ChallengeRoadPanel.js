import React, { useState } from 'react';
import axios from 'axios';

function ChallengeRoadPanel() {
    const [regularRewardsCount, setRegularRewardsCount] = useState(0);
    const [donatorRewardsCount, setDonatorRewardsCount] = useState(0);
    const [category, setCategory] = useState(0);
    const [regularRewards, setRegularRewards] = useState([]);
    const [donatorRewards, setDonatorRewards] = useState([]);

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

    return (
        <div>
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
        </div>
    );
}

export default ChallengeRoadPanel;