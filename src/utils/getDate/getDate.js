export const getDate = () =>{
	var now = new Date()
	var year = now.getFullYear()
	var month = now.getMonth() + 1
	var day = now.getDate()
	return (year + '-' + month + '-' + day);
}