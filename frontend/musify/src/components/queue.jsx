import { playlist as pl } from "../assets/playlist.js"
import { useState } from "react";


export default function Queue(handleOpenInfo){
    const [selectedSong, setselectedSong] = useState(pl.children[0]);

    const x = <svg  onClick={handleOpenInfo} xmlns="http://www.w3.org/2000/svg" style={{cursor:"pointer"}}viewBox="0 0 24 24" width={50} height={50} color={"#ffffff"} fill={"none"}>
    <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>;
    return (
        <>
        <div className="split">
                <h2>Song Info</h2> 
                {x}
            </div>
            <h1>{selectedSong.name}</h1>
            <img src={selectedSong.photo} alt={selectedSong.name} />
            <h3>Author: {selectedSong.author}</h3>
        </>
    )
}