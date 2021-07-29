// components
import SEO from 'components/SEO';
import Hero from 'components/Hero';
import Footer from 'components/Footer';

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
