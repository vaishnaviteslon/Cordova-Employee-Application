let employees = [];
let currentPhoto = "";
let editingEmployeeId = null;


function addEmployee() {
  const name = document.getElementById('empName').value;
  const role = document.getElementById('empRole').value;

  const id = Date.now();
  employees.push({ id, name, role, photo: currentPhoto });
  displayEmployees();
  resetForm();
}

function updateEmployee() {
  const name = document.getElementById('empName').value;
  const role = document.getElementById('empRole').value;

  if (editingEmployeeId === null) {
    alert("No employee selected for update.");
    return;
  }

  const index = employees.findIndex(emp => emp.id === editingEmployeeId);
  if (index !== -1) {
    employees[index].name = name;
    employees[index].role = role;
    employees[index].photo = currentPhoto;

    displayEmployees();
    resetForm();
    editingEmployeeId = null;
  } else {
    alert("Employee not found.");
  }
}


function displayEmployees() {
  const list = document.getElementById('employeeList');
  list.innerHTML = '';
  employees.forEach(emp => {
    const li = document.createElement('li');
    li.innerHTML = `<b>${emp.name}</b> - ${emp.role}<br><img src="${emp.photo}" width="50"><br>
    <button onclick="editEmployee(${emp.id})">Edit</button>
    <button onclick="deleteEmployee(${emp.id})">Delete</button>`;
    list.appendChild(li);
  });
}

function deleteEmployee(id) {
  employees = employees.filter(emp => emp.id !== id);
  displayEmployees();
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  document.getElementById('empName').value = emp.name;
  document.getElementById('empRole').value = emp.role;
  currentPhoto = emp.photo;
  document.getElementById('previewPhoto').src = emp.photo;

  editingEmployeeId = id; 
}


function searchEmployee() {
  const query = document.getElementById('searchBox').value.toLowerCase();
  const filtered = employees.filter(e => e.name.toLowerCase().includes(query));
  const list = document.getElementById('employeeList');
  list.innerHTML = '';
  filtered.forEach(emp => {
    const li = document.createElement('li');
    li.innerHTML = `<b>${emp.name}</b> - ${emp.role}<br><img src="${emp.photo}" width="50">`;
    list.appendChild(li);
  });
}

function loadPhoto(event) {
  const reader = new FileReader();
  reader.onload = function() {
    currentPhoto = reader.result;
    document.getElementById('previewPhoto').src = currentPhoto;
  }
  reader.readAsDataURL(event.target.files[0]);
}

function capturePhoto() {
  navigator.camera.getPicture(
    imageData => {
      currentPhoto = "data:image/jpeg;base64," + imageData;
      document.getElementById('previewPhoto').src = currentPhoto;
    },
    error => {
      console.error("Camera error:", error);
    },
    {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    }
  );
}

function resetForm() {
  document.getElementById('empName').value = '';
  document.getElementById('empRole').value = '';
  currentPhoto = '';
  document.getElementById('previewPhoto').src = '';
  editingEmployeeId = null;
}
