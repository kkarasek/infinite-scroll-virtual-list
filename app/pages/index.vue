<!-- 
*** TODO ***
- extract types correctly
- fix hydration issue
- useFetch vs $fetch - why, when (use axios if applicable)
- add virtual scrolling
 -->

<script setup lang="ts">
import { useInfiniteScroll, useDebounceFn, useVirtualList } from '@vueuse/core';
interface Colour {
	id: number;
	name: string;
	hex: string;
}

interface ApiResponse {
	data: Colour[];
}

const limit = 20;
const offset = ref(0);
const colours = ref<Colour[]>([]);
const isLoading = ref(false);
const hasMore = ref(true);

const scrollListRef = ref<HTMLElement | null>(null);

useInfiniteScroll(
	scrollListRef,
	() => {
		console.log('Load more triggered 🔥');
		fetchData();
	},
	{
		distance: 10,
	}
);

const fetchData = async (isInitialLoad = false) => {
	if (isLoading.value || !hasMore.value) {
		return;
	}
	isLoading.value = true;

	try {
		const data: ApiResponse = await $fetch('/api/colours', {
			params: { limit, offset: offset.value },
		});

		if (data.data.length < limit) {
			hasMore.value = false;
		}

		colours.value = isInitialLoad
			? data.data
			: [...colours.value, ...data.data];

		offset.value += limit;
	} catch (err) {
		console.error('An error occured', err);
	}
	isLoading.value = false;
};

onMounted(() => {
	fetchData(true);
});
</script>

<template>
	<div
		class="h-screen w-screen bg-[#08090a] p-8 text-white relative overflow-hidden"
	>
		<TheSpotlight />
		<div class="w-56">
			<h1 class="text-x font-bold">Hi Infinite Scroll 👋</h1>
			<div class="mt-12 h-[480px] overflow-y-auto" ref="scrollListRef">
				<div v-for="colour in colours" :key="colour.id">
					{{ colour.name }}
				</div>
				<div v-if="isLoading">Loading...</div>
			</div>
		</div>
	</div>
</template>
