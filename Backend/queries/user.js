import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new user
export const createUser = async (username, flagged = false) => {
    try {
        return await prisma.user.create({
            data: {
                username,
                flagged,
            },
        });
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Unable to create user. Please try again later.");
    }
};

// Get a user by ID
export const getUserbyId = async (id) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }

        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw new Error("Unable to fetch user. Please try again later.");
    }
};

// Get all users
export const getAllUsers = async () => {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw new Error("Unable to fetch users. Please try again later.");
    }
};

// Get a user by their username
export const getUserByUsername = async (username) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            throw new Error(`User with username ${username} not found`);
        }

        return user;
    } catch (error) {
        console.error("Error fetching user by username:", error);
        throw new Error("Unable to fetch user. Please try again later.");
    }
};

// Update a user's flagged status
export const updateUserFlagged = async (id, flagged) => {
    try {
        return await prisma.user.update({
            where: { id },
            data: { flagged },
        });
    } catch (error) {
        console.error("Error updating user flagged status:", error);
        throw new Error("Unable to update flagged status. Please try again later.");
    }
};

// Delete a user
export const deleteUser = async (id) => {
    try {
        return await prisma.user.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Unable to delete user. Please try again later.");
    }
};
