async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="title"]').value;
    const information = document.querySelector('input[name="information"]').value;
    const rate_of_pay = document.querySelector('input[name="rate_of_pay"]').value;
    const employer_id = document.querySelector("#employerId").innerHTML.toString().split(' ')[
        document.querySelector("#employerId").innerHTML.toString().split(' ').length -1
    ]
    
  
    const radioButtons = document.querySelectorAll('input[name="skill"]');
    let skill_id;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            skill_id = radioButton.value;
            break;
        }
    }

console.log(title, information, rate_of_pay, employer_id, skill_id)

const response = await fetch('/api/jobs/', {
      method: 'POST',
      body: JSON.stringify({
        title,
        information,
        rate_of_pay,
        employer_id,
        skill_id 

      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/empdashboard');
    } else {
      alert(response.statusText);
    }
}
  
document.querySelector('#newJob').addEventListener('click', newFormHandler);