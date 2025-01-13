const db = require('../config/dbClient');

class SessionRepository {
    async createSession(userId, sessionToken, expireAt) {
        const { data, error } = await db
            .from('session_table')
            .insert([{ user_id: userId, session_token: sessionToken, expire_at: expireAt }])
            .select();

        if (error) throw error;
        return data[0];
    }

    async verifySession(sessionToken) {
        const { data, error } = await db
            .from("session_table")
            .select("*")
            .eq("session_token", sessionToken)


        if (error) throw error;
        return data.length > 0 ? data[0] : undefined;
    }
}

module.exports = new SessionRepository();