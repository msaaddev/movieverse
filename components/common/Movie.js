// packages
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// components
import Star from 'components/common/Star';

// stylesheet
import css from 'styles/movie.module.css';

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
	 * @param {crud} - perform data operations if set to true
	 */
	const handleStarred = (crud = true) => {
		let starredArr;
		crud
			? (starredArr = JSON.parse(localStorage.getItem('starredArr')))
			: [];

		// change background color and text color and perform data operations
		if (starred) {
			setStarred(false);
			movieRef.current.style.backgroundColor = `#1f1f1f`;
			movieDetailsRef.current.style.color = `#ffffff`;

			// remove the id from the starred array list
			if (crud) {
				const index = starredArr.indexOf(id);
				starredArr.splice(index, 1);
			}
		} else {
			setStarred(true);
			movieRef.current.style.backgroundColor = `#ffffff`;
			movieDetailsRef.current.style.color = `#1f1f1f`;

			// add id to starred array
			crud && starredArr.push(id);
		}

		crud && localStorage.setItem('starredArr', JSON.stringify(starredArr));
	};

	return (
		<div className={css.movies} id={id} ref={movieRef}>
			<a
				href={`https://www.themoviedb.org/movie/${id}`}
				target="_blank"
				rel="noreferrer"
			>
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
			</a>
			<Star starred={starred} handleStarred={handleStarred} />
		</div>
	);
};

export default Movie;
