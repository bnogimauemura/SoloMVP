import React, { useState, useEffect } from "react";
import './App.css';

import HomePage from "./components/HomePage";
import QuizPage from "./components/QuizPage";
import KpopByGenrePage from "./components/KpopByGenre";
import Navbar from "./components/NavBar";
import SearchResultsPage from "./components/SearchResultsPage";
import SignInPage from "./NavBarComponents/SignIn";
import SignUpPage from "./NavBarComponents/SingUp";

import { supabase } from '../supabaseClient';  // Import the Supabase client

interface Artist {
  id: number;
  name: string;
  genre: string;
  type: string;
  gender: string;
  created_at: string;
}

interface MusicVideo {
  artist_name: string;
  video_url: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [artists, setArtists] = useState<Artist[]>([]); // Artists state
  const [musicVideos, setMusicVideos] = useState<MusicVideo[]>([]); // Music videos state

  // Function to fetch music videos from Supabase
// Fetch music videos from Supabase
const fetchMusicVideos = async () => {
  try {
    const { data, error } = await supabase.from('music_videos').select('*');
    if (error) throw error;

    // console.log('Fetched data from Supabase:', data);  // Check structure

    // Now we map over the data and ensure artist_name exists and correctly handle it
    const videos: MusicVideo[] = data.map((item: { artist_name: string, video_url: string }) => ({
      artist_name: item.artist_name,  // We directly use 'artist_name' field
      video_url: item.video_url
    }));

    setMusicVideos(videos);  // Set the fetched music videos to state
  } catch (error) {
    console.error("Error fetching music videos:", error);
  }
};


  useEffect(() => {
    fetchMusicVideos();  // Fetch music videos on component mount
  }, []);

  const changePage = (page: string) => {
    console.log(`Changing page to: ${page}`);
    setCurrentPage(page);
  };

  const handleLogoClick = () => {
    setCurrentPage('home');
  };

  const handleSignInClick = () => {
    console.log("Sign In clicked");
    setCurrentPage('signIn');
  };

  const handleSignUpClick = () => {
    console.log("Sign Up clicked");
    setCurrentPage('signUp');
  };

  const handleSignIn = () => {
    console.log("User logged in");
    setIsLoggedIn(true);
    setCurrentPage('quiz'); // Redirect to quiz page after sign in
  };

  const handleSignUp = () => {
    console.log("User signed up");
    setCurrentPage('quiz'); // Redirect to quiz page after sign up
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      alert("Profile page clicked");
    } else {
      alert("You need to log in first.");
    }
  };

  const handleSearch = (artists: Artist[]) => {
    setArtists(artists);  // Update artists state
    setCurrentPage('searchResults');  // Change to searchResults page
  };

  return (
    <div className="App">
      <Navbar
        onLogoClick={handleLogoClick}
        onSignInClick={handleSignInClick}
        onSignUpClick={handleSignUpClick}
        onProfileClick={handleProfileClick}
      />

      {/* Conditional Rendering based on currentPage */}
      {currentPage === 'home' && <HomePage changePage={changePage} />}
      {currentPage === 'quiz' && <QuizPage />}
      {currentPage === 'genre' && <KpopByGenrePage changePage={handleSearch} />}
      {currentPage === 'searchResults' && <SearchResultsPage artists={artists} music_videos={musicVideos} />}
      {currentPage === 'signIn' && <SignInPage changePage={changePage} onSignInClick={handleSignIn} />}
      {currentPage === 'signUp' && <SignUpPage changePage={changePage} onSignUpClick={handleSignUp} />}
    </div>
  );
};

export default App;
