(function () {

	function GET(url) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('GET', url);
			request.onload = () => {
				const data = JSON.parse(request.responseText)
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
				const data = request.responseText;
				resolve(data)
			};
			request.onerror = (err) => {
				reject(err)
			};
			request.send(JSON.stringify(data));
		});
	} // POST

	const submitFollowBtn = document.querySelector('.js-submit');
	if (submitFollowBtn !== null) {
		GET('/api/user/1/feed').then((data) => {
			console.log(data);
		});
		submitFollowBtn.addEventListener('click', (e) => {
			e.preventDefault();

			POST('/api/user/1/feed', {
				// ?
			}).then((data) => {
					console.log(data);
				});
		});
	}

	const submitSignUpBtn = document.querySelector('.js-signup');
	
	if(submitSignUpBtn !== null) {
		submitSignUpBtn.addEventListener('click', (e) => {
			e.preventDefault();

			const name=document.querySelector('.js-name').value;
			// const email=document.querySelector('.js-email').value;
			const password=document.querySelector('.js-pw').value;

			POST('/login/signup', {
				name,
				// email,
				password,
			}).then((data) => {
				console.log(data) 
				if (data) {
					window.location.href="/signin.html"
					//	window.location="/feed.html"

				}
			});
		});
	}

	const submitSignInBtn = document.querySelector('.js-signin');
	
	if(submitSignInBtn !== null) {
		submitSignInBtn.addEventListener('click', (e) => {
			e.preventDefault();

			const name=document.querySelector('.js-name').value;

			// const email=document.querySelector('.js-email').value;
			const password=document.querySelector('.js-pw').value;

			if (!name || !password) {
				alert('need name and password');
				return;
			}
			console.log(name, password)

			POST('/login', {
				name,
				// email,
				password,
			}).then((data) => {
				console.log(data) 
				if (data) {
					window.location.href="/feed.html"
					//	window.location="/feed.html"

				}
			});
		});
	}

function render(users) {
		console.log()
		const container = document.querySelector('.js-users');
		container.innerHTML = '';
	for (const user of users) {
			const li = document.createElement("li");
			li.innerHTML = `
				<span class="js-username">${user.username}</span>
				<div class="js-pic">${user.picture}</div>
			`;
			container.appendChild(li);

		if (users.length === 0) {
			container.innerHTML = `
			<li class="js-username">
			No Users!
			</li>
			`;
			}
		}
	}
})();

