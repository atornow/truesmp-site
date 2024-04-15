module.exports = (sequelize, DataTypes) => {
    const ChallengeRoad = sequelize.define('ChallengeRoad', {
        length: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        regularRewards: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
        donatorRewards: {
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