<script lang="ts">
	import '../app.css';
	import { getStores } from '$app/stores';
	import { initializeSession } from '$lib/session';
	import { onMount } from 'svelte';

	const { session } = getStores();

	onMount(() => {
		const unsub = initializeSession(session);

		return () => {
			unsub();
		};
	});
</script>

<slot />
