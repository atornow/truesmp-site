import React from 'react';
import ChallengePanel from './ChallengePanel';
import DeletePanel from './DeletePanel';
import ChallengeRoadPanel from './ChallengeRoadPanel';
import NewsPanel from './NewsPanel';

function AdminPage() {
  return (
    <div>
      <h2>Admin Page</h2>
      <ChallengePanel />
      <DeletePanel />
      <ChallengeRoadPanel />
      <NewsPanel />
    </div>
  );
}

export default AdminPage;