<script setup lang="ts">
const states = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
const countries = ref([] as string[])

// const getImage = (code: string) => `@/assets/flags/png250px/${code}.png`
</script>

<template>
	<v-container>
		<v-row>
			<v-col>
				<v-autocomplete
					v-model="countries"
					auto-select-first
					clearable
					chips
					multiple
					label="Countries"
					:items="countryListAllIsoData"
					item-title="name"
					item-value="code"
					variant="outlined"
				></v-autocomplete>
				<hr />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				{{ countries }}
				<v-card>
					<template v-for="code in countries">
						<img :src="`/flags/png250px/${code.toLowerCase()}.png`" :alt="code" />
					</template>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
