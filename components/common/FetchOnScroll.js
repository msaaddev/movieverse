// packages
import { useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// components
import Movie from 'components/common/Movie';
import Loader from 'components/common/Loader';

// context
import { MovieContext } from 'components/context/MovieContext';

const FetchOnScroll = ({ next }) => {
	// contexts
	const { movies, starArr, descPage, ascPage, hasMore, sortBy } =
		useContext(MovieContext);

	/**
	 *
	 *
	 * maps out all the movies on the screen
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
		<InfiniteScroll
			dataLength={movies.length}
			next={() => {
				sortBy === 'desc' ? next(descPage) : next(ascPage, 'asc');
			}}
			hasMore={hasMore}
			loader={<Loader />}
		>
			{renderMovies()}
		</InfiniteScroll>
	);
};

export default FetchOnScroll;
