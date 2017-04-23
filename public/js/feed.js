
// get requests to render posts

GET('/feed')
  .then((v) => {
    const data = JSON.parse(JSON.parse(v));

    const postContainer = document.querySelector('.postsContainer');

    data.forEach((post) => {
      const div = document.createElement('div');
      div.classList.add('panel','panel-default','panelD');
      div.innerHTML = `
                  <div class="panel-heading">
                      <ul class="list-inline">
                          <li>${post.username}</li>
                          <li class="pull-right" style="padding-right: 0;">1 week</li>
                      </ul>
                  </div>
                  <div class="panel-image">
                      <img src="${post.url}" class="panel-image-preview">
                  </div>
                  <div class="panel-body">
                      <blockquote>
                        <p>${post.description}</p>
                      </blockquote>
                  </div>
                  <div class="panel-footer">
                      <ul class="list-inline clearfix">
                          <li class="col-sm-4 col-md-4 col-lg-4 level-line-up"><a href=""><span class="fa fa-thumbs-o-up"></span> Like</a><span>10</span></li>
                          <li class="col-sm-4 col-md-4 col-lg-4" style="padding-right: 0;"><span class="pull-right">10</span><a class="pull-right" href=""><span class="fa fa-bomb"></span> Nutty</a></li>
                      </ul>
                  </div> <!--panel footer-->
                  `
      postContainer.appendChild(div);
      })
  })

  .catch(err => console.log(err.stack))
