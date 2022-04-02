async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  const employer = document.querySelector('#employer').value;
  const jobSeeker = document.querySelector('#job-seeker').value;

//const url = document.querySelector('#employerURL').value;
skillId = document.querySelector('#job-seeker-skill').value;

console.log(jobSeeker);

  if(jobSeeker === "jobSeeker") {
    console.log("job-seeker");
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password,
          skillId,
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      // check the response status
      if (response.ok) {
        document.location.replace('/dashboard');
        return;
      } else {
        alert(response.statusText);
      }
    }
  } 
  else if (employer === "Employer") {
    console.log("employer");
  }
  console.log("test");
  // if (username && email && password) {
  //   const response = await fetch('/api/users', {
  //     method: 'post',
  //     body: JSON.stringify({
  //       username,
  //       email,
  //       password
  //     }),
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  //   // check the response status
  //   if (response.ok) {
  //     document.location.replace('/dashboard');
  //   } else {
  //     alert(response.statusText);
  //   }
  // }
}

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  const employer = document.querySelector('#employer-sign-in');
  const jobSeeker = document.querySelector('#job-seeker-sign-in');


  if(jobSeeker.checked) {
    console.log(jobSeeker.value);
    if(email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(response => {
        if(response.ok) {
          document.location.replace('/dashboard');
          alert("success");
        } else {
          alert(response.statusText);
        }
      })
      .catch(err => console.log(err));
  }  
 } 
 if (employer.checked) {
   console.log(employer.value);
   if(email && password) {
     const response = await fetch('/api/employers/login', {
       method: 'post',
       body: JSON.stringify({
         email,
         password
       }),
       headers: {'Content-Type': 'application/json'}
     })
     .then(response => {
        if(response.ok) {
          document.location.replace('/dashboard');
          alert("success");
        } else {
          alert(response.statusText);
        }
     })
     .catch(err => console.log(err));
   }
 }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

/*navbar click event*/
$(document).on("click", ".action-buttons .dropdown-menu", function (e) {
  e.stopPropagation();
});