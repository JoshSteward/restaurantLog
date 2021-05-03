//create model for userLogs 
module.exports = function(sequilize, DataTypes) {
    const userLogs = sequilize.define(
        "userLogs",
        {
            title: {
                type:DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [1, 50]
                }
            },
            log: {
                type:DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [1, 250]
                }
            }, 
            items: {
                type:DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [1, 250]
                }
            },
            rating: {
                type:DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {freezeTableName: true}
    );

    userLogs.associate = models => {
        userLogs.belongsTo(models.user, {
            foreignKey: {
                name: "userId",
                allowNull: false
            }
        });
    };
    return userLogs;
};