module.exports = (sequelize, DataTypes) => {
  const Challenge = sequelize.define('Challenge', {
    amountGoal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currentProgress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    initialProgress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    targetUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    dataType: {
      type: DataTypes.STRING,
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dataName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blockAction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Challenge;
};