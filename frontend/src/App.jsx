import './App.css'
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import NowPlaying from "./components/NowPlaying/NowPlaying"
import PopularMovies from "./components/PopularMovies/PopularMovies"
import Search from "./components/Search/Search"

function App() {

  return (
    <> 
    <Header />
    <NowPlaying />
    <Search />
    <PopularMovies />
    <Footer />
    <div className="spinner"></div>
    </>
  )
}

export default App
