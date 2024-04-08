const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const statUpdateJob = require('./jobs/statUpdateJob');
const userFetchJob = require('./jobs/userFetchJob');
const { initializeUsersJob } = require('./jobs/initializeUsersJob');
const authRoutes = require('./routes/authRoutes');
const statsRoutes = require('./routes/statsRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/challenges', challengeRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initializeUsersJob()
    .then(() => {
      // Start the cron jobs after initialization is done
      statUpdateJob();
      userFetchJob();
    })
  });
});





