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

	const submitFollowBtn = document.querySelector('.js-follow');
	if (submitFollowBtn !== null) {
		GET('/api/1/feed').then((data) => {
			console.log(data);
		});
		submitFollowBtn.addEventListener('click', (e) => {
			e.preventDefault();
		const name=document.querySelector('.js-name').value;
			// const email=document.querySelector('.js-email').value;
		const password=document.querySelector('.js-pw').value;

			POST('/api/1/feed', {
				username: name,
				password

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
				username: name,
				// email,
				password,
			}).then((data) => {
				console.log(data);
				try {
					data = JSON.parse(data)
				}
				catch(e) {
					throw new Error(e);
				}

				console.log(data)
				if (data && data.success === false) {
					alert('Not a real user');
					return;
				}
				if (data) {
					window.location.href="/feed.html"
					//	window.location="/feed.html"

				}
			});
		});
	}

function render(posts) {
	return new Promise((resolve, reject) => {
		const container = document.querySelector('.js-add-post');
		container.innerHTML = '';
		for (const post of posts) {
			const li = document.createElement("li");
			li.innerHTML = `
<div>
	<ul class="list-inline"> 
		<li class="js-name"${posts.uname}></li>
	</ul>
</div>
<div class="panel-image js-pic">${posts.purl}
</div>
<div class="panel-body">
	<blockquote>
	<p class="js-text"${posts.pdesc}"> </p>
	</blockquote>
</div>
	`;
			container.appendChild(li);

			if (posts.length === 0) {
				container.innerHTML = `
<li class="js-name">
	No Users!
</li>
				`;
			}
		} //for loop
	}) // promise
} //render

  GET('/post')
		.then((posts) => {
			console.log(posts)
			render(posts);
		});

  document.querySelector('.js-add-post').addEventListener('click', (e) => {
		const input = document.querySelector('.js-post-text');
		input.setAttribute('disabled', 'disabled');

		POST('/create', {
			post: input.value,
			when: new Date().getTime() + 9 * 60 * 60 * 1000
		}).then((data) => {
			input.removeAttribute('disabled');
			input.value = '';
			render(data);
		});

	});

})();
