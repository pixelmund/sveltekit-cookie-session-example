<script lang="ts">
	import '../app.css';
	import '$lib/session';
	import { getStores } from '$app/stores';
	import { initializeSession } from '$lib/session';
	import { onMount } from 'svelte';

	const { session } = getStores();

	onMount(() => {
		initializeSession(session);
	});
</script>

<slot />
