
// get requests to render posts

GET('/feed')
  .then((data) => {
    // const data = JSON.(v);
    console.log(typeof data); // WHAAAA?
    const postContainer = document.querySelector('col-md-6');

    for(i = 0; i < data.posts.length ; i++){
      const div = document.createElement('div');
      div.classList.add('panel','panel-default','panelD');
      div.innerHTML = `
                  <div class="panel-heading">
                      <ul class="list-inline">
                          <li>${data.posts[i].username}</li>
                          <li class="pull-right" style="padding-right: 0;">1 week</li>
                      </ul>
                  </div>
                  <div class="panel-image">
                      <img src="${data.posts[i].image}" class="panel-image-preview">
                  </div>
                  <div class="panel-body">
                      <blockquote>
                        <p>${data.posts[i].description}</p>
                      </blockquote>
                  </div>
                  <div class="panel-footer">
                      <ul class="list-inline clearfix">
                          <li class="col-sm-4 col-md-4 col-lg-4 level-line-up"><a href=""><span class="fa fa-thumbs-o-up"></span> Like</a><span>10</span></li>
                          <li class="col-sm-4 col-md-4 col-lg-4 level-line-up"><center><a href=""><span class="fa fa-comments"></span> </a><span>10</span></center></li>
                          <li class="col-sm-4 col-md-4 col-lg-4" style="padding-right: 0;"><span class="pull-right">10</span><a class="pull-right" href=""><span class="fa fa-bomb"></span> Nutty</a></li>
                      </ul>
                  </div> <!--panel footer-->
                  `
      postContainer.appendChild(div);
    }

  })
