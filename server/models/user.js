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
    totalDirtMined: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalDiamondsMined: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
        },
    playtimes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    }
    // Add other fields as needed
  });

  return User;
};
