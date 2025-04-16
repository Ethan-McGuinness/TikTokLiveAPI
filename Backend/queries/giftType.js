import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new gift type
export const createGiftType = async (name, value) => {
    try {
        return await prisma.giftType.create({
            data: {
                name,
                value,
            },
        });
    } catch (error) {
        throw new Error(`Failed to create gift type: ${error.message}`);
    }
};

// Get a gift type by ID
export const getGiftTypeById = async (id) => {
    try {
        return await prisma.giftType.findUnique({
            where: { id },
        });
    } catch (error) {
        throw new Error(`Failed to get gift type by ID: ${error.message}`);
    }
};

// Get all gift types
export const getAllGiftTypes = async () => {
    try {
        return await prisma.giftType.findMany();
    } catch (error) {
        throw new Error(`Failed to get all gift types: ${error.message}`);
    }
};

// Update a gift type
export const updateGiftType = async (id, name, value) => {
    try {
        return await prisma.giftType.update({
            where: { id },
            data: {
                name,
                value,
            },
        });
    } catch (error) {
        throw new Error(`Failed to update gift type: ${error.message}`);
    }
};

// Delete a gift type
export const deleteGiftType = async (id) => {
    try {
        return await prisma.giftType.delete({
            where: { id },
        });
    } catch (error) {
        throw new Error(`Failed to delete gift type: ${error.message}`);
    }
};
