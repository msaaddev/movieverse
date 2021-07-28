// packages
import Head from 'next/head';

// utils
import config from '../utils/config';

const SEO = () => {
	return (
		<Head>
			<title>{config.title}</title>
			<meta charSet="utf-8" />
			<meta name="theme-color" content="#ffffff" />
			<link rel="icon" href="/favicon.ico" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<meta name="description" content={config.description} />
			<meta name="keywords" content={config.keywords} />
			<meta property="og:locale" content="en_US" />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={config.title} />
			<meta property="og:description" content={config.description} />
		</Head>
	);
};

export default SEO;
