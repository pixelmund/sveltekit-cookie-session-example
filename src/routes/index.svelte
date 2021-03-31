<script lang="ts">
	import { session } from '$lib/session';

	let username = $session.username;
	async function setSession() {
		try {
			session.set({ username });
		} catch (error) {
			console.log(error);
		}
	}
	async function refreshSession() {
		try {
			session.refresh({ username }, { optimistic: true });
		} catch (error) {
			console.log(error);
		}
	}
	async function destroySession() {
		try {
			session.destroy();
		} catch (error) {
			console.log(error);
		}
	}
</script>

<main>
	<h1>Svelte Kit Session Example</h1>
	<p>Click on the Set Session Button to Set the session</p>

	<h3>Session:</h3>
	<div>
		<button on:click={destroySession}>Destroy Session</button>
		<button on:click={refreshSession}>Refresh Session</button>
	</div>
	<pre>
		{JSON.stringify($session)}
	</pre>

	<div>
		<div>
			<label for="username">Username</label>
			<input id="username" name="username" type="text" bind:value={username} />
		</div>
		<button on:click={setSession}>Set Session</button>
	</div>
</main>
