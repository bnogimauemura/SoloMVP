interface NavBarProps {
  onLogoClick: () => void;
  onSignInClick: () => void;
  onSignUpClick: () => void;
  onProfileClick: () => void;
  onSignOutClick: () => void;
  isLoggedIn: boolean; // Add this prop to control conditional rendering
}

const Navbar: React.FC<NavBarProps> = ({
  onLogoClick,
  onSignInClick,
  onSignUpClick,
  onProfileClick,
  onSignOutClick,
  isLoggedIn,  // Check if the user is logged in
}) => {
  return (
    <header className="header">
      <div className="logo-container" onClick={onLogoClick}>
        <div className="logo-circle"></div> {/* Circle logo */}
        <h2 className="header-title">Sounds of Seoul</h2>
      </div>

      <div className="button-container">
        {/* Show Sign In and Sign Up buttons if not logged in */}
        {!isLoggedIn ? (
          <>
            <button className="btn-primary" onClick={onSignInClick}>
              <span className="truncate">Sign In</span>
            </button>
            <button className="btn-secondary" onClick={onSignUpClick}>
              <span className="truncate">Sign Up</span>
            </button>
          </>
        ) : (
          // Show Profile and Logout buttons if logged in
          <>
            <button className="btn-secondary" onClick={onProfileClick}>
              <span className="truncate">Profile</span>
            </button>
            <button className="btn-primary" onClick={onSignOutClick}>
              <span className="truncate">Logout</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

