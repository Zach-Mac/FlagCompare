// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@invictus.codes/nuxt-vuetify'],
	ssr: false,
	devtools: {
		enabled: true,
		timeline: {
			enabled: true
		}
	}
})
