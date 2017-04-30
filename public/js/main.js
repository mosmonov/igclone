// (function () {

	function GET(url) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('GET', url);
			request.onload = () => {
				const data = JSON.stringify(request.responseText)
				resolve(data)
			};
			request.onerror = (err) => {
				reject(err)
			};
			request.send();
		});
	} // GET
	function POST(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('POST', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.stringify(request.responseText)
				resolve(data)
			};
			request.onerror = (err) => {
				reject(err)
			};
			request.send(JSON.stringify(data));
		});
	} // POST

// if(templateName === 'post'){
// 	const addPost = document.querySelector('.js-add-post');
// 	  addPost.addEventListener('click', (e) => {
// 			const input = document.querySelector('.js-post-text').value;
// 			// input.setAttribute('disabled', 'disabled');
// 			console.log(input)
// 			POST('/post/create', {
// 				description: input.value,
// 				when: new Date().getTime() + 9 * 60 * 60 * 1000
// 			}).then((data) => {
// 				// input.removeAttribute('disabled');
// 				input.value = '';
// 				// render(data);
// 				console.log(data)
// 			});

// 		});
// }


// reactivate on switch to non html5 form based signup / login

	//
	// function POST(url, data) {
	// 	return new Promise((resolve, reject) => {
	// 		const request = new XMLHttpRequest();
	// 		request.open('POST', url);
	// 		request.setRequestHeader('Content-Type', 'application/json');
	//
	// 		request.onload = () => {
	// 			const data = JSON.parse(request.responseText);
	// 			resolve(data)
	// 		};
	// 		request.onerror = (err) => {
	// 			reject(err)
	// 		};
	// 		request.send(JSON.stringify(data));
	// 	});
	// } // POST
	//
	// const submitFollowBtn = document.querySelector('.js-submit');
	// if (submitFollowBtn !== null) {
	// 	GET('/api/user/1/feed').then((data) => {
	// 		console.log(data);
	// 	});
	// 	submitFollowBtn.addEventListener('click', (e) => {
	// 		e.preventDefault();
	//
	// 		POST('/api/user/1/feed', {
	// 		}).then((data) => {
	// 				console.log(data);
	// 			});
	// 	});
	// }
	//
	// const submitSignUpBtn = document.querySelector('.js-signup');
	// if(submitSignUpBtn !== null) {
	// 	submitSignUpBtn.addEventListener('click', (e) => {
	// 		e.preventDefault();
	//
	// 		const name = document.querySelector('.js-name').value;
	// 		// const email=document.querySelector('.js-email').value;
	// 		const password = document.querySelector('.js-pw').value;
	//
	// 		POST('/auth/signup', { name, password }).then((data) => {
	// 			console.log(data)
	// 			if (data.success) {
	// 				window.location.href="/login.html"
	// 			}
	// 		});
	// 	});
	// }

// })();
