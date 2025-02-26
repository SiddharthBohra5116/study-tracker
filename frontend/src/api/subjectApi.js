import axios from "axios";

const BASE_URL = "http://localhost:8080/subjects";

// Fetch all subjects
export const getSubjects = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Fetch a single subject by ID
export const getSubjectById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Create a new subject
export const createSubject = async (subjectData) => {
  const response = await axios.post(BASE_URL, subjectData);
  return response.data;
};

// Update a subject
export const updateSubject = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
  return response.data;
};

// Delete a subject
export const deleteSubject = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
