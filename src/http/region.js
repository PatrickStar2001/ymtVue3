import request from "./axios";

export function getList(data) {
	return request({
		url: `/api/region/pid?pid=${data}`,
		method: 'get',
	});
}
