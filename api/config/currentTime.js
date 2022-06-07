const today = new Date();
const currentTime =
	today.getFullYear() +
	'-' +
	(today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1) +
	'-' +
	(today.getDate() < 10 ? '0' + today.getDate() : today.getDate()) +
	' ' +
	(today.getHours() < 10 ? '0' + today.getHours() : today.getHours()) +
	':' +
	(today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) +
	':' +
	(today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds());

const monthNames = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

const currenTimePrefixMonth =
	monthNames[today.getMonth() + 1] +
	' ' +
	(today.getDate() < 10 ? '0' + today.getDate() : today.getDate()) +
	' ' +
	today.getFullYear();

exports.currentTime = currentTime;
exports.currentTimePrefixMonth = currenTimePrefixMonth;
