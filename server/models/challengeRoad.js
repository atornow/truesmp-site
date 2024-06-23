module.exports = (sequelize, DataTypes) => {
    const ChallengeRoad = sequelize.define('ChallengeRoad', {
        rewards: {
            type: DataTypes.JSON,
            defaultValue: [],
            get() {
                const rawValue = this.getDataValue('rewards');
                return rawValue ? rawValue.map(reward => ({
                    ...reward,
                    command: reward.command || '' // Ensure backward compatibility
                })) : [];
            },
            set(value) {
                this.setDataValue('rewards', value.map(reward => ({
                    ...reward,
                    command: reward.command || '' // Ensure command is always set
                })));
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return ChallengeRoad;
};