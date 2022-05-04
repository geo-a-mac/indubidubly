
//Gather all information entered into sign up form to crete new profile
async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  const employerSignUp = document.querySelector("#employer");
  const jobSeekerSignUp = document.querySelector("#job-seeker");

const url = document.querySelector("#employerURL").value;
 
//Gather all information from Radio buttons
const radioButtons = document.querySelectorAll('input[name="skill"]');
    let skill_id;
    //look for the Radio button that is checked and assign the skill_id value
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            skill_id = radioButton.value;
            break;
        }
    }
//if the Job Seeker radio button is checked post the information to the User table
  if(jobSeekerSignUp.checked) {
    if (username && email && password && skill_id) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password,
          skill_id
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        if(response.ok) {
          document.location.replace('/userdashboard');
        } else {
          alert(response.statusText);
        }
      })
      .catch(err => console.log(err));
    }
  }
 //If the Employer radio button is checked add all input info to the Employer Table
  else if (employerSignUp.checked) {
    console.log("employer");
    if (username && email && password && url) {
      const response = await fetch('/api/employers', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password,
          url,
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      // check the response status
    .then(response => {
      if(response.ok) {
               document.location.replace('/empdashboard');
      } else {
        alert(response.statusText);
      }
    })
    .catch(err => console.log(err));
  }
}
}

//Log In event function
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  const employer = document.querySelector("#employer-sign-in");
  const jobSeeker = document.querySelector("#job-seeker-sign-in");

  //if the Jobseekr radio button is selected fetch the user table to grab that users information to log in
  if (jobSeeker.checked) {
    console.log(jobSeeker.value);
    if (email && password) {
      const response = await fetch("/api/users/login", {
        method: "post",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            document.location.replace("/userdashboard");

          } else {
            alert(response.statusText);
          }
        })
        .catch((err) => console.log(err));
    }
  }
  //if the Employer radio button is selected fetch the user table to grab that profile information to log in
  if (employer.checked) {
    console.log(employer.value);
    if (email && password) {
      const response = await fetch("/api/employers/login", {
        method: "post",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            document.location.replace("/empdashboard");
          } else {
            alert(response.statusText);
            return;
          }
        })
        .catch((err) => console.log(err));
    }
  }
}

/*navbar click event*/
$(document).on("click", ".action-buttons .dropdown-menu", function (e) {
  e.stopPropagation();
});

//Log In submit event
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

  //sign up click event
document
  .querySelector(".signup")
  .addEventListener("click", signupFormHandler);


