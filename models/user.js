//use brcypt to hash password
const bcrypt = require("bcryptjs");

//create model for user
module.exports = function(sequilize, DataTypes) {
    const User = sequilize.define("user", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isAfter: "1900-01-01",
                isBefore: "2003-01-01"
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: ["^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"]
            }
        },
    });

    User.associate = models => {
        User.hasMany(models.classes, {
            
        })
    }
}