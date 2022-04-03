async function editFormHandler(event) {
    event.preventDefault();
    // const newUsername = document.querySelector("#username-signup").value.trim();
    // const newEmail = document.querySelector("#email-signup").value.trim();
    const id = document.querySelector("#user-id").innerHTML.toString().split(' ')[ 
        document.querySelector("#user-id").innerHTML.toString().split(' ').length - 1];

   

    const radioButtons = document.querySelectorAll('input[name="skill"]');
    let skill_id;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            skill_id = radioButton.value;
            break;
        }
    }
    console.log(skill_id);
    console.log(id);


    if(skill_id) {
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                skill_id
            }),
            headers: { 'Content-Type': 'application/json'},
        })
        if (response.ok) {
            document.location.replace('/userdashboard/');
          } else {
            alert(response.statusText);
          }
    }
};

document.querySelector('#edit-user').addEventListener('click', editFormHandler);