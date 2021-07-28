const withPWA = require('next-pwa');

module.exports = withPWA({
	images: {
		domains: ['www.themoviedb.org']
	},
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true
	}
});
