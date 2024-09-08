import {  useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import playlist from "../../assets/selectedSong"


export function Home(){
    //const user = await fetch()
    const user = {
        firstName: "Ivan David",
        lastName: "Gomez Silva",
        playlists: [{
            photo:"https://images.macrumors.com/t/vMbr05RQ60tz7V_zS5UEO9SbGR0=/1600x900/smart/article-new/2018/05/apple-music-note.jpg",
            name:"Nah im out",
            id:"1",
            songsIds:[],
            author: "El primo"
        },{
            photo:"https://images.macrumors.com/t/vMbr05RQ60tz7V_zS5UEO9SbGR0=/1600x900/smart/article-new/2018/05/apple-music-note.jpg",
            name:"Nah im out",
            id:"2",
            songsIds:[]
        },{
            photo:"https://images.macrumors.com/t/vMbr05RQ60tz7V_zS5UEO9SbGR0=/1600x900/smart/article-new/2018/05/apple-music-note.jpg",
            name:"Nah im out",
            id:"3",
            songsIds:[]
        }],
        email: "ivandavidgomezsilva@hotmail.com",
        password: ""

    }
    
        const getName = (u)=>{
        const first = u.firstName.split(" ")[0]
        const last = u.lastName.split(" ")[0]
        return `${first} ${last}`
    }
    const authors = [
        {
            id: 1,
            name: "John Doe",
            photo: "https://images.lifestyleasia.com/wp-content/uploads/sites/2/2023/08/18131252/Untitled-design-2023-08-18T104227.999-1600x900.jpg"
        },
        {
            id: 2,
            name: "Jane Smith",
            photo: "https://images.lifestyleasia.com/wp-content/uploads/sites/2/2023/08/18131252/Untitled-design-2023-08-18T104227.999-1600x900.jpg"
        },
        {
            id: 3,
            name: "Alice Johnson",
            photo: "https://images.lifestyleasia.com/wp-content/uploads/sites/2/2023/08/18131252/Untitled-design-2023-08-18T104227.999-1600x900.jpg"
        }
    ];
    const [selectedSong, setselectedSong] = useState(playlist[0]);
    
    /*onClick={closeInfo}*/



    const [openInfo, setOpenInfo] = useState(() => {
        
        const storedValue = localStorage.getItem("open");
        if (!storedValue) return true
        return storedValue !== 'true'; 
    });

    useEffect(() => {
        localStorage.setItem("open", openInfo);
    }, [openInfo]);
    const secondDiv = useRef(null);
    const abrir = useRef(null)
    const firstDiv = useRef(null)
    const handleOpenInfo = () => {
        
        if (openInfo) {
            firstDiv.current.style.gridColumn = "1 / 6"
            secondDiv.current.style.display = "none"
            abrir.current.style.display = "flex"
        }
        else {
            firstDiv.current.style.gridColumn = "1 / 4"
            secondDiv.current.style.display = "block"
            abrir.current.style.display = "none"
        }
        setOpenInfo(!openInfo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>handleOpenInfo(),[])
    const x = <svg  onClick={handleOpenInfo} xmlns="http://www.w3.org/2000/svg" style={{cursor:"pointer"}}viewBox="0 0 24 24" width={50} height={50} color={"#ffffff"} fill={"none"}>
    <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>;
    return (
        <>
        <div className="mainView">
        <div className="firstDiv" ref={firstDiv}>
            <h1>Hello Back, {getName(user)} !</h1>
            {(user.playlists.length != 0) ?
            <>
            <p>There you have your playlists</p>
            <div className="playlistHomeContainer">
            {user.playlists.slice(0, 7).map((playlist, index)=>(
                <Link key={index} to={`playlists/${playlist.id}`} style={{display: "block", padding: "none", margin:"none", textDecoration: "none", width:"100%"}}>
                <div className="playlistHome" >
                    <img className="playlistHomeImg" src={playlist.photo} alt={playlist.name} /> <span>{playlist.name}</span>
                </div>
                </Link>
            ))} <div className="playlistHome">
                See More
            </div>
            </div></>
            :<><p>You don&apos;t have playlists, start by creating one!</p>
                <button className="boton1">
                    <h3>Create Playlist</h3>
                </button>
            </>}
            <hr />
            <h2>Look for your favorite author</h2>
            <div className="authorsContainers" >
                
                {authors.map((author,index) =>(
                    <div className="authorElement" key={index}>
                        <img src={author.photo} alt={author.name} />
                        <h3>{author.name}</h3>
                    </div>
                ))}
                <Link to="/search"><button className="boton1"><h3>See more</h3></button></Link>

            </div>
        </div>
        <div className="abrir" ref={abrir} onClick={handleOpenInfo}>
            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={30} height={30} color={"#ffffff"} fill={"none"}>
                <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
        <div className="secondDiv"  ref={secondDiv}>
            <div className="split">
                <h2>Song Info</h2> 
                {x}
            </div>
            <h1>{selectedSong.name}</h1>
            <img src={selectedSong.photo} alt={selectedSong.name} />
            <h3>Author: {selectedSong.author}</h3>
        </div>
        </div>
        </>
    )
}