
import './App.css'
import MovieList from './components/MovieList/MovieList'
import Navbar from './components/Navbar/Navbar'
import Fire from "./assets/fire.png";
import Star from "./assets/glowing-star.png";
import Party from "./assets/partying-face.png";

function App() {
  
    return (
        <>
        <div className='app'>
			<Navbar/>

			<MovieList type='popular' title='인기작품' emoji={Fire}/>
			<MovieList type='top_rated' title='최고평점' emoji={Star}/>
			<MovieList type='upcoming' title='최신작품' emoji={Party}/>
		</div>
        </>
    )
}

export default App
