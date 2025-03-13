<script setup lang="ts">
import 'flag-icons/css/flag-icons.min.css'
import { Analytics } from '@vercel/analytics/nuxt'

useHead({
	title: "Zach's Flags"
})
</script>

<template>
	<Analytics />
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
