const vaccinatedTableBody = document.querySelector('#vaccinatedTable tbody');

function removeVaccinatedUser(uniqueId) {
  const vaccinatedData = JSON.parse(localStorage.getItem('vaccinated')) || {};
  delete vaccinatedData[uniqueId];
  localStorage.setItem('vaccinated', JSON.stringify(vaccinatedData));

  const row = document.getElementById(uniqueId);
  if (row) {
    row.remove();
  }
}

const vaccinatedData = JSON.parse(localStorage.getItem('vaccinated')) || {};
for (const uniqueId in vaccinatedData) {
  if (vaccinatedData.hasOwnProperty(uniqueId)) {
    const userData = vaccinatedData[uniqueId];

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
    const vaccineCell = document.createElement('td');
    vaccineCell.textContent = userData.vaccine;
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.classList.add('remove-button');
    deleteButton.addEventListener('click', function() {
      removeVaccinatedUser(uniqueId);
    });
    deleteCell.appendChild(deleteButton);

    row.appendChild(uCell);
    row.appendChild(nCell);
    row.appendChild(aCell);
    row.appendChild(desCell);
    row.appendChild(priCell);
    row.appendChild(vaccineCell);
    row.appendChild(deleteCell);

    vaccinatedTableBody.appendChild(row);
  }
}
