import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProgressBar, Step } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';

function ChallengeRoad({ username }) {
    const [rewards, setRewards] = useState([]);
    const [points, setPoints] = useState(0);
    const [isDonator, setIsDonator] = useState(false);

    useEffect(() => {
        const fetchChallengeRoadData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/challenge-road/${username}`);
                setRewards(response.data.rewards);
                setPoints(response.data.points);
                setIsDonator(response.data.isDonator);
            } catch (error) {
                console.error('Error fetching challenge road data:', error);
            }
        };

        fetchChallengeRoadData();
    }, [username]);

    const totalPoints = rewards.reduce((sum, reward) => sum + reward.points, 0);
    const progress = (points / totalPoints) * 100;

    const isRewardUnlocked = (rewardPoints) => points >= rewardPoints;

    return (
        <div style={{ paddingTop: 50, paddingBottom: 50 }}>
            <ProgressBar
                percent={progress}
                filledBackground="linear-gradient(to right, #4caf50, #45a049)"
            >
                {rewards.map((reward, index) => (
                    <Step
                        key={index}
                        position={reward.points / totalPoints}
                        transition="scale"
                        children={({ accomplished }) => (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    width: 20,
                                    height: 20,
                                    color: accomplished ? 'green' : 'gray',
                                    backgroundColor: 'white',
                                    border: `2px solid ${accomplished ? 'green' : 'gray'}`,
                                }}
                            >
                                <img
                                    src={reward.image}
                                    alt={reward.caption}
                                    style={{
                                        position: 'absolute',
                                        top: reward.type === 'donator' ? -80 : 50,
                                        width: 50,
                                        height: 50,
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                        border: `2px solid ${isRewardUnlocked(reward.points) ? 'green' : 'gray'}`,
                                    }}
                                />
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: reward.type === 'donator' ? -30 : 110,
                                        fontSize: 12,
                                        whiteSpace: 'nowrap',
                                        color: isRewardUnlocked(reward.points) ? 'green' : 'gray',
                                    }}
                                >
                                    {reward.caption}
                                </span>
                            </div>
                        )}
                    />
                ))}
            </ProgressBar>
        </div>
    );
}

export default ChallengeRoad;