
// get requests to render posts
GET('/')
  .then(v => {
    // if user is NOT Logged in, display login form
    const loginContainer = document.querySelector('.loginContainer');
    const loginForm = document.createElement('div');
    loginForm.classList.add('form-group');
    loginForm.innerHTML =
    `
        
            <form action="/login" method="post" >
                <div class="row">
                    <div class="two columns"></div>
                    <div class="eight columns">
                        <label for="exampleEmailInput"> Username: </label>
                        <input class="js-name" type="text" name="username" placeholder="Name">
                    </div> <!--eight columns-->
                    <div class="two columns"></div>
                </div> <!--row-->
                <div class="row">
                    <div class="two columns"></div>
                    <div class="eight columns">
                        <label for="exampleEmailInput"> Password: </label>
                        <input class="js-pw" type="password" name="password" placeholder="Password">
                        <div class="js-sign-in">
                            <input type="submit" value="Log In"/>
                        </div>
                    </div> <!--eight columns-->
                    <div class="two columns"></div>
                </div> <!--row-->
            </form>
        
  `




    loginContainer.appendChild(loginForm)


    const signupContainer = document.querySelector('.signupContainer');
    const signupForm = document.createElement('div');
    signupForm.classList.add('form-group');
    signupForm.innerHTML =
    `
    <form action="/signup" method="post" >
        <div>
            <label>Username:</label>
            <input type="text" name="username"/>
        </div>
        <div>
            <label>Password:</label>
            <input type="password" name="password"/>
        </div>
        <div>
            <label>Confirm Password:</label>
            <input type="password" name="password2"/>
        </div>
        <div>
            <input type="submit" value="Signup"/>
        </div>
      </form>
      `
    signupContainer.appendChild(signupForm)
  })
  .catch(err => console.error(err.stack))
