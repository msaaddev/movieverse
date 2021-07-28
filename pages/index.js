import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../utils/config';
import Movie from '../components/common/Movie';
import css from '../styles/index.module.css';

export default function Home() {
	// states
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		(async () => {
			await getMovies(1);
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
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={css.container}>
			<div className={css.sub_container}>
				<div className={css.heading}>
					<h2>Top 500 Highest Rated Movies</h2>
				</div>
				{movies.length > 0 ? (
					movies.map((movie) => {
						return (
							<Movie
								key={movie.id}
								poster={movie.poster_path}
								title={movie.title}
								rating={movie.vote_average}
								year={movie.release_date}
								id={movie.id}
							/>
						);
					})
				) : (
					<h2>Loading...</h2>
				)}
			</div>
		</div>
	);
}
