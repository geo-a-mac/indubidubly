async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  const employerSignUp = document.querySelector("#employer");
  const jobSeekerSignUp = document.querySelector("#job-seeker");

const url = document.querySelector("#employerURL").value;
 
const radioButtons = document.querySelectorAll('input[name="skill"]');
    let skill_id;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            skill_id = radioButton.value;
            break;
        }
    }

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

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  const employer = document.querySelector("#employer-sign-in");
  const jobSeeker = document.querySelector("#job-seeker-sign-in");

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

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup")
  .addEventListener("submit", signupFormHandler);


