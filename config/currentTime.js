const today = new Date();
const currentTime =
	today.getFullYear() +
	'-' +
	(today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1) +
	'-' +
	(today.getDate() < 10 ? '0' + today.getDate() : today.getDate());

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
