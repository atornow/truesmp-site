import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

function ChallengeRoadPanel() {
    const [regularRewardsCount, setRegularRewardsCount] = useState(0);
    const [donatorRewardsCount, setDonatorRewardsCount] = useState(0);
    const [category, setCategory] = useState(0);
    const [regularRewards, setRegularRewards] = useState([]);
    const [donatorRewards, setDonatorRewards] = useState([]);

    const validateRewardsCount = (count) => {
        const parsedCount = parseInt(count);
        return isNaN(parsedCount) || parsedCount < 0 ? 0 : parsedCount;
    };

    const handleRegularRewardChange = (index, field, value) => {
        setRegularRewards(prevRewards => {
            const newRewards = [...prevRewards];
            newRewards[index] = { ...newRewards[index], [field]: value };
            return newRewards;
        });
    };

    const handleDonatorRewardChange = (index, field, value) => {
        setDonatorRewards(prevRewards => {
            const newRewards = [...prevRewards];
            newRewards[index] = { ...newRewards[index], [field]: value };
            return newRewards;
        });
    };

    const handleImageUpload = async (file, rewardType, index) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:3001/api/admin/challenge-road/upload-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (rewardType === 'regular') {
                handleRegularRewardChange(index, 'image', response.data.filePath);
            } else {
                handleDonatorRewardChange(index, 'image', response.data.filePath);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleChallengeRoadSubmit = async (e) => {
        e.preventDefault();
        try {
            const rewards = [
                ...regularRewards.map(reward => ({ ...reward, type: 'regular' })),
                ...donatorRewards.map(reward => ({ ...reward, type: 'donator' })),
            ];

            const data = {
                regularRewardsCount,
                donatorRewardsCount,
                category,
                rewards,
            };

            await axios.post('http://localhost:3001/api/admin/challenge-road', data);
            alert('Challenge road created successfully!');
        } catch (error) {
            console.error('Error creating challenge road:', error);
            alert('Error creating challenge road. Please try again.');
        }
    };

    const ImageUploader = ({ onUpload, currentImage }) => {
        const { getRootProps, getInputProps } = useDropzone({
            accept: 'image/*',
            onDrop: acceptedFiles => {
                onUpload(acceptedFiles[0]);
            },
        });

        return (
            <div {...getRootProps()} style={{ backgroundColor: '#f8f8f8', padding: '10px', textAlign: 'center', margin: '10px'}} className="doodle doodle-border-2">
                <input {...getInputProps()} />
                {currentImage ? (
                    <img src={`http://localhost:3001/${currentImage}`} alt="Reward" style={{ maxWidth: '50px', maxHeight: '100px' }} />
                ) : (
                    <p>Drag or select a file</p>
                )}
            </div>
        );
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
                        onChange={(e) => {
                            const newCount = validateRewardsCount(e.target.value);
                            setRegularRewardsCount(newCount);
                            setRegularRewards(Array(newCount).fill().map(() => ({})));
                        }}
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
                        onChange={(e) => {
                            const newCount = validateRewardsCount(e.target.value);
                            setDonatorRewardsCount(newCount);
                            setDonatorRewards(Array(newCount).fill().map(() => ({})));
                        }}
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

                {regularRewards.map((reward, index) => (
                    <div key={`regular-${index}`} className="doodle doodle-border-2" style={{margin: '10px'}}>
                        <h4>Regular Reward {index + 1}</h4>
                        <ImageUploader
                            onUpload={(file) => handleImageUpload(file, 'regular', index)}
                            currentImage={reward.image}
                        />
                        <div>
                            <label htmlFor={`regular-caption-${index}`}>Caption:</label>
                            <input
                                type="text"
                                id={`regular-caption-${index}`}
                                value={reward.caption || ''}
                                onChange={(e) => handleRegularRewardChange(index, 'caption', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor={`regular-command-${index}`}>Command:</label>
                            <input
                                type="text"
                                id={`regular-command-${index}`}
                                value={reward.command || ''}
                                onChange={(e) => handleRegularRewardChange(index, 'command', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor={`regular-points-${index}`}>Points:</label>
                            <input
                                type="number"
                                id={`regular-points-${index}`}
                                value={reward.points || ''}
                                onChange={(e) => handleRegularRewardChange(index, 'points', parseInt(e.target.value))}
                                required
                            />
                        </div>
                    </div>
                ))}

                {donatorRewards.map((reward, index) => (
                    <div key={`donator-${index}`}>
                        <h4>Donator Reward {index + 1}</h4>
                        <ImageUploader
                            onUpload={(file) => handleImageUpload(file, 'donator', index)}
                            currentImage={reward.image}
                        />
                        <div>
                            <label htmlFor={`donator-caption-${index}`}>Caption:</label>
                            <input
                                type="text"
                                id={`donator-caption-${index}`}
                                value={reward.caption || ''}
                                onChange={(e) => handleDonatorRewardChange(index, 'caption', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor={`donator-command-${index}`}>Command:</label>
                            <input
                                type="text"
                                id={`donator-command-${index}`}
                                value={reward.command || ''}
                                onChange={(e) => handleDonatorRewardChange(index, 'command', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor={`donator-points-${index}`}>Points:</label>
                            <input
                                type="number"
                                id={`donator-points-${index}`}
                                value={reward.points || ''}
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