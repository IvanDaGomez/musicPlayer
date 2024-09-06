import { Link } from "react-router-dom";
import { sideElements } from "../assets/sideElements";
import { colorpalettes } from "../assets/colorpalettes";
import { useEffect, useState } from "react";

export default function Header() {
    const root = document.documentElement;

    const updatePalette = (palette) => {
        for (let i = 1; i <= 6; i++) {
            const color = palette[i.toString()]; // Access palette color using string keys
            if (color) {
                root.style.setProperty(`--using${i}`, color);
            }
        }
        localStorage.setItem('palette', JSON.stringify(palette)); // Update local storage
    };

    useEffect(() => {
        const savedPalette = localStorage.getItem("palette");
        if (savedPalette) {
            const parsedPalette = JSON.parse(savedPalette);
            updatePalette(parsedPalette);
        } else {
            // Set default palette if no saved palette is found
            const defaultPalette = colorpalettes[0];
            
            updatePalette(defaultPalette);
        }
    }, []);

    const handleColorPalette = (palette, index) => {
        updatePalette(palette);

        localStorage.setItem("palette", JSON.stringify(palette));
    };

    const playlists = [{
        photo: "https://images.macrumors.com/t/vMbr05RQ60tz7V_zS5UEO9SbGR0=/1600x900/smart/article-new/2018/05/apple-music-note.jpg",
        name: "Nah im out",
        id: "1",
        songsIds: []
    }, {
        photo: "https://images.macrumors.com/t/vMbr05RQ60tz7V_zS5UEO9SbGR0=/1600x900/smart/article-new/2018/05/apple-music-note.jpg",
        name: "Nah im out",
        id: "1",
        songsIds: []
    }, {
        photo: "https://images.macrumors.com/t/vMbr05RQ60tz7V_zS5UEO9SbGR0=/1600x900/smart/article-new/2018/05/apple-music-note.jpg",
        name: "Nah im out",
        id: "1",
        songsIds: []
    }];

    return (
        <nav>
            {sideElements.map((element, index) => (
                <Link to={element.link} key={index}>
                    <div className="side">
                        {element.svg}
                        <span>{element.name}</span>
                    </div>
                </Link>
            ))}
            <div className="palettesContainer">
                {colorpalettes.map((palette, index) => (
                    <div
                        onClick={() => handleColorPalette(palette, index)}
                        key={index}
                        className="paletteElement"
                        style={{ background: `linear-gradient(90deg, ${palette["2"]}, ${palette["4"]})` }} // Ensure palette has enough colors
                    />
                ))}
            </div>
            <div className="playlistContainer">
                {playlists.map((playlist, index) => (
                    <a href={`https://localhost:3030/${playlist.id}`} key={index}>
                        <img src={playlist.photo} alt={playlist.name} className="playlist" />
                    </a>
                ))}
            </div>
        </nav>
    );
}
