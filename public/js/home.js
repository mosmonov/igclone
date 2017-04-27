
// // get requests to render posts
// GET('/')
//   .then(v => {
//     // if user is NOT Logged in, display login form
//     const loginContainer = document.querySelector('.loginContainer');
//     const loginForm = document.createElement('div');
//     loginForm.classList.add('form-group');
//     loginForm.innerHTML =
//     `<form action="/login" method="post" >
//         <div>
//             <label>Username:</label>
//             <input type="text" name="username"/>
//         </div>
//         <div>
//             <label>Password:</label>
//             <input type="password" name="password"/>
//         </div>
//         <div>
//             <input type="submit" value="Log In"/>
//         </div>
//       </form>`
//     loginContainer.appendChild(loginForm)


//     const signupContainer = document.querySelector('.signupContainer');
//     const signupForm = document.createElement('div');
//     signupForm.classList.add('form-group');
//     signupForm.innerHTML =
//     `<form action="/signup" method="post" >
//         <div>
//             <label>Username:</label>
//             <input type="text" name="username"/>
//         </div>
//         <div>
//             <label>Password:</label>
//             <input type="password" name="password"/>
//         </div>
//         <div>
//             <label>Confirm Password:</label>
//             <input type="password" name="password2"/>
//         </div>
//         <div>
//             <input type="submit" value="Signup"/>
//         </div>
//       </form>`
//     signupContainer.appendChild(signupForm)
//   })
//   .catch(err => console.error(err.stack))
