import React from "react";

interface SearchResultsPageProps {
  artists: Array<{
    id: number;
    name: string;
    genre: string;
    type: string;
    gender: string;
    created_at: string;
  }>;
  music_videos: Array<{ artist_name: string; video_url: string }>;  // Update type to be an array
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ artists, music_videos }) => {
  const converterUrlToEmbedUrl = (video_url: string) => {
    if (!video_url.includes("https://www.youtube.com/watch?v=")) {
      console.error("You need to use a proper YouTube URL");
      return "";
    }

    const videoId = new URL(video_url).searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  return (
    <div className="search-results-page">
      <h2 style={{ marginTop: "80px", textAlign: "center", fontSize: "40px" }}>
        Artist Videos
      </h2>

      <div className="artist-videos-list">
        {artists.length > 0 ? (
          artists.map((artist) => {
            console.log("Artist Name:", artist.name); // Log to see the name

            // Use .find() to get the correct video URL for each artist
            const videoUrl = music_videos.find((video) => video.artist_name === artist.name)?.video_url;

            return (
              <div key={artist.id} className="artist-video-item">
                <h3>{artist.name}</h3>

                {videoUrl ? (
                  <iframe
                    width="480"
                    height="315"
                    src={converterUrlToEmbedUrl(videoUrl)}
                    title={`${artist.name} YouTube Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p>No video available for this artist.</p>
                )}
              </div>
            );
          })
        ) : (
          <p>No artists selected. Please select a genre, type, and gender first.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
