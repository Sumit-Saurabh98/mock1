
const registrationForm = document.querySelector('#registrationForm');

function registerUser(event) {
  event.preventDefault();


  const uniqueId = document.querySelector('#uniqueId').value;
  const name = document.querySelector('#name').value;
  const age = document.querySelector('#age').value;
  const designation = document.querySelector('input[name="designation"]:checked').value;
  const priority = document.querySelector('#priority').value;
  const vaccine = document.querySelector('#vaccine').value;

 
  if (!isValidUniqueId(uniqueId)) {
    alert('Please enter a unique ID.');
    return;
  }

  if (!isValidName(name)) {
    alert('Name should be at least 4 characters long.');
    return;
  }

  if (!isValidAge(age)) {
    alert('Age should be between 18 and 40.');
    return;
  }


  const user = {
    uniqueId,
    name,
    age,
    designation,
    priority,
    vaccine
  };


  localStorage.setItem(uniqueId, JSON.stringify(user));


  registrationForm.reset();

  alert('Registration successful!');
}


function isValidUniqueId(uniqueId) {
  return uniqueId.trim() !== '' && localStorage.getItem(uniqueId) === null;
}


function isValidName(name) {
  return name.trim().length >= 4;
}


function isValidAge(age) {
  return age >= 18 && age <= 40;
}


registrationForm.addEventListener('submit', registerUser);
