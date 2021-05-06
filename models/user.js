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
        User.hasMany(models.userLogs, {
            foreignKey: {
                name: "email",
                allowNull: false
            },
            onDelete: "CASCADE"
        });
    };

    //check if unhashed passowrd can be compared to hashed password 
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    //automatically hash user password before the user is created
    User.addHook("beforeCreate", user => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });
    return User;
};