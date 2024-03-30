module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: { // Add a password field
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    entitiesKilled: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    }
    // Add other fields as needed
  });

  return User;
};
