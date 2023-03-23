// module.exports = function (content) {
// 	console.log("03" + content);
// 	return content + 'aaaa';
// };

// module.exports = function (content) {
// 	setTimeout(() => {
// 		console.log("03" + content);
// 		return content + "aaaa";
// 	}, 10000);
// };

module.exports = function (content) {
	const callback = this.async();

	setTimeout(() => {
		console.log("03" + content);
		callback(null, content + "aaaa");
	}, 10000);
};

