import React, { useState } from "react";
import '../styles/SignInPage.css';
import useAuth from "../hooks/useAuth";  // Import the useAuth hook

interface SignInPageProps {
  changePage: (page: string) => void;
  onSignInClick: (email:  string, password: string) => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ changePage }) => {
  const { signIn, loading, error } = useAuth();  // Call useAuth to get signIn, loading, and error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const trimmedEmail = email.trim();  // Remove extra spaces from email
    const trimmedPassword = password.trim();  // Remove extra spaces from password

    if (!trimmedEmail || !trimmedPassword) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      // Try signing in with email and password
      await signIn(trimmedEmail, trimmedPassword);  // Call the signIn function from useAuth hook
      changePage('quiz');  // Navigate to the quiz page after sign-in
    } catch (err) {
      console.error(err);
      alert("Sign-in failed. Please try again.");
    }
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <div className="sign-in-content">
          <h1 className="heading">Sign in</h1>

          {/* Email or Username Input */}
          <div className="input-container">
            <label className="input-label">
              Email or Username
            </label>
            <input
              type="text"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or username"
            />
          </div>

          {/* Password Input */}
          <div className="input-container">
            <label className="input-label">
              Password
            </label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {/* Sign In Button */}
          <div className="button-container">
            <button className="sign-in-button" onClick={handleSignIn} disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Forgot Password Link */}
          <p className="forgot-password">
            Forgot password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

