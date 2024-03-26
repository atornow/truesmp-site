module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: { // Add a password field
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    totalDirtMined: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalDiamondsMined: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
        },
    // Add other fields as needed
  });

  return User;
};
