// packages
import { useContext, useEffect } from 'react';
import axios from 'axios';

// utils
import config from '../utils/config';

// components
import FetchOnScroll from '../components/common/FetchOnScroll';
import MovieHeader from '../components/common/MovieHeader';
import Loader from '../components/common/Loader';

// context
import { MovieContext } from '../components/context/MovieContext';

// stylesheet
import css from '../styles/index.module.css';

export default function Home({ results }) {
	// contexts
	const { movies, setMovies } = useContext(MovieContext);
	const { setStarArr } = useContext(MovieContext);
	const { descPage, setDescPage } = useContext(MovieContext);
	const { ascPage, setAscPage } = useContext(MovieContext);
	const { hasMore, setHasMore } = useContext(MovieContext);
	const { setSortBy } = useContext(MovieContext);

	useEffect(() => {
		// initial state
		setMovies(results);

		// get star array from the local storage
		const arr = JSON.parse(localStorage.getItem('starredArr'));
		if (!arr) {
			localStorage.setItem('starredArr', JSON.stringify([]));
		} else {
			setStarArr(arr);
		}
	}, [results, setMovies, setStarArr]);

	/**
	 *
	 *
	 * fetch movies from the API
	 * @param {page} - page to get the data from
	 * @param {sort} - sorting value with default descending
	 * @param {firstRender} - first render on the screen after sorting value change
	 */
	const getMovies = async (page, sort = 'desc', firstRender = false) => {
		try {
			const res = await axios.get(`${config.api}&page=${page}`);
			const { data } = res;
			const { results } = data;

			if (sort === 'desc') {
				let tempState;
				firstRender
					? (tempState = [...results])
					: (tempState = [...movies, ...results]);
				setMovies(tempState);

				let tempPage = descPage;
				tempPage++;
				tempPage !== 26 ? setDescPage(tempPage) : setHasMore(false);
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
	 * handles sorting the API data
	 * @param {value} - sorting value either 'desc' or 'asc'
	 */
	const handleSort = (value) => {
		setSortBy(value);
		setMovies([]);
		setDescPage(1);
		setAscPage(25);

		if (value !== 'desc') {
			getMovies(25, value, true);
		} else {
			getMovies(1, value, true);
		}
	};

	return (
		<div className={css.container}>
			<div className={css.sub_container}>
				<MovieHeader handleSort={handleSort} />
				{movies ? <FetchOnScroll next={getMovies} /> : <Loader />}
				<div className={css.end}>
					{!hasMore && <h3>Top 500 movies loaded.</h3>}
				</div>
			</div>
		</div>
	);
}

// fetching data at build time
export async function getStaticProps() {
	let res;
	try {
		res = await axios.get(`${config.api}&page=${1}`);
	} catch (err) {
		console.error(err);
	}

	return {
		props: {
			results: res ? res.data.results : []
		}
	};
}
