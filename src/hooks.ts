import { initializeSession } from 'svelte-kit-cookie-session';
import type { GetContext, GetSession, Handle } from '@sveltejs/kit';

export const getContext: GetContext = async function ({ headers }) {
	const session = initializeSession(headers, {
		secret: 'SOME_SECRET_AT_LEAST_32_CHARACTERS_LONG',
		cookie: { path: '/' }
	});

	return {
		session
	};
};

export const getSession: GetSession = async function ({ context }) {
	return context.session.data;
};

export const handle: Handle = async function (request, render) {
	const response = await render(request);

	if (!response.headers) {
		return response;
	}

	return {
		...response,
		headers: {
			...response.headers,
			...request.context.session
		}
	};
};
