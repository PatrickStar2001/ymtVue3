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
		url: '/api/teacher/all',
		method: 'get',
	});
}

export function getOne(data){
	return request({
		url: `/api/teacher/one?id=${data}`,
		method: 'get',
	});
}

export function delOne(data){
	return request({
		url: `/api/teacher/delete?id=${data}`,
		method: 'get'
	});
}

export function addOne(data){
	return request({
		url: '/api/teacher/add',
		method: 'post',
		data
	});
}

export function updateOne(data){
	return request({
		url: '/api/teacher/edit',
		method: 'post',
		data
	});
}

