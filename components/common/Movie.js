// packages
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// stylesheet
import css from '../../styles/movie.module.css';

const Movie = ({ poster, title, rating, year, id, isStar }) => {
	// states
	const [starred, setStarred] = useState(false);

	// DOM references
	const movieRef = useRef();
	const movieDetailsRef = useRef();

	useEffect(() => {
		// star the movies if they were previously starred
		if (isStar) {
			handleStarred(false);
		}
	}, [isStar]);

	/**
	 *
	 *
	 * star the movie and keep the state persistant if needed
	 * @param {performOp} - perform data operations if set to true
	 */
	const handleStarred = (performOp = true) => {
		let starredArr;
		performOp
			? (starredArr = JSON.parse(localStorage.getItem('starredArr')))
			: [];

		// change background color and text color and perform data operations
		if (starred) {
			setStarred(false);
			movieRef.current.style.backgroundColor = `#1f1f1f`;
			movieDetailsRef.current.style.color = `#ffffff`;

			// remove the id from the starred array list
			if (performOp) {
				const index = starredArr.indexOf(id);
				starredArr.splice(index, 1);
			}
		} else {
			setStarred(true);
			movieRef.current.style.backgroundColor = `#ffffff`;
			movieDetailsRef.current.style.color = `#1f1f1f`;

			// add id to starred array
			performOp && starredArr.push(id);
		}

		performOp &&
			localStorage.setItem('starredArr', JSON.stringify(starredArr));
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
						loading="eager"
						onClick={handleStarred}
					/>
				) : (
					<Image
						src="/starred.png"
						alt="starred"
						width={32}
						height={32}
						loading="eager"
						onClick={handleStarred}
					/>
				)}
			</div>
		</div>
	);
};

export default Movie;
