const { getUserByUsername, createUser } = require("../queries/user");

// Function to add a user if they do not already exist in the database
async function addUserIfNotExists(username) {
    try {
            return await getUserByUsername(username);
        } catch (error) {
            console.warn("Streamer not found, creating new one...");
            try {
                return await createUser(username);
            } catch (createError) {
                console.error("Failed to create streamer:", createError);
                return null;
            }
        }
}

module.exports = { addUserIfNotExists };
