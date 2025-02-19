import React from "react";
import useAuth from "../hooks/useAuth";

interface Props {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

const ProfilePage: React.FC<Props> = ({ setCurrentView }) => {
  const { user, signOut } = useAuth();

  // If user is not logged in, update currentView to show SignIn
  if (!user) {
    setCurrentView("signIn");  // Replace with your SignIn page view identifier
    return null;
  }

  return (
    <div className="profile-page">
      <h1>Welcome, {user?.email}!</h1>
      <p>This is your profile page.</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default ProfilePage;

