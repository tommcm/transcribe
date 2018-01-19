let fs = require('fs');
// let transcript = JSON.parse(fs.readFileSync('demo-job-16.json'));
let transcript = JSON.parse(fs.readFileSync('demo-job-21.json'));

let result = '';
let previousTime = 0;
transcript.results.items.forEach(item => {

	if (item.type == 'punctuation') {

		result = result.slice(0, -1);
	}

	// add a break if there's obviously a pause
	if ((item.start_time) && ((item.start_time - previousTime) > 0.9)) {

		result += '\n<br>';
	}
	if (item.end_time) {

		previousTime = item.end_time;
	}

	let confidence = (item.alternatives[0].confidence ? item.alternatives[0].confidence : 1);
	let textColor = '#ccc';
	if (confidence > 0.5)
		textColor = '#aaa';
	if (confidence > 0.6)
		textColor = '#999';
	if (confidence > 0.7)
		textColor = '#666';
	if (confidence > 0.8)
		textColor = '#333';

	if (confidence > 0.9) {

		result += `${item.alternatives[0].content} `;
	} else {

		result += `<span style="color: ${textColor}">${item.alternatives[0].content}</span> `;
	}
});
console.log('<html><head><style type="text/css"> span.c8 { color: #333 } </style></head><body>');
console.log(result);
console.log('</body></html>');
