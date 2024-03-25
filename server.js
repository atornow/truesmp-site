const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

