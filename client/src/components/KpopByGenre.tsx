import React, { useState } from "react";
import '../styles/KpopByGenre.css';

const KpopByGenrePage: React.FC<{ changePage: (artists: Array<{ id: number; name: string; genre: string; type: string; gender: string; created_at: string; }>) => void }> = ({ changePage }) => {
  
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [showTypeQuestion, setShowTypeQuestion] = useState<boolean>(false);
    const [showGenderQuestion, setShowGenderQuestion] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const nonKoreanGenres = [
        "Pop", "Hip-Hop", "Ballad", "Rock", "R&B", "Jazz", "Dance", "Indie", "Trap", "EDM"
    ];

    const handleClickGenre = (genre: string) => {
        setSelectedGenre(genre);
        setShowTypeQuestion(true);
    };

    const handleSelectType = (type: string) => {
        setSelectedType(type);
        setShowTypeQuestion(false);
        setShowGenderQuestion(true);
    };

    const handleSelectGender = (gender: string) => {
        setSelectedGender(gender);
        setShowGenderQuestion(false);
    };

    const handleSearch = async () => {
        if (!selectedGenre || !selectedType || !selectedGender) {
          setError('Please select genre, type, and gender');
          return;
        }
      
        setLoading(true);
        setError(null); // Reset any previous error
      
        try {
          const normalizedGenre = selectedGenre ? selectedGenre.toLowerCase() : '';
      
          const response = await fetch(`http://localhost:8080/api/artists?genre=${normalizedGenre}&type=${selectedType}&gender=${selectedGender}`);
      
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
      
          const data = await response.json();
          console.log(data);
      
          if (!data || data.length === 0) {
            setError('No artists found for the selected criteria.');
            return;
          }
      
          // Now passing the data (artist objects) to the changePage function
          changePage(data); // Pass the full artist data, not just the names or strings
        } catch (error) {
          setError('There was an error fetching the artists. Please try again.');
          console.error(error);
        } finally {
          setLoading(false);
        }
    };
    

    return (
        <div className="kpop-genre-page">
            <h2 style={{ marginTop: '240px', textAlign: 'center', fontSize: '56px' }}>
                Discover Your Perfect Sound in the Korean Music World
            </h2>
            <p style={{ textAlign: 'center', fontSize: '30px' }}>Choose Your Favorite Music Genre</p>

            <div className="genre-list">
                {nonKoreanGenres.map((genre, index) => (
                    <button
                        key={index}
                        className="genre-button"
                        onClick={() => handleClickGenre(genre)}
                    >
                        {genre}
                    </button>
                ))}
            </div>

            {selectedGenre && (
                <>
                    <div className="selection-section">
                        <h3>Select Type: Group or Soloist</h3>
                        <button onClick={() => handleSelectType("group")}>Group</button>
                        <button onClick={() => handleSelectType("soloist")}>Soloist</button>
                    </div>

                    <div className="selection-section">
                        <p>Select Gender: Female or Male</p>
                        <button onClick={() => handleSelectGender("male")}>Male</button>
                        <button onClick={() => handleSelectGender("female")}>Female</button>
                    </div>
                </>
            )}

            <div className="search-button-container" style={{display: 'flex', flexDirection: 'row-reverse'}}>
                <button onClick={handleSearch} className="search-button" disabled={loading} style={{display: 'flex', justifyContent:'flex-end'}}>
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default KpopByGenrePage;
