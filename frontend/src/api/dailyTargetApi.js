import axios from "axios";

const BASE_URL = "http://localhost:8080/dailytargets";

// Fetch all Targets
export const getTargets = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching targets:", error);
        return []; // Return empty array to prevent crashes
    }
};

// Create a new Target
export const createDailyTarget = async (targetData) => {
    try {
        const response = await axios.post(BASE_URL, targetData);
        return response.data;
    } catch (error) {
        console.error("Error creating target:", error);
        return null; // Return null in case of failure
    }
};

// Update a Target
export const updateTarget = async (id, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating target:", error);
        return null;
    }
};

// Delete a Target
export const deleteTarget = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting target:", error);
        return null;
    }
};
0