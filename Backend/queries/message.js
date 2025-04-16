import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new message
export const createMessage = async (userId, streamerId, content) => {
    try {
        return await prisma.message.create({
            data: {
                userId,
                streamerId,
                content,
                timestamp: new Date(), 
            },
        });
    } catch (error) {
        console.error("Error creating message:", error);
        throw new Error("Unable to create message. Please try again later.");
    }
};

// Get a message by ID
export const getMessageById = async (id) => {
    try {
        const message = await prisma.message.findUnique({
            where: { id },
        });

        if (!message) {
            throw new Error(`Message with ID ${id} not found`);
        }

        return message;
    } catch (error) {
        console.error("Error fetching message by ID:", error);
        throw new Error("Unable to fetch message. Please try again later.");
    }
};

// Get all messages for a streamer
export const getMessagesForStreamer = async (streamerId) => {
    try {
        return await prisma.message.findMany({
            where: { streamerId },
            orderBy: { timestamp: 'desc' }, 
        });
    } catch (error) {
        console.error("Error fetching messages for streamer:", error);
        throw new Error("Unable to fetch messages for streamer. Please try again later.");
    }
};

// Get all messages from a specific user
export const getMessagesByUser = async (userId) => {
    try {
        return await prisma.message.findMany({
            where: { userId },
            orderBy: { timestamp: 'desc' }, 
        });
    } catch (error) {
        console.error("Error fetching messages by user:", error);
        throw new Error("Unable to fetch messages by user. Please try again later.");
    }
};

// Delete a message
export const deleteMessage = async (id) => {
    try {
        return await prisma.message.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Error deleting message:", error);
        throw new Error("Unable to delete message. Please try again later.");
    }
};
