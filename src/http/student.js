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
		url: '/api/student/all',
		method: 'get',
	});
}

export function getOne(data){
	return request({
		url: `/api/student/one?id=${data}`,
		method: 'get',
	});
}

export function delOne(data){
	return request({
		url: `/api/student/delete?id=${data}`,
		method: 'get'
	});
}

export function addOne(data){
	return request({
		url: '/api/student/add',
		method: 'post',
		data
	});
}

export function updateOne(data){
	return request({
		url: '/api/student/edit',
		method: 'post',
		data
	});
}

