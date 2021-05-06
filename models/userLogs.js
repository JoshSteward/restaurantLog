//create model for userLogs 
//import { INTEGER } from "sequelize/types";


module.exports = function(sequilize, DataTypes) {
    const userLogs = sequilize.define(
        "userLogs",
        {
            locationName: {
                type:DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [1, 50]
                }
            },
            location: {
                type:DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [1, 250]
                }
            }, 
            thoughts: {
                type:DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [1, 250]
                }
            }, 
            menuItems: {
                type:DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [1, 250]
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                }
        
            //},
            //rating: {
                //type:DataTypes.INTEGER,
                //allowNull: false,
            
        },
        {freezeTableName: true}
    );

      
        
    

    return userLogs;
};