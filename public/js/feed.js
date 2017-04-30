
// get requests to render posts

GET('/api/feed')
  .then((v) => {
    const data = JSON.parse(JSON.parse(v));
    console.log(data);
    localStorage.setItem("id", data.user.id);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("f_name", data.user.f_name);
    localStorage.setItem("l_name", data.user.l_name);
    localStorage.setItem("bio", data.user.bio);
    // console.log(localStorage)
    // if (!data.user) {
    //   window.location.replace('/')
    // }

    // // CONSTRUCT NAV BAR

    // move into main and call from each page...
    const navContainer = document.querySelector('.navbar')
    const div = document.createElement('div')
    div.classList.add('continer-fluid');
    div.innerHTML = `
        <div class="container-fluid">
          <span class="label label-primary feed"> <a href="/feed.html"> Feed </a> </span>
          <span class="label label-success profile"><a href="/profile.html"> Profile </a> </span>
          <span class="label label-info post"> <a href="/post.html"> Post </a> </span>
          <span class="welcome"> <strong> Hi, ${localStorage.username}</strong></span>
          <span class="label label-danger right logout"><a href="/logout"> Logout </a></span>
        </div>
    `
    navContainer.appendChild(div);

    // CONSTRUCT FEED FROM RETURNED DATA
    const postContainer = document.querySelector('.postsContainer');
    console.log(data.feed, typeof data.feed)
    data.feed.forEach((post) => {
      console.log(post)
      const div = document.createElement('div');
      div.classList.add('panel','panel-default','panelD');
      div.innerHTML = `
          <div class="panel-heading">
              <ul class="list-inline">
                  <li>${post.uname}</li>
              </ul>
          </div>
          <div class="panel-image">
            <img src="${post.purl}" class="panel-image-preview">
          </div>
          <div class="panel-body">
            <p>${post.pdesc}</p>
          </div>
          `
      postContainer.appendChild(div);
    })

  })
  .catch(err => console.log(err.stack))
