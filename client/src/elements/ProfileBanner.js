import React from 'react';
import styled from 'styled-components';

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: #f0f0f0;
  margin-bottom: 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 80px;
  }
`;

const BannerContent = styled.div`
  text-align: center;
`;

function ProfileBanner() {
    return (
        <BannerContainer className="border doodle-border">
            <BannerContent>
                {/* Add your banner content here */}
                <h3>News Banner</h3>
                {/* You can add more elements or components as needed */}
            </BannerContent>
        </BannerContainer>
    );
}

export default ProfileBanner;