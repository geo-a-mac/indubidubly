async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    const employer = document.querySelector('#employer-sign-in');
    const jobSeeker = document.querySelector('#job-seeker-sign-in');

    if(jobSeeker.checked) {
        console.log(jobSeeker.value);
    }
    else if(employer.checked) {
        console.log(employer.value);
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

/*navbar click event*/
$(document).on("click", ".action-buttons .dropdown-menu", function (e) {
    e.stopPropagation();
  });