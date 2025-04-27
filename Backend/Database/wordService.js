const {getWordByWord, getAllWords } = require('../queries/restrictedWords');

async function checkForRestrictedWord(chat){
    try{
        restrictedWords = await getAllWords();

        const normalizedChat = String(chat).toLowerCase();
        for (const word of restrictedWords){
            if(normalizedChat.includes(word.word.toLowerCase())){
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error("Error checking for restricted words:", error);
        throw new Error("Unable to check for restricted words. Please try again later.");
    }

}

module.exports = { checkForRestrictedWord };