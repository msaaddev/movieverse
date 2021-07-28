import { useState } from 'react';
import Image from 'next/image';
import css from '../styles/index.module.css';

export default function Home() {
	const url = `https://i.pinimg.com/originals/bc/d5/c9/bcd5c9519581acc60bd60a429ab0c88f.jpg`;

	const [starred, setStarred] = useState(false);

	/**
	 *
	 *
	 * star the movie
	 */
	const handleStarred = () => {
		starred ? setStarred(false) : setStarred(true);
	};

	return (
		<div className={css.container}>
			<div className={css.sub_container}>
				<div className={css.heading}>
					<h2>Top 500 Highest Rated Movies</h2>
				</div>
				<div className={css.movies}>
					<div className={css.movie_details_wrapper}>
						<div className={css.poster}>
							<Image
								src={url}
								alt="the hill"
								width={230}
								height={298}
								loading="eager"
							/>
						</div>
						<div className={css.movie_info}>
							<h3>TITLE: The Hill</h3>
							<p>RATING: 9.3</p>
							<p>YEAR: 2021</p>
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
			</div>
		</div>
	);
}
