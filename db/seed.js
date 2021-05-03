const db  = require ("../models");

const members = [
    {
        firstName: "Josh",
        lastName: "Steward",
        dob: "1996-01-11",
        email: "stewardjosh10@gmail.com",
        password: "chunud19"
    },
    {
        firstName: "Big",
        lastName: "Chungus",
        dob: "2016-01-11",
        email: "therealchungus@gmail.com",
        password: "lolma61"
    }
]; 

// Add users to db  
module.exports = function() {
    members.forEach(member => {
        db.user.create({
            firstName: member.firstName,
            lastName: member.lastName,
            dob: member.dob,
            email: member.email,
            password: member.password
        });
    });
};