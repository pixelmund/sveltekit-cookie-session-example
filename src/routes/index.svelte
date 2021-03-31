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
			session.refresh({ username });
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

<main
	class="flex bg-gray-100 flex-col items-center justify-center min-h-screen w-full overflow-y-auto"
>
	<div class="max-w-4xl p-8 bg-white rounded-lg">
		<h1 class="text-4xl text-gray-800 text-center font-semibold">Svelte Kit Session Example</h1>
		<p class="text-center text-gray-400 font-light mt-2">
			Click on the Set Session Button to Set the session
		</p>

		<div class="flex justify-between items-center py-5 mt-6">
			<button
				class="py-2 px-5 bg-red-500 text-white font-semibold text-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-400"
				on:click={destroySession}>Destroy Session</button
			>
			<button
				class="py-2 px-5 bg-indigo-500 text-white font-semibold text-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
				on:click={refreshSession}>Refresh Session</button
			>
		</div>

		<pre
			class="bg-gray-700 text-gray-400 py-4 px-3">
			{JSON.stringify($session, null, 2)}
		</pre>

		<div>
			<div class="mb-4 mt-5">
				<label class="text-gray-500 text-sm block" for="username">Username</label>
				<input
					class="py-2 px-3 w-full border-gray-300 border rounded-md mt-1.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
					id="username"
					name="username"
					type="text"
					bind:value={username}
				/>
			</div>
			<button
				class="py-2 px-5 w-full bg-purple-500 text-white font-semibold text-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-400"
				on:click={setSession}>Set Session</button
			>
		</div>
	</div>
</main>
