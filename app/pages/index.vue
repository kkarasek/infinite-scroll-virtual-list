<!-- 
*** TODO ***
- extract fetchData()
- add proper error handling
- fix loadMore function
- fix hydration issue
- learn why onMount doesn't trigger fetch function correctly
- useFetch vs $fetch - why, when (use axios if applicable)
- vueUse docs
- add virtual scrolling
 -->

<script setup lang="ts">
import { useMouse, useInfiniteScroll, useVirtualList } from '@vueuse/core';
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

const { x, y } = useMouse();

const infiniteScrollRef = ref<HTMLElement | null>(null);

useInfiniteScroll(
	infiniteScrollRef,
	() => {
		console.log('scroll triggered 🔥');
		loadMore();
	},
	{ distance: 20 }
);

// const { list, containerProps, wrapperProps } = useVirtualList(colours.value, {
// 	itemHeight: 20,
// });

const fetchData = async () => {
	const { data } = await useFetch<ApiResponse>('/api/colours');
	console.log(data?.value?.data);
	colours.value = data?.value?.data as Colour[];
};

const loadMore = async () => {
	offset.value += limit;
	const res = await fetch(`/api/colours?offset=${offset.value}`);
	const data = await res.json();
	console.log('data loadMore(): ', data);
	colours.value = [...colours.value, ...data.data];
};

fetchData();
</script>

<template>
	<div
		class="h-screen w-screen bg-[#08090a] p-8 text-white relative overflow-hidden"
	>
		<TheSpotlight :x="x" :y="y" />
		<div class="w-56">
			<h1 class="text-x font-bold">Hi Infinite Scroll 👋</h1>
			<!-- <div
				ref="infiniteScrollRef"
				:containerProps
				class="mt-12 h-[480px] overflow-y-auto"
			>
				<div :wrapperProps>
					<div v-for="colour in list" :key="colour.data.id">
						{{ colour.data.name }}
					</div>
				</div>
			</div> -->
			<div ref="infiniteScrollRef" class="mt-12 h-[480px] overflow-y-auto">
				<ul>
					<li v-for="colour in colours" :key="colour.id">
						{{ colour.name }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
