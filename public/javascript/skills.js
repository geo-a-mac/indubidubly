async function signupFormHandler(event) {
    event.preventDefault();

    const skill = document.querySelector('#skill-add').ariaValueMax.trim();

    if (skill) {
        const response = await fetch('api/user/skills', {
            method: 'post',
            body: JSON.stringify ({skill}),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {

        }
    }



}