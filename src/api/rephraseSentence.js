import axios from "axios";

export const rephraseSentence = async (sentence) => {
    // Rephrase the sentence
    try {
        const response = await axios({
            method: 'POST',
            url: '/api/extras/rephrasesentence',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: { sentence }
        });
        return { data: response.data.result }
    } catch (error) {
        return { data: error.response.data.msg }
    }
}