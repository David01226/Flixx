import './App.css'
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import HomePage from "./pages/HomePage"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieDetails from "./pages/MovieDetails";
import ShowDeatils from "./pages/ShowDetails";
import Search from "./pages/Search";
import Shows from "./pages/Shows";

function App() {

  return (
    <> 
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={ <HomePage />} />
        <Route path='/movie' element={<MovieDetails />}>
          <Route path=':movieId' element={<MovieDetails />} />
        </Route>
        <Route path='/show-details' element={ <ShowDeatils />} />
        <Route path='/shows' element={ <Shows />} />
        <Route path='/search' element={ <Search />} />
      </Routes>
      <Footer />
      <div className="spinner"></div>
    </BrowserRouter>
    </>
  )
}

export default App
