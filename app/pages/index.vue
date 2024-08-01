<script setup lang="ts">
import { useMouse } from '@vueuse/core';

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

const fetchData = async () => {
	const { data } = await useFetch<ApiResponse>('/api/colours');
	console.log(data?.value?.data);
	colours.value = data?.value?.data as Colour[];
};

fetchData();
</script>

<template>
	<div
		class="h-screen w-screen bg-[#08090a] p-8 text-white relative overflow-hidden"
	>
		<div
			class="inset-0 blur-3xl z-30 hidden lg:block absolute pointer-events-none"
			:style="{
				background: `radial-gradient(
          400px at ${x}px ${y}px,
          rgba(0, 255, 0, 0.3),
          transparent 60%
        )`,
			}"
		/>
		<h1 class="text-x font-bold">Hi Infinite Scroll 👋</h1>
		<div class="mt-12">
			<ul>
				<li v-for="colour in colours" :key="colour.id">{{ colour.name }}</li>
			</ul>
		</div>
	</div>
</template>
