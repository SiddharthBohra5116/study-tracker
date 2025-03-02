import axios from "axios";

const BASE_URL = "http://localhost:8080/subjects"; // Updated to remove placeholder


// Fetch topics for a subject
// export const getTopicsBySubject = async (subjectId) => {
//   const response = await axios.get(`${BASE_URL}/${subjectId}`);
//   return response.data;
// };

// Create a new topic
export const createTopic = async (subjectId, topicData) => {
  const response = await axios.post(`${BASE_URL}/${subjectId}/topics`, topicData); // Fixed syntax

  return response.data;
};

// Update a topic
export const updateTopic = async (subjectId, topicId, updatedData) => {

  const response = await axios.put(`${BASE_URL}/${subjectId}/topics/${topicId}`, updatedData);
  return response.data;
};

// Delete a topic
export const deleteTopic = async (subjectId, id) => {
  const response = await axios.delete(`${BASE_URL}/${subjectId}/topics/${id}`); // Updated to include subjectId

  return response.data;
};
