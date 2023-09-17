import React from 'react';
import { useAuth } from 'react-oidc-context';

const UserInfo = ({ user }) => {
  const auth = useAuth();

  return (
    <div className="user-info-container">
      <div className="name">{auth.user.profile.name}</div>
      <div className="email">{auth.user.profile.email}</div>
      <div className="points">{user.points ? user.points : 0} Points</div>
    </div>
  );
};

export default UserInfo;
