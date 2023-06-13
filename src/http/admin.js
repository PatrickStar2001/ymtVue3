import request from "./axios";

export function login(data){
	return request({
		url: 'api/mobile/elogin',
		method: 'post',
		data
	});
}

export function getAll(){
	return request({
		url: '/api/admin/all',
		method: 'get',
	});
}

export function getOne(data){
	return request({
		url: `/api/admin/one?id=${data}`,
		method: 'get',
	});
}

export function delOne(data){
	return request({
		url: `/api/admin/delete?id=${data}`,
		method: 'get'
	});
}

export function addOne(data){
	return request({
		url: '/api/admin/add',
		method: 'post',
		data
	});
}

export function updateOne(data){
	return request({
		url: '/api/admin/edit',
		method: 'post',
		data
	});
}

