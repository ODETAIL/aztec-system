export const queryWithParams = (url, method = "GET", params) => ({
	url,
	method,
	params,
});

export const mutationWithBody = (url, method = "POST", body) => ({
	url,
	method,
	body,
});
