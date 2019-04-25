//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        //getting data
        // db.collection('guides').get().then(snapshot => {
        //this is a real time listener
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
    });
    } else {
        setupUI();
        setupGuides([]);
    }
});

//create new guides
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //database access inside firebase
    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        //close the modal and reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    });
});

//sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    //prevents refresh of page
    e.preventDefault(); 

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    
    //sign up the user firebase method ----- Async Task -----
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// log user out method
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()//.then(() => {
        //console.log('user signed out');
   // });
});

// Log user in method
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    //firebase method
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //console.log(cred.user)
        //close the log in modal and reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});

