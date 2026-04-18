
let users = [
    { id: "admin1", pass: "admin123", role: "admin" },
    { id: "stu101", pass: "pass123", role: "student" }
];

let currentUser = null;
const showSection = (id) => {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById(id).style.display = 'block';
};
const handleRegister = () => {
    const id = document.getElementById('reg-id').value;
    const pass = document.getElementById('reg-pass').value;
    const role = document.getElementById('reg-role').value;

    if (!id || !pass) { 
        alert("Please enter both ID and Password!");
        return;
    }

    const exists = users.find(u => u.id === id);
    if (exists) {
        alert("User ID already exists!");
        return;
    }

    users.push({ id, pass, role });
    alert("Registration Successful!");
    showSection('login-section');
};


const handleLogin = () => {
    const id = document.getElementById('login-id').value;
    const pass = document.getElementById('login-pass').value;

    const user = users.find(u => u.id === id && u.pass === pass);

    if (user) {
        currentUser = user;
        alert("Login Successful! Welcome " + id); 
        renderDashboard();
    } else {
        alert("Invalid ID or Password!");
    }
};


const renderDashboard = () => {
    showSection('dashboard');
    document.getElementById('welcome-header').innerText = `Welcome, ${currentUser.id}`;

    if (currentUser.role === 'admin') {
        document.getElementById('admin-panel').style.display = 'block';
        document.getElementById('student-panel').style.display = 'none';
        refreshUserTable(users);
    } else {
        document.getElementById('admin-panel').style.display = 'none';
        document.getElementById('student-panel').style.display = 'block';
        document.getElementById('profile-data').innerHTML = `<p>ID: ${currentUser.id}</p><p>Role: ${currentUser.role}</p>`;
    }
};


const refreshUserTable = (data) => {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = data.map(u => `
        <tr>
            <td>${u.id}</td>
            <td>${u.role}</td>
            <td>
                <button class="action-btn del" onclick="deleteUser('${u.id}')">Delete</button>
                <button class="action-btn" onclick="updateUser('${u.id}')">Update</button>
            </td>
        </tr>
    `).join('');
};

const deleteUser = (id) => {
    if (id === currentUser.id) return alert("Cannot delete your own account!");
    users = users.filter(u => u.id !== id);
    refreshUserTable(users);
};

const updateUser = (id) => {
    const newPass = prompt(`Enter new password for ${id}:`);
    if (newPass) {
        const user = users.find(u => u.id === id);
        user.pass = newPass;
        alert("Password updated successfully!");
    }
};

const searchUsers = () => {
    const term = document.getElementById('search-bar').value.toLowerCase();
    const filtered = users.filter(u => u.id.toLowerCase().includes(term));
    refreshUserTable(filtered);
};

const logout = () => {
    currentUser = null;
    showSection('login-section');
};


document.getElementById('login-btn').addEventListener('click', handleLogin);
document.getElementById('reg-btn').addEventListener('click', handleRegister);
document.getElementById('search-bar').addEventListener('keyup', searchUsers);