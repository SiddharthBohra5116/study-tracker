import axios from "axios";

const BASE_URL = "http://localhost:8080/subjects/:subjectId/topics";

// Fetch topics for a subject
// export const getTopicsBySubject = async (subjectId) => {
//   const response = await axios.get(`${BASE_URL}/${subjectId}`);
//   return response.data;
// };

// Create a new topic
export const createTopic = async (topicData) => {
  const response = await axios.post({BASE_URL}, topicData);
  return response.data;
};

// Update a topic
export const updateTopic = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
  return response.data;
};

// Delete a topic
export const deleteTopic = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
