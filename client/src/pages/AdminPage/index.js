import React from 'react';
import styled from 'styled-components';
import ChallengePanel from './ChallengePanel';
import DeletePanel from './DeletePanel';
import ChallengeRoadPanel from './ChallengeRoadPanel';
import NewsPanel from './NewsPanel';

const AdminPageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PanelContainer = styled.div`
  flex: 1 1 400px;
  padding: 20px;
  background-color: #fff;
`;

function AdminPage() {
  return (
    <div style={{padding: '2rem'}}>
      <h2>Admin Page</h2>
      <AdminPageContainer>
        <PanelContainer className="border doodle-border-2">
          <ChallengePanel />
        </PanelContainer>
        <PanelContainer className="border doodle-border-2">
          <DeletePanel />
        </PanelContainer>
        <PanelContainer className="border doodle-border-2">
          <ChallengeRoadPanel />
        </PanelContainer>
        <PanelContainer className="border doodle-border-2">
          <NewsPanel />
        </PanelContainer>
      </AdminPageContainer>
    </div>
  );
}

export default AdminPage;