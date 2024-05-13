import React from 'react';
import styled from 'styled-components';

const BannerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  margin-bottom: 1rem;
  box-sizing: border-box;
  border-radius: 12px;

  @media (max-width: 768px) {
    height: 80px;
  }
`;

const BannerContent = styled.div`
  text-align: center;
`;

const BannerColorBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  background-color: #e0e0e0;
  box-sizing: border-box;
  border-radius: 7px;


`;

function ProfileBanner() {
    return (
        <BannerContainer className="border doodle-border">
            <BannerColorBox>
            <BannerContent>
                {/* Add your banner content here */}
                <h3>News Banner</h3>
                {/* You can add more elements or components as needed */}
            </BannerContent>
            </BannerColorBox>
        </BannerContainer>
    );
}

export default ProfileBanner;