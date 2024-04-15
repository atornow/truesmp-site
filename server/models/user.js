module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, //CHANGE ME FOR PRODUCTION
    },
    verificationToken: {
      type: DataTypes.STRING,
    },
    verificationExpires: {
      type: DataTypes.DATE,
    },
    blocksPlaced: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    blocksMined: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    playtimes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    lastUpdate: {
      type: DataTypes.DATE,
      defaultValue: new Date('2024-03-01'),
    },
    uuid: {
      type: DataTypes.STRING,
    },
    teamId: {
      type: DataTypes.STRING,
      defaultValue: 'No Team',
    },
    entitiesKilled: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    groups: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['member'],
    },
  });

  return User;
};
