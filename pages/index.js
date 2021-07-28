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
	const [ascPage, setAscPage] = useState(25);
	const [hasMore, setHasMore] = useState(true);
	const [sortBy, setSortBy] = useState('desc');

	useEffect(() => {
		(async () => {
			// fetch data from the first page
			sortBy === 'desc' && (await getMovies(1));

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
	 * @param {sort} - sorting value with default descending
	 * @param {firstRender} - first render on the screen after sorting value change
	 */
	const getMovies = async (pg, sort = 'desc', firstRender = false) => {
		try {
			const res = await axios.get(`${config.api}&page=${pg}`);
			const { data } = res;
			const { results } = data;

			if (sort === 'desc') {
				let tempState;
				firstRender
					? (tempState = [...results])
					: (tempState = [...movies, ...results]);
				setMovies(tempState);

				let tempPage = page;
				tempPage++;
				tempPage !== 26 ? setPage(tempPage) : setHasMore(false);
			} else {
				const newResults = results.reverse();
				let tempState;
				firstRender
					? (tempState = [...newResults])
					: (tempState = [...movies, ...newResults]);
				setMovies(tempState);

				let tempPage = ascPage;
				tempPage--;
				tempPage !== 0 ? setAscPage(tempPage) : setHasMore(false);
			}
		} catch (err) {
			console.error(err);
		}
	};

	/**
	 *
	 *
	 * @param {value} - sorting value either 'desc' or 'asc'
	 */
	const handleSort = (value) => {
		setSortBy(value);
		setMovies([]);
		setPage(1);
		setAscPage(25);

		if (value !== 'desc') {
			getMovies(25, value, true);
		} else {
			getMovies(1, value, true);
		}
	};

	/**
	 *
	 *
	 * map out all the movies on the screen
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
				<div className={css.header}>
					<h2>Top 500 Highest Rated Movies</h2>
					<select onChange={(e) => handleSort(e.target.value)}>
						<option value="desc">Descending</option>
						<option value="asc">Ascending</option>
					</select>
				</div>
				{movies.length > 0 ? (
					<InfiniteScroll
						dataLength={movies.length}
						next={() => {
							sortBy === 'desc'
								? getMovies(page)
								: getMovies(ascPage, 'asc');
						}}
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
