import React, { useState, useEffect } from "react";
import './App.css';

import HomePage from "./components/HomePage";
import QuizPage from "./components/QuizPage";
import KpopByGenrePage from "./components/KpopByGenre";
import Navbar from "./components/NavBar";
import SearchResultsPage from "./components/SearchResultsPage";
import SignInPage from "./NavBarComponents/SignIn";
import SignUpPage from "./NavBarComponents/SingUp";

import { supabase } from '../supabaseClient';

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
  const [user, setUser] = useState<any>(null); // To store logged-in user information
  const [artists, setArtists] = useState<Artist[]>([]);
  const [musicVideos, setMusicVideos] = useState<MusicVideo[]>([]);

  // Fetch music videos from Supabase
  const fetchMusicVideos = async () => {
    try {
      const { data, error } = await supabase.from('music_videos').select('*');
      if (error) throw error;

      const videos: MusicVideo[] = data.map((item: { artist_name: string, video_url: string }) => ({
        artist_name: item.artist_name,
        video_url: item.video_url
      }));

      setMusicVideos(videos);  // Set music videos state
    } catch (error) {
      console.error("Error fetching music videos:", error);
    }
  };

  useEffect(() => {
    fetchMusicVideos();  // Fetch music videos on mount
  }, []);

  // Check if user is logged in when the component mounts
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
        return;
      }
      if (session) {
        setIsLoggedIn(true);
        setUser(session.user);  // Store user info
      }

      const authListener = supabase.auth.onAuthStateChange((_, session) => {
        if(session) {
          setIsLoggedIn(true);
          setUser(session.user);
        } else {
          setIsLoggedIn(false);
          setUser(null)
        }
      }) 
      console.log(authListener)
    };

   
    checkSession(); // Check session on mount
  }, []);

  const changePage = (page: string) => {
    setCurrentPage(page); // Change page based on action
  };

  const handleLogoClick = () => {
    setCurrentPage('home');  // Redirect to home page
  };

  const handleSignInClick = () => {
    setCurrentPage('signIn');  // Navigate to SignIn page
  };

  const handleSignUpClick = () => {
    setCurrentPage('signUp');  // Navigate to SignUp page
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        alert(error.message);
        return;
      }

      const user = data?.user;

      if (user) {
        setIsLoggedIn(true);
        setUser(user);  // Store user info
        setCurrentPage('quiz');  // Redirect to quiz page
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        alert(error.message);
        return;
      }

      const user = data?.user;

      if (user) {
        setIsLoggedIn(true);
        setUser(user);  // Store user info
        setCurrentPage('quiz');  // Redirect to quiz page
      } else {
        alert("Sign-up failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();  // Log out the user
      setIsLoggedIn(false);  // Set isLoggedIn to false
      setUser(null);  // Clear user data
      setCurrentPage('home');  // Redirect to home page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      alert(`Welcome to your profile, ${user?.email}`);
      setCurrentPage('profile');  // Navigate to profile page
    } else {
      alert("You need to log in first.");
    }
  };

  const handleSearch = (artists: Artist[]) => {
    setArtists(artists);  // Update artists state
    setCurrentPage('searchResults');  // Navigate to searchResults page
  };

  return (
    <div className="App">
      <Navbar
        onLogoClick={handleLogoClick}
        onSignInClick={handleSignInClick}
        onSignUpClick={handleSignUpClick}
        onProfileClick={handleProfileClick}
        onSignOutClick={handleSignOut}
        isLoggedIn={isLoggedIn}  // Pass isLoggedIn state to Navbar
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
