const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const FILE = './users.json';

function getUsers() {
    return JSON.parse(fs.readFileSync(FILE));
}

function saveUsers(users) {
    fs.writeFileSync(FILE, JSON.stringify(users));
}

// REGISTER
app.post('/register', (req, res) => {
    const { username, password, description, sports } = req.body;

    const users = getUsers();

    users.push({
        username,
        password,
        description,
        sports: sports.split(',') 
    });

    saveUsers(users);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const users = getUsers();

    const user = users.find(u =>
        u.username === username && u.password === password
    );

    if (user) {
        res.redirect(`/profile.html?user=${username}`);
    } else {
        res.send("Date incorecte");
    }
});

app.listen(3000, () => {
    console.log("Server pornit pe http://localhost:3000/login.html");
});