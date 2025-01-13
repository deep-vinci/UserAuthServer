const db = require('../config/dbClient');


class UserRepository {
    
    async doesEmailExistInDb(email) {
        const { data, error } = await db
            .from('users')
            .select('*')
            .eq('email', email);

        if (error) throw error;

        return data.length > 0 ? data[0] : null;
    }
}

module.exports = new UserRepository();