import React, { useState } from "react";
import '../styles/SignUpPage.css';
import useAuth from "../hooks/useAuth";  // Use default import here

interface SignUpPageProps {
  changePage: (page: string) => void;
  onSignUpClick: (email:  string, password: string) => void;
}

interface SignUpFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ changePage }) => {
  const { signUp, loading, error } = useAuth();  // Call useAuth to get the signUp method
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    const { email, username, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await signUp(email, password, username); // Call signUp from useAuth hook
      changePage("quiz"); // Navigate to the quiz page or other pages as needed
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <div className="sign-up-content">
          <h1 className="sign-up-heading">Create an account</h1>
          <p className="sign-up-description">
            Your username is how other community members will see you. This name will be used to credit you for things you share on K-Pop.
          </p>

          <div className="input-container">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container">
            <label className="input-label">Username</label>
            <input
              type="text"
              name="username"
              className="input-field"
              placeholder="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              className="input-field"
              placeholder="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container">
            <label className="input-label">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              className="input-field"
              placeholder="confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <div className="checkbox-container">
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-text">Send me the latest news, offers, and deals from K-Pop</span>
            </label>
          </div>

          <div className="sign-up-button-container">
            <button className="sign-up-button" onClick={handleSignUp} disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>} {/* Display error message if there's any */}

          <div className="change-page-link">
            <p>
              Already have an account?{" "}
              <button onClick={() => changePage("signIn")}>Sign In</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
