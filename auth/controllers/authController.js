const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

function ensureStore() {
  if (!fs.existsSync(path.dirname(usersFilePath))) {
    fs.mkdirSync(path.dirname(usersFilePath), { recursive: true });
  }

  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, '[]', 'utf8');
  }
}

function readUsers() {
  ensureStore();
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
}

function writeUsers(users) {
  ensureStore();
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const users = readUsers();
    const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      password: hashPassword(password)
    };

    users.push(newUser);
    writeUsers(users);

    return res.status(201).json({ message: 'User created', user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    return res.status(500).json({ message: 'Signup failed' });
  }
}

function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const users = readUsers();
    const user = users.find((entry) => entry.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    if (hashPassword(password) !== user.password) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    return res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed' });
  }
}

module.exports = { signup, login };
