
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
          <a href="/feed.html"><i class="glyphicon glyphicon-camera"></i></a>
          <a href="/profile.html">Profile</a>
          <a href="/createpost.html">Create Post</a>
          <span>Hi,${localStorage.username}</span>
          <a href="/logout">logout</a>
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
