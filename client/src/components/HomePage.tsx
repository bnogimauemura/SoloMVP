import React from "react";

interface HomePageProps {
    changePage: (page: string) => void; // Function passed from App component to change pages
}

const HomePage: React.FC<HomePageProps> = ({changePage}) => {
    return (
        <div className="main-content">
            <div className=" background-image">
                <h1 className="main-heading">Welcome to the World of Korean Music</h1>
                <div className="button-group">
                  {/* Button to navigate to the QuizPage */}
                  <button className="btn-primary" onClick={() => changePage('quiz')}>
                    <span className="truncate">Test Your K-pop Knowledge</span>
                  </button>
                  {/* Button to navigate to the KpopByGenrePage */}
                  <button className="btn-secondary" onClick={() => changePage('genre')}>
                    <span className="truncate">Discover K-pop by Genre</span>
                  </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;