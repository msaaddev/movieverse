// package
import ContentLoader from 'react-content-loader';

// stylesheet
import css from '../../styles/loader.module.css';

const Loader = () => (
	<div className={css.container}>
		<ContentLoader speed={2} width={260} height={300} viewBox="0 0 260 300">
			<rect x="0" y="20" rx="2" ry="2" width="260" height="300" />
		</ContentLoader>
	</div>
);

export default Loader;
