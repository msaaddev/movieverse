const config = {
	name: `Movieverse`,
	shortName: `MV`,
	title: `Movieverse – Top 500 rated movies on TMDB`,
	description: `One place to find top rated movies on TMDB`,
	keywords: `movies, tmdb, top rated`,
	api: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_Key}&language=en-US`
};

export default config;
