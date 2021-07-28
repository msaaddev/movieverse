import Image from 'next/image';
import css from '../../styles/star.module.css';

const Star = ({ starred, handleStarred }) => {
	return (
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
	);
};

export default Star;
