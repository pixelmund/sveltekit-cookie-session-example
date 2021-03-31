<script lang="ts">
	import '../app.css';
	import { session } from '$app/stores';
	import { initializeSession } from '$lib/session';

	initializeSession(session);
</script>

<slot />
