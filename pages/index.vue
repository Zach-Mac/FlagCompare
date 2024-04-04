<script setup lang="ts">
import { VImg } from 'vuetify/lib/components/index.mjs'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import draggable from 'vuedraggable'

interface Country {
	code: string
	name: string
}

function getCountries(countriesParam: string) {
	const codes = countriesParam.split('-')

	return codes.map((code, index) => ({
		code,
		name: codeToName[code]
	}))
}

const drawer = ref(false)

const { width: screenWidth } = useWindowSize()
const imgMaxHeight = computed(() => screenWidth.value / 1.5)
const imgMinHeight = 25

const params = useUrlSearchParams('history', { removeFalsyValues: true })

const selectedCountries = ref([] as Country[])
if (params?.countries && typeof params.countries == 'string') {
	selectedCountries.value = getCountries(params.countries)
}
watch(selectedCountries, value => {
	params.countries = value.map(obj => obj.code).join('-')
})

const imgHeight = ref(imgMaxHeight.value / 4)

function zoomOut() {
	imgHeight.value = imgHeight.value - imgMaxHeight.value / 10 || 0
}
function zoomIn() {
	imgHeight.value = imgHeight.value + imgMaxHeight.value / 10 || 100
}

const vImgRefs = ref<VImg[]>([])

function getHeight() {
	return imgHeight.value
}

function getWidth(index: number) {
	// w = nw/nh * h
	const natWidth = vImgRefs.value[index]?.naturalWidth ?? 1
	const natHeight = vImgRefs.value[index]?.naturalHeight ?? 1
	const height = Number(vImgRefs.value[index]?.height) ?? 1

	const width = (natWidth / natHeight) * height
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
	<v-layout>
		<v-app-bar rounded>
			<template v-slot:prepend>
				<v-app-bar-nav-icon
					@click.stop="drawer = !drawer"
					:active="drawer"
				></v-app-bar-nav-icon>
			</template>

			<v-app-bar-title>Zach's World Flags</v-app-bar-title>

			<!-- TODO: settings menu -->
			<!-- <template v-slot:append>
				<v-btn icon="mdi-dots-vertical"></v-btn>
			</template> -->
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" rounded :width="200">
			<v-list>
				<v-list-item @click="selectedCountries = []">Clear flags</v-list-item>
				<v-divider />
				<v-list-subheader>Similar flag groups</v-list-subheader>
				<v-list-item
					v-for="preset in SIMILAR_FLAGS_PRESETS"
					@click="selectedCountries = getCountries(preset.countryCodes)"
				>
					{{ preset.name }}</v-list-item
				>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<v-container fluid class="h-screen">
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
							hide-details
						>
						</v-autocomplete>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<div class="d-flex flex-wrap">
							<!-- normal mode -->
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
									:ref="el => (vImgRefs[index] = el)"
									:height="getHeight()"
									:width="getWidth(index)"
									:src="`/flags/png1000px/${country.code.toLowerCase()}.png`"
									:alt="country.name"
								/>
								<p class="align-self-center">{{ country.name }}</p>
							</v-card>

							<!-- reorder mode -->
							<draggable
								v-else
								v-model="selectedCountries"
								item-key="code"
								v-bind="dragOptions"
							>
								<template #item="{ element }">
									<v-card :elevation="5" class="ma-1" :rounded="0" hover>
										<v-row align="center">
											<v-col>
												<v-card :rounded="0">
													<v-img
														class="elevation-5"
														:width="100"
														:src="`/flags/png100px/${element.code.toLowerCase()}.png`"
														:alt="element.name"
													/>

													<p class="text-center">
														{{ element.name }}
													</p>
												</v-card>
											</v-col>
											<v-col cols="auto">
												<v-icon
													icon="mdi-reorder-horizontal"
													class="pr-4"
												></v-icon>
											</v-col>
										</v-row>
									</v-card>
								</template>
							</draggable>
						</div>
					</v-col>
				</v-row>

				<!-- toolbar -->
				<v-container class="float-bottom">
					<v-card :elevation="10" class="pa-2">
						<v-row align="center" justify="space-between">
							<v-col class="pa-1 pr-0">
								<v-slider
									:disabled="reorderMode"
									class="ma-2"
									v-model="imgHeight"
									:min="imgMinHeight"
									:max="imgMaxHeight"
									append-icon="mdi-magnify-plus-outline"
									prepend-icon="mdi-magnify-minus-outline"
									@click:append="zoomIn"
									@click:prepend="zoomOut"
									hide-details
								></v-slider>
							</v-col>
							<v-col cols="auto" class="pa-1 pl-0">
								<v-tooltip text="Reorder" location="top">
									<template v-slot:activator="{ props }">
										<v-btn
											density="comfortable"
											v-bind="props"
											class="ma-2"
											@click="reorderMode = !reorderMode"
											:variant="reorderMode ? 'tonal' : 'elevated'"
											icon="mdi-reorder-horizontal"
										>
										</v-btn>
										<!-- icon="mdi-arrow-split-horizontal" -->
									</template>
								</v-tooltip>
							</v-col>
						</v-row>
					</v-card>
				</v-container>
			</v-container>
		</v-main>
	</v-layout>
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
