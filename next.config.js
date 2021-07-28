const withPWA = require('next-pwa');

module.exports = withPWA({
	images: {
		domains: ['i.pinimg.com']
	},
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true
	}
});
