import ContentLoader from 'react-content-loader';

const Loader = () => (
	<div style={{ marginBottom: 50 }}>
		<ContentLoader speed={2} width={300} height={300} viewBox="0 0 300 300">
			<rect x="0" y="20" rx="2" ry="2" width="300" height="300" />
		</ContentLoader>
	</div>
);

export default Loader;
