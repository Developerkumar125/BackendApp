// app.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./Db/index');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', userRoutes);
// Example route to handle user data
app.get('/api/test', (req, res) => {
    // Replace with actual logic to fetch users from database
    res.json({ users: [{ name: 'Alice' }, { name: 'Bob' }] });
});
const PORT = process.env.PORT || 9000;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
