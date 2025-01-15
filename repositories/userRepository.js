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

    async createUser(authID, email, securePassword, authProvider, profilePictureUrl) {
        const { data, error } = await db
            .from('users')
            .insert([{ auth_id: authID, email: email, password: securePassword, auth_provider: authProvider, profile_picture_url: profilePictureUrl }])
            .select();

        if (error) throw error;
        return data[0];
    }
}

module.exports = new UserRepository();
