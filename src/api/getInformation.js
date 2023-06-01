import axios from "axios";

export const getInformation = async (topic) => {
    // Get information about the topic
    try {
        const response = await axios({
            method: 'POST',
            url: '/api/extras/getinformation',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: { topicName: topic }
        });
        return { data: response.data.result }
    } catch (error) {
        return { data: error.response.data.msg }
    }
}