<script setup lang="ts">
const states = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
const countries = ref([] as string[])

// const getImage = (code: string) => `@/assets/flags/png250px/${code}.png`

const imgWidth = ref(250)

function zoomOut() {
	imgWidth.value = imgWidth.value - 10 || 0
}
function zoomIn() {
	imgWidth.value = imgWidth.value + 10 || 100
}
</script>

<template>
	<v-container class="h-screen">
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
				<div class="d-flex flex-wrap">
					<v-card v-for="code in countries" :elevation="5" class="d-flex flex-column">
						<v-img
							:width="imgWidth"
							:src="`/flags/png250px/${code.toLowerCase()}.png`"
							:alt="code"
						/>
						<p class="align-self-center">{{ code }}</p>
					</v-card>
				</div>
			</v-col>
		</v-row>
		<v-card :elevation="2" class="float-bottom">
			<v-slider
				v-model="imgWidth"
				:min="10"
				:max="1000"
				append-icon="mdi-magnify-plus-outline"
				prepend-icon="mdi-magnify-minus-outline"
				@click:append="zoomIn"
				@click:prepend="zoomOut"
			></v-slider>
		</v-card>
	</v-container>
</template>

<style>
.float-bottom {
	position: fixed;
	width: 95%;
	bottom: 30px;
}
</style>
