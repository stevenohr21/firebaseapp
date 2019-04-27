//constant guides
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
//const accountDetails = document.querySelector('account-details');

//takes in the user as a parameter and checks if the user exists
const setupUI = (user) => {
  if (user) {
    //toggle UI elements for logged in
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    //toggle UI elements for logged out
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

//setup the guides
const setupGuides = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      //subbing in a template literal (placeholder)
      const li = `
      <div class="row">
        <i class="tiny material-icons col s1">schedule</i>
        <p class="timeStamp col s1">${guide.time}</p>
      </div>
          <li class="simpleGuide">
            <div class="collapsible-header grey lighten-4">${guide.title}<i class="material-icons">arrow_drop_down</i></div>
            <div class="collapsible-body white">${guide.content}</div>
          </li>
      `;
      html += li
    });

    //after for loop the data is then imported into html
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>'
  }
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

var sidenavs = document.querySelectorAll('.sidenav')
for (var i = 0; i < sidenavs.length; i++){
	M.Sidenav.init(sidenavs[i]);
};