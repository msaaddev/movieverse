// packages
import Image from 'next/image';
import config from 'utils/config';

// stylesheet
import css from 'styles/hero.module.css';

const Hero = () => {
	return (
		<div className={css.container}>
			<div className={css.sub_container}>
				<h1>{config.name}</h1>
				<p>Built on top of TMDB API</p>
				<Image
					src="/tmdb-logo.png"
					alt="tmdb logo"
					width={250}
					height={20}
					loading="eager"
				/>
			</div>
		</div>
	);
};

export default Hero;
