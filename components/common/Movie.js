import { useState, useRef } from 'react';
import Image from 'next/image';
import css from '../../styles/movie.module.css';

const Movie = ({ poster, title, rating, year, id }) => {
	// states
	const [starred, setStarred] = useState(false);

	// DOM references
	const movieRef = useRef();
	const movieDetailsRef = useRef();

	/**
	 *
	 *
	 * star the movie
	 */
	const handleStarred = () => {
		if (starred) {
			setStarred(false);
			movieRef.current.style.backgroundColor = `#1f1f1f`;
			movieDetailsRef.current.style.color = `#ffffff`;
		} else {
			setStarred(true);
			movieRef.current.style.backgroundColor = `#ffffff`;
			movieDetailsRef.current.style.color = `#1f1f1f`;
		}
	};

	return (
		<div className={css.movies} id={id} ref={movieRef}>
			<div className={css.movie_details_wrapper}>
				<div className={css.poster}>
					<Image
						src={`https://www.themoviedb.org/t/p/w1280${poster}`}
						alt={title}
						width={230}
						height={298}
						loading="eager"
					/>
				</div>
				<div className={css.movie_info} ref={movieDetailsRef}>
					<p>TITLE: {`${title}`}</p>
					<p>RATING: {`${rating}`}</p>
					<p>YEAR: {`${year.slice(0, 4)}`}</p>
				</div>
			</div>
			<div className={css.star}>
				{!starred ? (
					<Image
						src="/star.png"
						alt="star"
						width={32}
						height={32}
						onClick={handleStarred}
					/>
				) : (
					<Image
						src="/starred.png"
						onClick={handleStarred}
						alt="starred"
						width={32}
						height={32}
					/>
				)}
			</div>
		</div>
	);
};

export default Movie;
