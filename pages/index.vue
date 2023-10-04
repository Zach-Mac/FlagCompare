<script setup lang="ts">
const states = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
const countries = ref([] as string[])

// const getImage = (code: string) => `@/assets/flags/png250px/${code}.png`

const imgWidth = ref(250)

function zoomOut() {
	imgWidth.value = imgWidth.value - 100 || 0
}
function zoomIn() {
	imgWidth.value = imgWidth.value + 100 || 100
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
					<v-card
						v-for="code in countries"
						:elevation="5"
						class="d-flex flex-column"
						:rounded="0"
						hover
					>
						<v-img
							:width="imgWidth"
							:src="`/flags/png1000px/${code.toLowerCase()}.png`"
							:alt="code"
						/>
						<p class="align-self-center">{{ code }}</p>
					</v-card>
				</div>
			</v-col>
		</v-row>
		<v-row>
			<v-col :cols="4">
				<v-card :elevation="2" class="float-bottom">
					<v-slider
						class="mt-4 mb-0 mp-0"
						v-model="imgWidth"
						:min="10"
						:max="1000"
						append-icon="mdi-magnify-plus-outline"
						prepend-icon="mdi-magnify-minus-outline"
						@click:append="zoomIn"
						@click:prepend="zoomOut"
					></v-slider>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<style>
.float-bottom {
	position: fixed;
	max-width: 95%; /* Limits the maximum width to the viewport width */
	width: 700px; /* Allows the element to shrink to its content width */
	left: 50%; /* Center horizontally */
	transform: translateX(-50%); /* Center horizontally */
	bottom: 30px;
}
</style>
