import { useEffect, useState } from "react";
import Header from "../../components/header";
import { MusicPlayer } from "../../components/musicPlayer";

import { useParams } from "react-router-dom";
import { playlist as localPlaylist } from "../../assets/playlist.js";
import Queue from "../../components/queue.jsx";

export default function Playlist() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  // Fetch playlist from API
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`http://localhost:3030/api/playlists/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPlaylist(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        // If API fails, set the local playlist as a fallback
        setPlaylist(localPlaylist);
      }
    };

    fetchPlaylist();
  }, [id]);


  return (
    <>
      <Header />
      <div className="mainView">
      {(!playlist) ?<div style={{height:"100vh"}}>Loading...</div> : <div className="firstDiv">
        <div className="controls ">
          <div className="circle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#ffffff"} fill={"none"}>
    <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg></div>
          <div className="circle"></div>
        </div>
        <div className="info">
          {/* Conditional rendering for playlist data */}
          {playlist.photo && (
            <img src={playlist.photo} title={playlist.name} alt={playlist.name} />
          )}
          <div className="upAndDown">
            <h1>{playlist.name}</h1>
            <p>{playlist.description}</p>
          </div>
        </div>

        {/* Render the playlist songs */}
        <div className="songsContainer">
        {playlist.children && playlist.children.length > 0 ? (
          playlist.children.map((song, index) => (
            <div className="song" key={index}>
              {/* Use song.photo for the image */}
              <img src={song.photo} title={song.name} alt={song.name} />
              <div className="upAndDown">
                <h3>{song.name}</h3>
                <p>{song.author}</p>
              </div>
              {song.duration && <p>{song.duration}</p>}
            </div>
          ))
        ) : (
          <p>No songs available.</p>
        )}
      </div>
      </div>}
      <div className="secondDiv">
        <Queue />
      </div>
      </div>
      
      <MusicPlayer />
    </>
  );
}
