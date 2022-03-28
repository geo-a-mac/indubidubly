async function signupFormHandler(event) {
    event.preventDefault();

    const skill = document.querySelector('#skill-add').value.trim();

    if (skill) {
        const response = await fetch('api/user/skills', {
            method: 'post',
            body: JSON.stringify ({skill}),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            console.log('success');
          } else {
            alert(response.statusText);
          }
        }
    }



}