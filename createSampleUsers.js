const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path to your User model

mongoose.connect('mongodb://localhost:27017/norr3', { useNewUrlParser: true, useUnifiedTopology: true });

const sampleUsers = [
  {
    email: 'admin@norr3.fi',
    password: 'admin',
    role: 'admin',
    partnerName: 'NØRR3',
    agentName: 'Admin User',
    agentKey: 'admin123',
    agentImage: ''
  },
  {
    email: 'seppo.kairikko@kiinteistomaailma.fi',
    password: 'userpassword',
    role: 'partner',
    partnerName: 'Kiinteistömaailma Helsinki',
    agentName: 'Seppo Kairikko',
    agentKey: '1160ska',
    agentImage: ''
  }
];

async function createSampleUsers() {
  for (const userData of sampleUsers) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();
    console.log(`User ${user.email} created`);
  }
  mongoose.connection.close();
}

createSampleUsers().catch(err => {
  console.error(err);
  mongoose.connection.close();
});