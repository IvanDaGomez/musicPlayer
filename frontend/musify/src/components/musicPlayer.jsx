import {  useEffect, useRef, useState } from "react"
import selectedSong from "../assets/selectedSong.js"
export function MusicPlayer(){

    const volumeOptions = {
        MUTED: (
            <svg className="volumeClick" onClick={() => handleVolumeClick(actualVolume, setActualVolume)}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"}>
                <path d="M18 14.8135V9.18646C18 6.04126 18 4.46866 17.074 4.0773C16.1481 3.68593 15.0583 4.79793 12.8787 7.02192C11.7499 8.17365 11.1059 8.42869 9.5 8.42869C8.3879 8.42869 7.02749 8.28131 6.33706 9.33566C6 9.85038 6 10.5669 6 12C6 13.4331 6 14.1496 6.33706 14.6643C7.02749 15.7187 8.3879 15.5713 9.5 15.5713C11.106 15.5713 11.7499 15.8264 12.8787 16.9781C15.0583 19.2021 16.1481 20.3141 17.074 19.9227C18 19.5313 18 17.9587 18 14.8135Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        LOW: (
            <svg className="volumeClick" onClick={() => handleVolumeClick(actualVolume, setActualVolume)}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"}>
                <path d="M19 9C19.6254 9.81968 20 10.8634 20 12C20 13.1366 19.6254 14.1803 19 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 14.8135V9.18646C16 6.04126 16 4.46866 15.0747 4.0773C14.1494 3.68593 13.0604 4.79793 10.8823 7.02192C9.7544 8.17365 9.11086 8.42869 7.50605 8.42869C6.10259 8.42869 5.40086 8.42869 4.89677 8.77262C3.85036 9.48655 4.00854 10.882 4.00854 12C4.00854 13.118 3.85036 14.5134 4.89677 15.2274C5.40086 15.5713 6.10259 15.5713 7.50605 15.5713C9.11086 15.5713 9.7544 15.8264 10.8823 16.9781C13.0604 19.2021 14.1494 20.3141 15.0747 19.9227C16 19.5313 16 17.9587 16 14.8135Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        HIGH: (
            <svg className="volumeClick" onClick={() => handleVolumeClick(actualVolume, setActualVolume)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"}>
                <path d="M14 14.8135V9.18646C14 6.04126 14 4.46866 13.0747 4.0773C12.1494 3.68593 11.0603 4.79793 8.88232 7.02192C7.75439 8.17365 7.11085 8.42869 5.50604 8.42869C4.10257 8.42869 3.40084 8.42869 2.89675 8.77262C1.85035 9.48655 2.00852 10.882 2.00852 12C2.00852 13.118 1.85035 14.5134 2.89675 15.2274C3.40084 15.5713 4.10257 15.5713 5.50604 15.5713C7.11085 15.5713 7.75439 15.8264 8.88232 16.9781C11.0603 19.2021 12.1494 20.3141 13.0747 19.9227C14 19.5313 14 17.9587 14 14.8135Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 9C17.6254 9.81968 18 10.8634 18 12C18 13.1366 17.6254 14.1803 17 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 7C21.2508 8.36613 22 10.1057 22 12C22 13.8943 21.2508 15.6339 20 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    };
    //const [selectedSong, setSelectedSong] = useState();

    const audio = useRef(null);
    const volumeSlider = useRef(null);
    const mediaPlayer = useRef(null);

    const [actualSongState, setActualSongState] = useState(localStorage.getItem("playstate") ?? "paused");
    const [lastVolumeValue, setLastVolumeValue] = useState(localStorage.getItem("volume") ?? 50);
    const [actualVolume, setActualVolume] = useState(volumeOptions.LOW);
    const [duration, setDuration] = useState("00:00");
    const [timeline, setTimeline] = useState("00:00");
    const [repeatButton, setRepeatButton] = useState((localStorage.getItem("repeat") !== "true") || false);

    useEffect(() => {
        const savedCurrentTime = localStorage.getItem("currentTime");
        const savedVolume = localStorage.getItem("volume") || 1; // Default to full volume if nothing is saved

    

        if (volumeSlider.current && savedVolume) {
            volumeSlider.current.value = savedVolume;
        }
        // Set audio time when metadata is loaded
        const handleMetadataLoaded = () => {
            if (savedCurrentTime) {
                audio.current.currentTime = parseFloat(savedCurrentTime);
            }
            if (actualSongState === "play") {
                audio.current.play();
            } else {
                audio.current.pause();
            }
        };

        if (audio.current) {
            audio.current.addEventListener("loadedmetadata", handleMetadataLoaded);

            audio.current.volume = savedVolume / 100;
            (repeatButton) ? audio.current.loop = true : ""
        }

        return () => {
            if (audio.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                audio.current.removeEventListener("loadedmetadata", handleMetadataLoaded);
            }
        };
    }, [actualSongState]); // Add actualSongState as a dependency


    function changePlayState(actualSongState){
        if (actualSongState === "paused") {
            audio.current.play();
            setActualSongState("play")
            
        }
        else {
            audio.current.pause();
            setActualSongState("paused")
        
        }
        localStorage.setItem("playstate", `${actualSongState}`)
    }


    const handleVolumeClick = (actualVolume, setActualVolume) => {
        
        
        if (volumeSlider.current.value == "0") {
            const newVolume = parseInt(lastVolumeValue, 10) >= 50 ? volumeOptions.HIGH : volumeOptions.LOW;
            setActualVolume(newVolume);
            volumeSlider.current.value = lastVolumeValue;
            audio.current.muted = false;
        } else {
            
            setLastVolumeValue(volumeSlider.current.value);
            setActualVolume(volumeOptions.MUTED);
            volumeSlider.current.value = 0;
            audio.current.muted = true;
        }
    };
    
    
    const handleVolumeChange = () => {
        const value = volumeSlider.current.value;
        audio.current.volume = volumeSlider.current.value/100
        if (value == 0) {
            setLastVolumeValue(value);
            setActualVolume(volumeOptions.MUTED);
        } else if (value <= 50) {
            setLastVolumeValue(value);
            setActualVolume(volumeOptions.LOW);
        } else if (value > 50){
            setLastVolumeValue(value);
            setActualVolume(volumeOptions.HIGH);
        }
        localStorage.setItem("volume", value)
    };

    const toTimeFormat = (time) =>{

        //-----------------Minutes-------------Seconds----------------------------------------
        const minAndSec = [Math.floor(time/60), (time % 60 < 10) ? `0${time % 60}`: time % 60]

        return `${(minAndSec[0])}:${minAndSec[1]}`
    }
    const handleAudio = ()=>{
        let timeDuration = parseInt(audio.current.duration)
        let currentTimeline = parseInt(audio.current.currentTime)

        mediaPlayer.current.value = `${(currentTimeline / timeDuration) * 100}`

        timeDuration = toTimeFormat(timeDuration)
        currentTimeline = toTimeFormat(currentTimeline);

        setDuration(timeDuration);
        setTimeline(currentTimeline);
        localStorage.setItem("currentTime", audio.current.currentTime)
        
    }
    const handleMediaPlayer = () => {
        const value = mediaPlayer.current.value;  // Get the slider value (1-100)
        
        
        audio.current.currentTime = (audio.current.duration / 100) * value;
        
        // Update the timeline with the formatted current time
        setTimeline(toTimeFormat(parseInt(audio.current.currentTime)));
        localStorage.setItem("currentTime", audio.current.currentTime);
    };

    const handleLastSong = ()=>{
        //if (mediaPlayer.current.value < 5) setSelectedSong(playlists[-1])
        audio.current.currentTime = 0
    }

    const handleRepeatButton = ()=>{
        if(!audio.current.loop) audio.current.loop = true
        else audio.current.loop = false
        setRepeatButton(!repeatButton)
        localStorage.setItem("repeat", `${repeatButton}`)
    }

    return (
        <>
        <audio ref={audio} src={selectedSong.song} onTimeUpdate={handleAudio} ></audio>
        <div className="musicPlayer">
            <div className="left">
                <img src={selectedSong.photo} alt={selectedSong.name} title={selectedSong.name}/>
                <div className="title">
                    <h3>{selectedSong.name}</h3>
                    <p>{selectedSong.author}</p>
                </div>
                <div className="añadidoAPlaylist selected">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#ffffff"} fill={"none"}>
                        <path d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <div className="middle">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"}>
                    <path d="M16.5 17.5L18 15.75H16.1407C15.0928 15.75 14.5688 15.75 14.1267 15.5281C13.6845 15.3063 13.3938 14.8976 12.8125 14.0801L9.85413 9.91987C9.27285 9.10244 8.9822 8.69372 8.54002 8.47186C8.09783 8.25 7.57386 8.25 6.52593 8.25H6M16.5 6.5L18 8.25H16.1407C15.0928 8.25 14.5688 8.25 14.1267 8.47186C13.6845 8.69372 13.3938 9.10244 12.8125 9.91987M6 15.75H6.52593C7.57386 15.75 8.09783 15.75 8.54001 15.5281C8.9822 15.3063 9.27285 14.8976 9.85413 14.0801" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <svg onClick={handleLastSong} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={30} height={30} color={"#ffffff"} fill={"#ffffff"}>
    <path d="M2.16293 12.9178C2.4453 13.6884 3.29859 14.3047 5.00518 15.5372C7.33231 17.218 8.49587 18.0583 9.4688 17.9969C10.2118 17.9499 10.9024 17.6007 11.3777 17.0315C12 16.2863 12 14.8575 12 12C12 9.14246 12 7.71369 11.3777 6.96846C10.9024 6.39933 10.2118 6.0501 9.4688 6.00315C8.49587 5.94167 7.33231 6.78203 5.00518 8.46275C3.29859 9.6953 2.4453 10.3116 2.16293 11.0822C1.94569 11.675 1.94569 12.325 2.16293 12.9178Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12.1629 12.9178C12.4453 13.6884 13.2986 14.3047 15.0052 15.5372C17.3323 17.218 18.4959 18.0583 19.4688 17.9969C20.2118 17.9499 20.9024 17.6007 21.3777 17.0315C22 16.2863 22 14.8575 22 12C22 9.14246 22 7.71369 21.3777 6.96846C20.9024 6.39933 20.2118 6.0501 19.4688 6.00315C18.4959 5.94167 17.3323 6.78203 15.0052 8.46275C13.2986 9.6953 12.4453 10.3116 12.1629 11.0822C11.9457 11.675 11.9457 12.325 12.1629 12.9178Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
</svg>
                
                {(actualSongState === "play" ) ? <svg onClick={()=>changePlayState(actualSongState)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#000000"} fill={"#000000"} className="playstate">
    <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" stroke="currentColor" strokeWidth="1.5" />
</svg>:<svg className="playstate" onClick={()=>changePlayState(actualSongState)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#000000"} fill={"#000000"}>
    <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
</svg>}
                
                <svg className="rotate"xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width={30} height={30} color={"#ffffff"} fill={"#ffffff"}>
    <path d="M2.16293 12.9178C2.4453 13.6884 3.29859 14.3047 5.00518 15.5372C7.33231 17.218 8.49587 18.0583 9.4688 17.9969C10.2118 17.9499 10.9024 17.6007 11.3777 17.0315C12 16.2863 12 14.8575 12 12C12 9.14246 12 7.71369 11.3777 6.96846C10.9024 6.39933 10.2118 6.0501 9.4688 6.00315C8.49587 5.94167 7.33231 6.78203 5.00518 8.46275C3.29859 9.6953 2.4453 10.3116 2.16293 11.0822C1.94569 11.675 1.94569 12.325 2.16293 12.9178Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12.1629 12.9178C12.4453 13.6884 13.2986 14.3047 15.0052 15.5372C17.3323 17.218 18.4959 18.0583 19.4688 17.9969C20.2118 17.9499 20.9024 17.6007 21.3777 17.0315C22 16.2863 22 14.8575 22 12C22 9.14246 22 7.71369 21.3777 6.96846C20.9024 6.39933 20.2118 6.0501 19.4688 6.00315C18.4959 5.94167 17.3323 6.78203 15.0052 8.46275C13.2986 9.6953 12.4453 10.3116 12.1629 11.0822C11.9457 11.675 11.9457 12.325 12.1629 12.9178Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
</svg>   

                <svg  onClick={handleRepeatButton} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} style={{  color: repeatButton  ? getComputedStyle(document.documentElement).getPropertyValue('--using4') : getComputedStyle(document.documentElement).getPropertyValue('--using2')}} fill={"none"}>
    <path d="M16.3884 3L17.3913 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.61156 21L6.60875 20.0243C6.16074 19.5883 5.93673 19.3704 6.01557 19.1852C6.09441 19 6.4112 19 7.04478 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                </div>
                <div className="timeline">
                    <span>{timeline}</span>
                    <input type="range" ref={mediaPlayer} onChange={handleMediaPlayer}/>
                    <span>{duration}</span>
                </div>
                
            </div>
        <div className="right">
            {actualVolume}
            <input type="range" className="volumeSlider" style={{cursor: "pointer"}} ref={volumeSlider} onChange={handleVolumeChange} />
        </div>
        </div>
        </>
    )
}