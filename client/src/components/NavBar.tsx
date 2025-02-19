import React from "react";

interface NavBarProps {
    onLogoClick: () => void;
    onSignInClick: () => void;
    onSignUpClick: () => void;
    onProfileClick: () => void;
}

const Navbar : React.FC<NavBarProps> = ({onLogoClick, onSignInClick, onSignUpClick, onProfileClick}) => {
    return (
        <header className="header">
            <div className="logo-container" onClick={onLogoClick}>
                <div className="logo-circle"></div>{/*Circle logo*/}
                <h2 className="header-title">Setup NAME LATER</h2>
            </div>

            <div className="button-container">
                <button className="btn-primary" onClick={onSignInClick}>
                    <span className="truncate">Sign In</span>
                </button>
                <button className="btn-secondary" onClick={onSignUpClick}>
                    <span className="truncate">Sign Up</span>
                </button>
                <button className="btn-secondary" onClick={onProfileClick}>
                    <span className="truncate">Profile</span>
                </button>
            </div>
        </header>
    )
}

export default Navbar;