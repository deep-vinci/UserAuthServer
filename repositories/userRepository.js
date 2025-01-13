const db = require('../config/dbClient');


class UserRepository {
    
    async findUserByEmail(email) {
        const { data, error } = await db
            .from('users')
            .select('*')
            .eq('email', email);

        if (error) throw error;
        return data.length > 0 ? data[0] : null;
    }

    async createUser(email, securePassword) {
        const { data, error } = await db
            .from('users')
            .insert([{ email: email, password: securePassword }])
            .select();

        if (error) throw error;
        return data[0];
    }
}

module.exports = new UserRepository();
// new UserRepository().doesEmailExistInDb("b@example.com").then(data => {
//     console.log(data);
    // if(data) {
    //     console.log(11)
    // } else {
    //     console.log(22)
    // }
// })