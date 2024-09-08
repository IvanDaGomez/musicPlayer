import { useEffect, useState } from "react"
import Header from "../../components/header"
import { MusicPlayer } from "../../components/musicPlayer"

import { useParams } from "react-router-dom"
import { playlist as pl } from "../../assets/playlist.js" 

export default function Playlist(){
    const { id } = useParams();

    const [playlist, setPlaylist] = useState(null);
    
    
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await fetch(`http://localhost:3030/api/playlists/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlaylist(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchPlaylist();

    }, [id]); // Add playlistID as a dependency

    setPlaylist(pl)
    return (
        <>
        <Header />
        <div className="mainView">
            <h1>{playlist.name}</h1>
        </div>
        <MusicPlayer />

        </>

    )
}