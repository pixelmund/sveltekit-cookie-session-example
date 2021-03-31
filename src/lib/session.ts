import { session as sessionStore } from '$app/stores';
import type { Writable } from 'svelte/store';

type Options = {
	optimistic?: boolean;
};

let updating: boolean = false;
let prevSession: any = {};

export function initializeSession(sess: Writable<any>) {
	sess.subscribe((val: any) => {
		if (!updating) {
			prevSession = val;
		}
	});
}

async function handleSession(method: 'POST' | 'PUT' | 'DELETE', value: any, opts: Options) {
	updating = true;
	if (opts.optimistic) {
		sessionStore.set(value);
	}
	const response = await fetch('/--session--', {
		method,
		body: method !== 'DELETE' ? JSON.stringify(value) : undefined,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		cache: 'no-cache'
	});
	if (!response.ok) {
		if (opts.optimistic) {
			sessionStore.set(prevSession);
		}
		updating = false;
		return;
	}
	const data = await response.json();
	updating = false;
	sessionStore.set(method === 'DELETE' ? {} : data);
}

export const session = {
	set: (value: any, opts: Options = { optimistic: false }) => {
		handleSession('POST', value, opts);
	},
	refresh: (value: any, opts: Options = { optimistic: false }) => {
		handleSession('PUT', value, opts);
	},
	destroy: (opts: Options = { optimistic: false }) => {
		handleSession('DELETE', null, opts);
	},
	subscribe: sessionStore.subscribe
} as const;
