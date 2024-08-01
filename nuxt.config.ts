// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	future: {
		compatibilityVersion: 4,
	},
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	app: {
		head: {
			title: 'Infinite Scroll',
		},
	},
});
