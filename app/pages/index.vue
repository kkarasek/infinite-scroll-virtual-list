<!-- 
*** TODO ***
- extract types correctly
- fix hydration issue
- useFetch vs $fetch - why, when (use axios if applicable)
 -->

<script setup lang="ts">
import { useInfiniteScroll, useVirtualList } from '@vueuse/core';
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

const demoArray = ref(Array.from(Array(50).keys(), () => 'Lorem ipsum'));

const firstItemRef = ref<HTMLElement | null>(null);

const { list, containerProps, wrapperProps } = useVirtualList(colours, {
	itemHeight: 20,
});

useInfiniteScroll(
	containerProps.ref,
	() => {
		console.log('Load more triggered 🔥');
		fetchData();
	},
	{
		distance: 20,
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

		console.log('data', data.data);

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
			<div v-bind="containerProps" class="mt-12 h-[480px] overflow-y-auto">
				<div v-bind="wrapperProps">
					<div v-for="{ data } in list" :key="data.id">
						{{ data.name }}
					</div>
					<div v-if="isLoading" class="pt-2">Loading...</div>
				</div>
			</div>
		</div>
	</div>
</template>
