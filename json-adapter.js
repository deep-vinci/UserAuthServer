const fs = require('fs').promises; // Use the promise-based version of fs
const path = './user-tok.json';

// Read the JSON file
const read = async () => {
    try {
        const data = await fs.readFile(path, 'utf8'); // Read file
        const userTok = JSON.parse(data); // Parse JSON data
        return userTok; // Return the parsed data
    } catch (err) {
        console.error('Error reading file:', err);
        throw err; // Re-throw the error for handling elsewhere
    }
};

// Add a new user to the JSON file
const create = async (userName, userToken) => {
    try {
        const data = await fs.readFile(path, 'utf8'); // Read file
        const userTok = JSON.parse(data); // Parse JSON data

        userTok.push({ userName, userToken }); // Add new user

        // Write the updated data back to the file
        await fs.writeFile(path, JSON.stringify(userTok, null, 2), 'utf8');
        console.log('User added successfully');
    } catch (err) {
        console.error('Error:', err);
        throw err; // Re-throw the error for handling elsewhere
    }
};

// Export the functions
module.exports = {
    read,
    create,
};