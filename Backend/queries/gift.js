import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new gift
export const createGift = async (user_id, streamer_id, giftType_id, timestamp) => {
    try {
        return await prisma.gift.create({
            data: {
                user_id,
                streamer_id,
                giftType_id,
                timestamp,
            },
        });
    } catch (error) {
        throw new Error(`Failed to create gift: ${error.message}`);
    }
};

// Get a gift by ID
export const getGiftById = async (id) => {
    try {
        return await prisma.gift.findUnique({
            where: { id },
        });
    } catch (error) {
        throw new Error(`Failed to get gift by ID: ${error.message}`);
    }
};

// Get all gifts for a specific user
export const getAllGiftsForUser = async (user_id) => {
    try {
        return await prisma.gift.findMany({
            where: { user_id },
        });
    } catch (error) {
        throw new Error(`Failed to get all gifts for user: ${error.message}`);
    }
};

// Get all gifts for a specific streamer
export const getAllGiftsForStreamer = async (streamer_id) => {
    try {
        return await prisma.gift.findMany({
            where: { streamer_id },
        });
    } catch (error) {
        throw new Error(`Failed to get all gifts for streamer: ${error.message}`);
    }
};

// Get all gifts of a specific type
export const getAllGiftsByType = async (giftType_id) => {
    try {
        return await prisma.gift.findMany({
            where: { giftType_id },
        });
    } catch (error) {
        throw new Error(`Failed to get all gifts by type: ${error.message}`);
    }
};

// Delete a gift
export const deleteGift = async (id) => {
    try {
        return await prisma.gift.delete({
            where: { id },
        });
    } catch (error) {
        throw new Error(`Failed to delete gift: ${error.message}`);
    }
};
