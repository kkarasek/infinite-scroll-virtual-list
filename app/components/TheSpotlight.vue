<script setup lang="ts">
import { useMouse } from '@vueuse/core';

const { x, y } = useMouse();
</script>

<template>
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
</template>
