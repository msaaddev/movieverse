import { createContext, useState } from 'react';

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
	// states
	const [movies, setMovies] = useState();
	const [starArr, setStarArr] = useState([]);
	const [descPage, setDescPage] = useState(2);
	const [ascPage, setAscPage] = useState(25);
	const [hasMore, setHasMore] = useState(true);
	const [sortBy, setSortBy] = useState('desc');
	const [err, setErr] = useState(false);

	return (
		<MovieContext.Provider
			value={{
				movies,
				setMovies,
				starArr,
				setStarArr,
				descPage,
				setDescPage,
				ascPage,
				setAscPage,
				hasMore,
				setHasMore,
				sortBy,
				setSortBy,
				err,
				setErr
			}}
		>
			{children}
		</MovieContext.Provider>
	);
};

export { MovieContext, MovieProvider };
