import Header from '../../components/header'
import './App.css'
import { MusicPlayer } from '../../components/musicPlayer'
import { Home } from './Home'
function App() {

  const renderAudio = () => {
    
  }
  return (
    <>
      {renderAudio()}
      <Header/>
      <Home/>
      <MusicPlayer/>
    </>
  )
}

export default App
