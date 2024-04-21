import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChallengeRoad({ username }) {
    const [rewards, setRewards] = useState([]);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const fetchChallengeRoadData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/challenge-road/${username}`);
                setRewards(response.data.rewards);
                setPoints(response.data.points);
                console.log("points:", response.data.points);
            } catch (error) {
                console.error('Error fetching challenge road data:', error);
            }
        };

        fetchChallengeRoadData();
    }, [username]);

    const maxPoints = Math.max(...rewards.map(reward => reward.points));
    const totalWidth = maxPoints * 15; // Adjust the multiplier as needed

    const uniquePoints = [...new Set(rewards.map(reward => reward.points))];

    return (
        <div style={{ border: '1px solid #ccc', paddingTop: '10px', paddingBottom: '10px', maxWidth: '45rem', margin: '0 auto', overflow: 'hidden' }}>
            <div style={{ width: '100%', overflowX: 'scroll' }}>
                <div style={{ position: 'relative', height: '220px', width: totalWidth }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            height: '10px',
                            width: '100%',
                            backgroundColor: '#e0e0e0',
                            transform: 'translateY(-50%)',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: `${(points / maxPoints) * 100}%`,
                                background: 'linear-gradient(to right, #fefb72, #f0bb31)',
                            }}
                        />
                    </div>
                    {uniquePoints.map(point => (
                        <div
                            key={point}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: point * 15, // Adjust the multiplier as needed
                                transform: 'translate(-50%, -50%)',
                                width: 25,
                                height: 25,
                                borderRadius: '50%',
                                backgroundColor: points >= point ? 'gold' : 'gray',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                fontSize: 12,
                                zIndex: 2,
                                border: '2px',
                            }}
                        >
                            {point}
                        </div>
                    ))}
                    {rewards.map((reward, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: reward.points * 15, // Adjust the multiplier as needed
                                transform: 'translate(-50%, -50%)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                zIndex: 1,
                            }}
                        >
                            {reward.type === 'donator' && (
                                <div className="border doodle-border-1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '105px' }}>
                                    <div
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        <img
                                            src={reward.image}
                                            alt={`Reward ${index + 1}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{ fontSize: '12px', whiteSpace: 'nowrap', textAlign: 'center' }}>{reward.caption}</div>
                                </div>
                            )}
                            {reward.type === 'regular' && (
                                <div className="border doodle-border-1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '105px' }}>
                                    <div
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        <img
                                            src={reward.image}
                                            alt={`Reward ${index + 1}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{ fontSize: '12px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                                        {reward.caption}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChallengeRoad;