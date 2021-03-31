import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = function ({ context, body }) {
	context.session.data = body;

	return {
		status: 200,
		body: context.session.data
	};
};

export const put: RequestHandler = function ({ context, body }) {
	context.session.data = body;
	context.session.refresh = true;

	return {
		status: 200,
		body: context.session.data
	};
};

export const del: RequestHandler = function ({ context }) {
	context.session.destroy = true;

	return {
		status: 200,
		body: {
			ok: true
		}
	};
};
