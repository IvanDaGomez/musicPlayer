import { useEffect, useState } from "react"
import Header from "../../components/header"
import { MusicPlayer } from "../../components/musicPlayer"

import { useParams } from "react-router-dom"

export default function Playlist(){

    const [playlist, setPlaylist] = useState(null);
    const { id: playlistID } = useParams();

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await fetch(`http://localhost:3030/api/playlists/${playlistID}`);
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

    }, [playlistID]); // Add playlistID as a dependency

    const playlists =   {
        id:1,
        name:"Im A Human",
        photo:"",
        songs: []
    }
    return (
        <>
        <Header />
        <div className="mainView">
            <h1>{playlists.name}</h1>
        </div>
        <MusicPlayer />

        </>

    )
}