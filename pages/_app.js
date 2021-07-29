import { MovieProvider } from 'components/context/MovieContext';
import Layout from 'components/Layout';
import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<MovieProvider>
				<Component {...pageProps} />
			</MovieProvider>
		</Layout>
	);
}

export default MyApp;
