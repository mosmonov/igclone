
// get requests to render posts
GET('/')
  .then(v => {
    // console.log(v);
    // if user is NOT Logged in, display login form
    const formContainer = document.querySelector('.formContainer');
    const div = document.createElement('div');
    div.classList.add('loginContainer', 'form-group');
    div.innerHTML =
    ` <form action="/login" method="post" >
        <div>
            <label>Username:</label>
            <input type="text" name="username"/>
        </div>
        <div>
            <label>Password:</label>
            <input type="password" name="password"/>
        </div>
        <div>
            <input type="submit" value="Log In"/>
            <input type="button" value="Signup"/>
        </div>
      </form>`
    formContainer.appendChild(div)
  })
  .catch(err => console.error(err.stack))
