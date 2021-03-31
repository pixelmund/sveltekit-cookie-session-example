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

//@ts-expect-error This is actually valid, because Set-Cookie can take an array of cookies.
export const handle: Handle = async function (request, render) {
	const response = await render(request);

	if (!response?.headers) {
		return response;
	}

	let cookies: string[] = [];

	const sessionCookie = request.context.session?.['set-cookie'];
	const responseCookie = response.headers?.['set-cookie'];

	const hasSessionCookie = sessionCookie && sessionCookie.length > 0;
	const hasResponseCookie = responseCookie && responseCookie.length > 0;

	if (hasSessionCookie && hasResponseCookie) {
		let responseCookies = [];

		if (Array.isArray(responseCookie)) {
			responseCookies = [...responseCookie];
		} else {
			responseCookies = [responseCookie];
		}

		cookies = [sessionCookie, ...responseCookies];
	} else if (!hasSessionCookie && hasResponseCookie) {
		cookies = [responseCookie];
	} else {
		cookies = [sessionCookie];
	}

	if (response.headers['content-type'] === 'text/html') {
		return {
			...response,
			headers: {
				...response.headers,
				'Set-Cookie': cookies
			}
		};
	}

	return {
		...response,
		headers: {
			...response.headers,
			'Set-Cookie': cookies
		}
	};
};
