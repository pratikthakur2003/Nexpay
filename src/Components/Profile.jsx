import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <h2>User Profile</h2>
      <p>Welcome, User! Here you can view your orders and manage your account details.</p>
    </ProfileContainer>
  );
};

export default Profile;
