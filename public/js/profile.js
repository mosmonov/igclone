
// get requests to render posts
GET('/profile')
  .then((v) => {
    console.log(v)
    const data = JSON.parse(JSON.parse(v));
    console.log(data)
    // // CONSTRUCT NAV BAR
    const navContainer = document.querySelector('.navbar')
    const navDiv = document.createElement('div');
    navDiv.classList.add('continer-fluid');
    navDiv.innerHTML = `
        <div class="container-fluid">
          <span class="label label-primary feed"> <a href="/feed.html"> Feed </a> </span>
          <span class="label label-success profile"><a href="/profile.html"> Profile </a> </span>
          <span class="label label-info post"> <a href="/post.html"> Post </a> </span>
          <span class="welcome"> <strong> Hi, ${localStorage.username}</strong></span>
          <span class="label label-danger right logout"><a href="/logout"> Logout </a></span>
        </div>
    `;
    navContainer.appendChild(navDiv);

    // Renders user info
    const profileContainer = document.querySelector('.userInfo')
    const userInfoDiv = document.createElement('div');
    userInfoDiv.innerHTML = `
      <div class="panel-header">
        <h4>${data.user.username}</h4>
        <h3>${data.user.f_name} ${data.user.l_name}</h3>
        <h2>${data.user.bio}</h2>
        <a href="/profile/edit"><i class="glyphicon glyphicon-pencil"></i></a>
      </div>
    `
    profileContainer.appendChild(userInfoDiv);


    // Renders a user's posts
    const postContainer = document.querySelector('.postsContainer');
    console.log(data.posts, typeof data.posts);
    data.posts.forEach((post) => {
      const postDiv = document.createElement('div');
      postDiv.innerHTML = `
          <div class="panel-image">
              <img src="${post.purl}" class="panel-image-preview">
          </div>
          `;
      postContainer.appendChild(postDiv);
    })

  })
  .catch(err => console.log(err.stack));
