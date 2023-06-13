import request from "./axios";

export function login(data) {
	return request({
		url: 'api/mobile/elogin',
		method: 'post',
		data
	});
}

export function getAll(data) {
	return request({
		url: '/api/patent/page',
		method: 'post',
		data
	});
}

export function getOne(data) {
	return request({
		url: `/api/patent/one?id=${data}`,
		method: 'get',
	});
}

export function delOne(data) {
	return request({
		url: `/api/patent/delete?id=${data}`,
		method: 'get'
	});
}

export function addOne(data) {
	return request({
		url: '/api/patent/add',
		method: 'post',
		data
	});
}

export function updateOne(data) {
	return request({
		url: '/api/patent/edit',
		method: 'post',
		data
	});
}

export function pat() {

}

