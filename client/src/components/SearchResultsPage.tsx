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
  music_videos: Array<{ artist_name: string; video_url: string }>;
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

  // Get the name of the first artist in the list (if any)
  const firstArtistName = artists.length > 0 ? artists[0].name : "";

  return (
    <div className="search-results-page">
      {artists.length > 0 ? (
        <h2 style={{ marginTop: "100px", textAlign: "center", fontSize: "40px" }}>
          {firstArtistName ? `${firstArtistName}'s Videos` : "Artist Videos"}
        </h2>
      ) : (
        <p>No artists selected. Please select a genre, type, and gender first.</p>
      )}

      <div className="artist-videos-list">
        {artists.map((artist) => {
          // Filter the music_videos to get all videos for the current artist
          const artistVideos = music_videos.filter((video) => video.artist_name === artist.name);

          return (
            <div key={artist.id} className="artist-video-item">

              {artistVideos.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "row", overflowX: "auto", alignItems:'center', justifyContent:'center'}}>
                  {artistVideos.map((video, index) => (
                    <div key={index} style={{ marginRight: "20px" }}>
                      <iframe
                        width="700"
                        height="400"
                        src={converterUrlToEmbedUrl(video.video_url)}
                        title={`${artist.name} Video ${index + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No videos available for this artist.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResultsPage;

