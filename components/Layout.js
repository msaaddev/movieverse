import SEO from './SEO';
import Hero from './Hero';
import Footer from './Footer';

const Layout = ({ children }) => {
	return (
		<>
			<SEO />
			<Hero />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
