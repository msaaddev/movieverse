// packages
import { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

// utils
import config from '../utils/config';

// components
import Movie from '../components/common/Movie';
import Loader from '../components/common/Loader';

// stylesheet
import css from '../styles/index.module.css';

export default function Home() {
	// states
	const [movies, setMovies] = useState([]);
	const [starArr, setStarArr] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		(async () => {
			// fetch data from the first page
			await getMovies(1);

			// get star array from the local storage
			const arr = JSON.parse(localStorage.getItem('starredArr'));
			if (!arr) {
				localStorage.setItem('starredArr', JSON.stringify([]));
			} else {
				setStarArr(arr);
			}
		})();
	}, []);

	/**
	 *
	 *
	 * fetch movies from the API
	 * @param {pg} - page to get the data from
	 */
	const getMovies = async (pg) => {
		try {
			const res = await axios.get(`${config.api}&page=${pg}`);
			const { data } = res;
			const { results } = data;

			const tempState = [...movies, ...results];
			setMovies(tempState);

			let tempPage = page;
			tempPage++;
			tempPage !== 26 ? setPage(tempPage) : setHasMore(false);
		} catch (err) {
			console.error(err);
		}
	};

	/**
	 *
	 *
	 * @param
	 */
	const renderMovies = () => {
		return movies.map((movie) => {
			return (
				<Movie
					key={movie.id}
					poster={movie.poster_path}
					title={movie.title}
					rating={movie.vote_average}
					year={movie.release_date}
					id={movie.id}
					isStar={starArr.includes(movie.id) ? true : false}
				/>
			);
		});
	};

	return (
		<div className={css.container}>
			<div className={css.sub_container}>
				<div className={css.heading}>
					<h2>Top 500 Highest Rated Movies</h2>
				</div>
				{movies.length > 0 ? (
					<InfiniteScroll
						dataLength={movies.length}
						next={() => getMovies(page)}
						hasMore={hasMore}
						loader={<Loader />}
					>
						{renderMovies()}
					</InfiniteScroll>
				) : (
					<Loader />
				)}

				{!hasMore && (
					<div className={css.end}>
						<h3>Top 500 movies loaded.</h3>
					</div>
				)}
			</div>
		</div>
	);
}
