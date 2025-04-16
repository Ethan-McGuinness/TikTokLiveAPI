import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new streamer
export const createStreamer = async (username) => {
    try {
        return await prisma.streamer.create({
            data: {
                username,
            },
        });
    } catch (error) {
        console.error("Error creating streamer:", error);
        throw new Error("Unable to create streamer. Please try again later.");
    }
};

// Get a streamer by ID
export const getStreamerById = async (id) => {
    try {
        const streamer = await prisma.streamer.findUnique({
            where: { id },
        });

        if (!streamer) {
            throw new Error(`Streamer with ID ${id} not found`);
        }

        return streamer;
    } catch (error) {
        console.error("Error fetching streamer by ID:", error);
        throw new Error("Unable to fetch streamer. Please try again later.");
    }
};

// Get a streamer by their username
export const getStreamerByUsername = async (username) => {
    try {
        const streamer = await prisma.streamer.findUnique({
            where: { username },
        });

        if (!streamer) {
            throw new Error(`Streamer with username ${username} not found`);
        }

        return streamer;
    } catch (error) {
        console.error("Error fetching streamer by username:", error);
        throw new Error("Unable to fetch streamer. Please try again later.");
    }
};

// Get all streamers
export const getAllStreamers = async () => {
    try {
        return await prisma.streamer.findMany();
    } catch (error) {
        console.error("Error fetching all streamers:", error);
        throw new Error("Unable to fetch streamers. Please try again later.");
    }
};

// Delete a streamer
export const deleteStreamer = async (id) => {
    try {
        return await prisma.streamer.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Error deleting streamer:", error);
        throw new Error("Unable to delete streamer. Please try again later.");
    }
};
