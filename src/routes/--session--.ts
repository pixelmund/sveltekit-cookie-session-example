/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler<any, Record<string, any>> = function ({ body, context }) {
	if (body?.expires) {
		throw new Error('Cannot set expiration date from payload');
	}

	context.session.data = body;

	return {
		status: 200,
		body: context.session.data
	};
};

export const put: RequestHandler<any, Record<string, any>> = function ({ body, context }) {
	if (body?.expires) {
		throw new Error('Cannot set expiration date from payload');
	}
	if (body) {
		context.session.data = body;
	}

	context.session.refresh = true;

	return {
		status: 200,
		body: context.session.data
	};
};

export const del: RequestHandler<any, Record<string, any>> = function ({ context }) {
	context.session.destroy = true;

	return {
		status: 200,
		body: {
			ok: true
		}
	};
};
