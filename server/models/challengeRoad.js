module.exports = (sequelize, DataTypes) => {
    const ChallengeRoad = sequelize.define('ChallengeRoad', {
        rewards: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return ChallengeRoad;
};