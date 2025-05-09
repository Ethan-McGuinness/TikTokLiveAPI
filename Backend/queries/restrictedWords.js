import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//create a new restricted word
export const createWord = async (word) => {
    try {
        return await prisma.restrictedWords.create({
            data: {
                word,
            },
        });
    } catch (error) {
        console.error("Error creating restriced word:", error);
        throw new Error("Unable to create restricted word. Please try again later.");
    }
};

//delete a restricted word
export const deleteWord = async (id) => {
    try{
        return await prisma.restrictedWords.delete({
            where: {
                restrictedWord_id: parseInt(id, 10),
            },
        });
    } catch (error) {
        console.error("Error deleting restricted word:", error);
        throw new Error("Unable to delete restricted word. Please try again later");
    }
};

//get all restricted words
export const getAllWords = async () => {
    try {
        return await prisma.restrictedWords.findMany();
    } catch (error) {
        console.error("Error Retrieving restricted words:", error);
        throw new error("unable to retrieve Restricted Words. Please try again later");
    }
};

//get a restricted word by id
export const getWordById = async (id) => {
    try {
        return await prisma.restrictedWords.findUnique({
            where: {
                restrictedWord_id: id,
            },
        });
    } catch (error) {
        console.error("Error retrieving restrcited word by Id", error);
        throw new error("Unable to retrieve restricted word by Id. Please try again later");
    }
};

//get a restricted word by word
export const getWordByWord = async (word) => {
    try{
        return await prisma.restrictedWords.findUnique({
            where: {
                word: word,
            },
        });
    } catch (error) {
        console.error("Error retrieving restricted word by word:", error);
        throw new error("Unable to retrieve restricted word by word. Please try again later");
    }
};