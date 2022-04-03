const today = new Date();
const currentDatetime =
	today.getFullYear() +
	'-' +
	((today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1) +
	'-' +
	(today.getDate() < 10 ? '0' + today.getDate() : today.getDate()) +
	' ' +
	today.getHours() +
	':' +
	today.getMinutes() +
	':' +
	today.getSeconds();
const currentTime = currentDatetime;
module.exports  = currentTime;
