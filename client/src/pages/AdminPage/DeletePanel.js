import React, { useState } from 'react';
import axios from 'axios';

function DeletePanel() {
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

    return (
        <div>
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

export default DeletePanel;