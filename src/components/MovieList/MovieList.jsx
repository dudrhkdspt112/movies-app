import React, { useEffect, useState } from 'react'
import "./MovieList.css";
import Fire from '../../assets/fire.png';
import MovieCard from './MovieCard';
import _, { filter } from 'lodash';


export default function MovieList({type, title, emoji}) {
    
    const [movies, setMovies] = useState([]);
    const [filterMovies, setFilterMovies] = useState([]); //걸러내기
	const [minRating, setMinRating] = useState(0); //평점
    const [sort, setSort] = useState({
        by: 'default',
        order: 'asc',
    })

    const handleSort = (e) => {
        const {name, value} = e.target;
        setSort((prev) => ({...prev, [name]: value}));
    }
    //console.log(sort);

    const handleFilter = (rate) => {
        if(minRating === rate) {
           setMinRating(0);
           setFilterMovies(movies); 
        } else {
            setMinRating(rate); //입력된 평점을 일단 스테이트에 저장
            const filtered = movies.filter((movie) => movie.vote_average >= rate);
            setFilterMovies(filtered); //평점 이상 영화만 저장
        }
    }

    

    const fetchMovies = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=ad3ddcd829c431fdca5896a52fc9ebaf&language=ko`)
        .then((res) => res.json())
        .then((data) => {
            setMovies(data.results); 
            setFilterMovies(data.results);
        })
        .catch((err) => console.log(err))
    }
    
    // sort값이 업데이트 할때마다 실행
    useEffect(() => {
        if(sort.by !== 'default') {
            const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);
            setFilterMovies(sortedMovies);
        }
    }, [sort]);

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
    <section className='movie_list' id={`${type}`}>
			<header className='align_center movie_list_header'>
				<h2 className='align_center movie_list_heading'>
					{title} <img src={emoji} alt='fire emoji' className='navbar_emoji' />
				</h2>

				<div className='align_center movie_list_fs'>
					<ul className='align_center movie_filter'>
						<li onClick={() => handleFilter(8)} className={minRating === 8?'movie_filter_item active' : 'movie_filter_item'}>8+ Star</li>
						<li onClick={() => handleFilter(7)} className={minRating === 7?'movie_filter_item active' : 'movie_filter_item'}>7+ Star</li>
						<li onClick={() => handleFilter(6)}  className={minRating === 6?'movie_filter_item active' : 'movie_filter_item'}>6+ Star</li>
					</ul>

					<select name='by' id='by' onChange={handleSort} className='movie_sorting'>
						<option value='default'>SortBy</option>
						<option value='release_date'>Date</option>
						<option value='vote_average'>Rating</option>
					</select>
					<select name='order' id='order' onChange={handleSort} className='movie_sorting'>
						<option value='asc'>Ascending</option>
						<option value='desc'>Descending</option>
					</select>
				</div>
			</header>

			<div className='movie_cards'>
                {filterMovies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</section>
  )
}
