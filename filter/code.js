	var resultBinary = '000000';
	var resultDec = 0;
	var referrer;
	var subdomain;
	var mask;
	var newMask;
	var request;
	var requestCat;
	var requestFunc;

// Thanks Tom Yandell
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function calcMask() {
		referrer = $('#ref').val();
		console.log("Referrer: " + referrer);

		subdomain = referrer.split('.')[0].replace('http://', '').replace('https://', '');
		console.log("Subdomain: " + subdomain);

		mask = subdomain.split('-')[1];
		console.log("Mask: " + mask);


		request = $('#request').val().split('#')[1];
		console.log("Request: " + request);

		requestCat = request.split('=')[1];
		console.log("Request Cat: " + requestCat);
		
		requestFunc = request.split('=')[0];
		console.log("Request Function: " + requestFunc);

		switch (requestCat) {
			case "a":
			request = 32;
			break;
			case "b":
			request = 16;
			break;
			case "c":
			request = 08;
			break;
			case "d":
			request = 04;
			break;
			case "e":
			request = 02;
			break;
			case "f":
			request = 01;
			break;
		}
		
		console.log('Request Amount: ' + request);

		if (isNaN(mask)) {
		mask = 63; // All True
		console.log('Mask is NOT a number. Setting to: ' + mask);
	} else {
		console.log('Mask is a number: ' + mask);
	}
	switch (requestFunc) {
		case "h":
		newMask = +mask - request;
		console.log('New Mask IS: ' + mask + ' - ' + request + ' = ' + newMask);
		break;
		case "s":
		newMask = +mask + request;
		console.log('New Mask IS: ' + mask + ' + ' + request + ' = ' + newMask);
		break;
	};

	newMask = pad(newMask, 2);


	
};
$(document).ready(function() { 


	$('input[type="checkbox"]').change(function() {
		resultBinary = '';
		$('input[type="checkbox"]').each(function() {
			if (this.checked) {
				resultBinary = resultBinary + '1';
			} else {
				resultBinary = resultBinary + '0';
			}
		})
		$('#binary').val(resultBinary);
		resultDec = parseInt(resultBinary, 2);
		if (resultDec == 63) {
			$('#mask').val('');
		} else {
			$('#mask').val(resultDec + ".");
		}
	});


	// Grab the Referrer
	$('#ref').val(document.referrer);

	//Grab the Request
	$('#request').val(location.hash);

	calcMask();

	if (newMask == '00' || newMask == 0 || newMask == 63) {
		window.location.replace('https://reddit.com/r/Overwatch');
	}
	else { 	window.location.replace('https://ow-'+newMask+'.reddit.com/r/Overwatch'); }
});