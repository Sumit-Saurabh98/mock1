const userTableBody = document.querySelector('#userTable tbody');

function deleteUser(uniqueId) {
  localStorage.removeItem(uniqueId);

  const row = document.getElementById(uniqueId);
  if (row) {
    row.remove();
  }
}


function vaccinateUser(uniqueId) {
  const userData = JSON.parse(localStorage.getItem(uniqueId));
  var enteredOtp = prompt("Enter otp:")
  if(enteredOtp==userData.otp){
    Promise.resolve()
    .then(() => {
      alert(`${userData.name} Added to Queue`);
      return new Promise(resolve => setTimeout(resolve, 5000));
    })
    .then(() => {
      alert(`Vaccinating ${userData.vaccine} - After 5 seconds`);
      return new Promise(resolve => setTimeout(resolve, 5000));
    })
    .then(() => {
      alert(`${userData.name} Vaccinated - After 10 seconds`);

      const vaccinatedData = JSON.parse(localStorage.getItem('vaccinated')) || {};
      vaccinatedData[uniqueId] = userData;
      localStorage.setItem('vaccinated', JSON.stringify(vaccinatedData));

      deleteUser(uniqueId);

      const row = document.getElementById(uniqueId);
      if (row) {
        row.remove();
      }
    });
  }else{
alert("wrong otp")
  }
}

for (let i = 0; i < localStorage.length; i++) {
  const uniqueId = localStorage.key(i);
  const userData = JSON.parse(localStorage.getItem(uniqueId));

  const vaccinatedData = JSON.parse(localStorage.getItem('vaccinated')) || {};
  if (vaccinatedData.hasOwnProperty(uniqueId)) {
    continue; 
  }

  const row = document.createElement('tr');
  row.id = uniqueId;

  const uCell = document.createElement('td');
  uCell.textContent = userData.uniqueId;
  const nCell = document.createElement('td');
  nCell.textContent = userData.name;
  const aCell = document.createElement('td');
  aCell.textContent = userData.age;
  const desCell = document.createElement('td');
  desCell.textContent = userData.designation;
  const priCell = document.createElement('td');
  priCell.textContent = userData.priority;
  const vacCell = document.createElement('td');
  vacCell.textContent = userData.vaccine;
  const otpCell = document.createElement('td');
    otpCell.textContent = userData.otp;
  const deleteCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', function() {
    deleteUser(uniqueId);
  });
  deleteCell.appendChild(deleteButton);
  const vaccinateCell = document.createElement('td');
  const vaccinateButton = document.createElement('button');
  vaccinateButton.textContent = 'Vaccinate';
  vaccinateButton.classList.add('vaccinate-button');
  vaccinateButton.addEventListener('click', function() {
    vaccinateUser(uniqueId);  
  });
  vaccinateCell.appendChild(vaccinateButton);

  row.appendChild(uCell);
  row.appendChild(nCell);
  row.appendChild(aCell);
  row.appendChild(desCell);
  row.appendChild(priCell);
  row.appendChild(vacCell);
  row.appendChild(otpCell);
  row.appendChild(deleteCell);
  row.appendChild(vaccinateCell);

  userTableBody.appendChild(row);
}
