(function () {

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
				const data = JSON.parse(request.responseText)
				resolve(data)
			};
			request.onerror = (err) => {
				reject(err)
			};
			request.send(JSON.stringify(data));
		});
	} // POST

	// const submitFollowBtn = document.querySelector('.js-follow');
	// if (submitFollowBtn !== null) {
	// 	GET('/api/user/1/feed').then((data) => {
	// 		console.log(data);
	// 	});
	// 	submitFollowBtn.addEventListener('click', (e) => {
	// 		e.preventDefault();
	// 	const name=document.querySelector('.js-name').value;
	// 		// const email=document.querySelector('.js-email').value;
	// 	const password=document.querySelector('.js-pw').value;

	// 		POST('/api/user/1/feed', {
	// 			username: name,
	// 			password

	// 			})
	// 		.then((data) => {

	// 			POST('/api/user/1/feed', {
	// 			}).then((data) => {
	// 					console.log(data);
	// 				});
	// 		});
	// 	});
	//   }
	 //SubmitFollowBtn
	// function validateSearch() {
	// 	const searchTerm = input.value;

	// 	if (searchTerm.trim() === "") {
	// 		alert('Please input a value!')
	// 		return;
	// 	}
	// } // VaildateSearch

	// const submitSignUpBtn = document.querySelector('.js-signup');
	// const input = document.querySelector('.js-pw');
	// input.addEventListener('keydown', (e) => {
	// 	if (e.keyCode === 13) {
	// 		if (!name || !password) {
	// 			alert('need name and password');
	// 			return;
	// 		}
	// 		console.log(name, password)		
	// 	}
	// });


const templateName = document.querySelector('body').getAttribute('data-template-name');

if(templateName === 'users'){
	const addPost = document.querySelector('.js-add-post');
	  addPost.addEventListener('click', (e) => {
			const input = document.querySelector('.js-post-text').value;
			// input.setAttribute('disabled', 'disabled');
			console.log(input)
			POST('/post/create', {
				description: input.value,
				when: new Date().getTime() + 9 * 60 * 60 * 1000
			}).then((data) => {
				// input.removeAttribute('disabled');
				input.value = '';
				// render(data);
				console.log(data)
			});

		});
}

else if(templateName === 'index'){
	const submitSignUpBtn = document.querySelector('.js-signup');
	if(submitSignUpBtn !== null) {
		submitSignUpBtn.addEventListener('click', (e) => {
			e.preventDefault();
	
			const username = document.querySelector('.js-name').value;
			// const email=document.querySelector('.js-email').value;
			const password = document.querySelector('.js-pw').value;
			console.log(name, password)
			POST('/signup', { username, password }).then((data) => {
				console.log(data)
				if (data.success) {
					window.location.href="/signin.html"
				}
			});
		}); // addEventListener
	}
} // index

else if(templateName === 'signin'){
	const submitSignInBtn = document.querySelector('.js-signin');

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
				console.log(data)
				// try {
				// 	data = JSON.parse(data)
				// }
				// catch(e) {
				// 	throw new Error(e);
				// }

				console.log(data)
				if (data && data.success === false) {
					alert('Not a real user');
					return;
				}
				console.log('POST /login data', data);
				localStorage.setItem('user_id', data.id)
				if (data) {
					window.location.href="/feed.html"
					//	window.location="/feed.html"

				} // data
			}); // .then
		});
	} // Submit Sign in Button

else if(templateName === 'feed'){

	function render(posts) {
	return new Promise((resolve, reject) => {
		console.log(posts);

		const container = document.querySelector('.js-post');
		console.log(container)
		for (const postItem of posts) {
				console.log('single :',postItem);
				console.log('each user id :',postItem["id"]);
				const id = postItem["id"];
			const li = document.createElement("li");
			const url = postItem.url;
			const description = postItem.desc;
			const name = postItem.name;
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
}  // const userIdSets = localStorage.setItem('user_id', data.id)
  const userId = localStorage.getItem('user_id')
  GET('/api/users' + userId)
		.then((data) => {
			console.log(data)
			render(data);
		});

// reactivate on switch to non html5 form based signup / login


	

})();
