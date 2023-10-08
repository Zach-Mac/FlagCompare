// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@invictus.codes/nuxt-vuetify', '@vueuse/nuxt', '@formkit/auto-animate'],
	ssr: false,
	devtools: {
		enabled: true,
		timeline: {
			enabled: true
		}
	}
})
