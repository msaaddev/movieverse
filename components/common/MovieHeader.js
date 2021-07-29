// stylesheet
import css from 'styles/movieheader.module.css';

const MovieHeader = ({ handleSort }) => {
	return (
		<div className={css.header}>
			<h2>Top 500 Highest Rated Movies</h2>
			<select onChange={(e) => handleSort(e.target.value)}>
				<option value="desc">Descending</option>
				<option value="asc">Ascending</option>
			</select>
		</div>
	);
};

export default MovieHeader;
