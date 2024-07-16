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

const PORT = process.env.PORT || 9000;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
