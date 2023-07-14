const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.static(path.join(__dirname, 'dist/alchemy-ai/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/alchemy-ai/index.html'));
});


app.get('/users', (req, res) => {
  const users = generateUsers(10); // Generate 10 mock users
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const users = generateChartData();
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.ClientName === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, age } = req.body;

  // Find the user in the list
  const user = userList.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Update the user's properties
  user.name = name;
  user.age = age;

  return res.json({ message: 'User updated successfully', user });
});

app.listen(port, () => {
  console.log(`Mock User Service is running on port ${port}`);
});


function generateUsers(count) {
  const users = [];
  const riskIndicatorValues=['HIGH', 'MEDIUM', 'LOW'];
  for (let i = 0; i < count; i++) {
    const user = {
      ClientName: 10000 + i,
      NoOfTransaction: 123 + i,
      TotalAmount: Math.round(1234 * Math.random()),
      Currency: 'SGD',
      RiskIndicator: riskIndicatorValues[Math.ceil(Math.random()*riskIndicatorValues.length)] ?? riskIndicatorValues[0],
      Anamoly: 'transactions',
      Variation: 50
    };
    users.push(user);
  }
  return users;
}

function generateChartData() {
  const users = [];
  const today = new Date();
  const anomalies = ['Transaction', 'Amount', 'Authorization'];
  for (let i = 0; i < 10; i++) {
    const user = {
      ClientName: 10000 + i,
      AnomalyType: anomalies[Math.ceil(Math.random()*anomalies.length)] ?? anomalies[0],
      Data: [{
        ExecutionDate: new Date(),
        NoOfTrxEachDay: 222 + i,
        IndividualAmount: 4563 * i,
        AuthorizationTime: Math.floor(Math.random() * (24 - 1 + 1) + 1),
      },
      {
        ExecutionDate: new Date(new Date().setDate(today.getDate() - 30)),
        NoOfTrxEachDay: 22 * Math.random(),
        IndividualAmount: 4563 * i * 3,
        AuthorizationTime: Math.floor(Math.random() * (24 - 1 + 1) + 1),
      },
      {
        ExecutionDate: new Date(new Date().setDate(today.getDate() - 20)),
        NoOfTrxEachDay: 22 * Math.random(),
        IndividualAmount: 4563 * i * 3,
        AuthorizationTime: Math.floor(Math.random() * (24 - 1 + 1) + 1),
      },
      {
        ExecutionDate: new Date(new Date().setDate(today.getDate() - 40)),
        NoOfTrxEachDay: 22 * Math.random(),
        IndividualAmount: 4563 * i * 3,
        AuthorizationTime: Math.floor(Math.random() * (24 - 1 + 1) + 1),
      },
      {
        ExecutionDate: new Date(new Date().setDate(today.getDate() - 67)),
        NoOfTrxEachDay: 22 * Math.random(),
        IndividualAmount: 4563 * i * 3,
        AuthorizationTime: Math.floor(Math.random() * (24 - 1 + 1) + 1),
      },
      {
        ExecutionDate: new Date(new Date().setDate(today.getDate() - 100)),
        NoOfTrxEachDay: 22 * Math.random(),
        IndividualAmount: 4563 * i * 3,
        AuthorizationTime: Math.floor(Math.random() * (24 - 1 + 1) + 1),
      }
      ]
    };
    users.push(user);
  }
  return users;
}