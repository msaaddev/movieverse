// stylesheet
import css from 'styles/footer.module.css';

const Footer = () => {
	return (
		<div className={css.container}>
			<div className={css.msg}>
				<p>
					This product uses TMDB API but is not endorsed or certified
					by TMDB.
				</p>
			</div>
		</div>
	);
};

export default Footer;
