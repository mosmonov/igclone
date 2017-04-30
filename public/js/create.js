// FRONT END FILE FOR CREATING POST

const picContainer = document.querySelector('.picContainer');
const div = document.createElement('div');
div.classList.add('panel','panel-default','panelD');
const userid = localStorage.id
console.log(userid);
div.innerHTML = `
<form action="/api/create" method="post" >
  <div>
	<label> Photo </label>
	<img src="#" class="js-previewImage">
	<input class="js-fbUrl" style="display:none" name="image">
	<input class="js-userID" type="text" name="id" style="display:none" required value="${userid}">
	<input class="js-fileElem" type="file" style="display:none" required>
	<input class="js-fileDescription" type="text" name="summary">
	<a href="#" class="js-fileSelect">Select Image</a>
	<input type="submit" value="Create Post">
  </div>
</form>`;
picContainer.appendChild(div);
console.log(picContainer);	

// POST('/api/create')
//   .then((v) => {
//     // const data = JSON.parse(JSON.parse(v));
// // HITS API @ /api/create, reference api.js in routes.




