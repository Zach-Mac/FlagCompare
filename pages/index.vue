<script setup lang="ts">
import { VImg } from 'vuetify/lib/components/index.mjs'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import draggable from 'vuedraggable'

interface Country {
	code: string
	name: string
}

const params = useUrlSearchParams('history')

const selectedCountries = ref([] as Country[])
// const selectedCountries = ref([] as string[])
if (params?.countries && typeof params.countries == 'string') {
	const codes = params.countries.split('-')

	selectedCountries.value = codes.map((code, index) => ({
		code,
		name: codeToName[code]
	}))
}
watch(selectedCountries, value => {
	// params.countries = value.join('-')
	params.countries = value.map(obj => obj.code).join('-')
})

const imgHeight = ref(250)

function zoomOut() {
	imgHeight.value = imgHeight.value - 100 || 0
}
function zoomIn() {
	imgHeight.value = imgHeight.value + 100 || 100
}

const img = ref<VImg[]>([])

function getWidth(index: number) {
	// w = nw/nh * h
	const natWidth = img.value[index]?.naturalWidth ?? 1
	const natHeight = img.value[index]?.naturalHeight ?? 1
	const height = img.value[index]?.height ?? 1

	const width = (natWidth / natHeight) * Number(height)
	return width
}

const dragOptions = computed(() => ({
	animation: 100,
	group: 'group',
	disabled: false,
	ghostClass: 'ghost',
	sort: true
}))

const reorderMode = ref(false)
</script>

<template>
	<v-container class="h-screen">
		<v-row>
			<v-col>
				<v-autocomplete
					v-auto-animate
					v-model="selectedCountries"
					return-object
					auto-select-first
					clearable
					closable-chips
					chips
					multiple
					label="Countries"
					:items="countryListAllIsoData"
					item-title="name"
					item-value="code"
					variant="outlined"
				>
					<template #append>
						<v-btn
							@click="reorderMode = !reorderMode"
							:variant="reorderMode ? 'outlined' : 'elevated'"
							>Reorder</v-btn
						>
					</template>
				</v-autocomplete>

				<div class="d-flex flex-wrap">
					<v-card
						v-if="!reorderMode"
						v-for="(country, index) in selectedCountries"
						:elevation="5"
						class="d-flex flex-column ma-1"
						:rounded="0"
						hover
					>
						<v-img
							class="elevation-5"
							:ref="el => (img[index] = el)"
							:height="imgHeight"
							:width="getWidth(index)"
							:src="`/flags/png1000px/${country.code.toLowerCase()}.png`"
							:alt="country.name"
						/>
						<p class="align-self-center">{{ country.name }}</p>
					</v-card>

					<draggable
						v-else
						v-model="selectedCountries"
						item-key="code"
						v-bind="dragOptions"
					>
						<template #item="{ element }">
							<v-card
								:elevation="5"
								class="d-flex flex-column ma-1"
								:rounded="0"
								hover
							>
								<v-img
									class="elevation-5"
									:width="100"
									:src="`/flags/png100px/${element.code.toLowerCase()}.png`"
									:alt="element.name"
								/>
								<p class="align-self-center">{{ element.name }}</p>
							</v-card>
						</template>
					</draggable>
				</div>
			</v-col>
		</v-row>

		<v-card :elevation="2" class="float-bottom">
			<v-slider
				class="mt-4 mb-0 mp-0"
				v-model="imgHeight"
				:min="10"
				:max="500"
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
	max-width: 95%; /* Limits the maximum width to the viewport width */
	width: 700px; /* Allows the element to shrink to its content width */
	left: 50%; /* Center horizontally */
	transform: translateX(-50%); /* Center horizontally */
	bottom: 30px;
}
</style>
