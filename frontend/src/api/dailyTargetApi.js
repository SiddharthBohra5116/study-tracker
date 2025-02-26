import axios from "axios";

const BASE_URL = "http://localhost:8080/dailyTargets";

// Fetch all daily targets
export const getDailyTargets = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Create a new daily target
export const createDailyTarget = async (targetData) => {
  const response = await axios.post(BASE_URL, targetData);
  return response.data;
};

// Update a daily target
export const updateDailyTarget = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
  return response.data;
};

// Delete a daily target
export const deleteDailyTarget = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
