import API from "./axiosInstance";

/**
 * COURSES & ENROLLMENTS
 */

// Get all courses (supports pagination/filters in the future)
export const getCourses = async () => {
  const response = await API.get("/courses");
  return response.data;
};

// Get featured courses (Matches Swagger: /courses/featured)
export const getFeaturedCourses = async () => {
  const response = await API.get("/courses/featured");
  return response.data;
};

// Get in-progress courses (Progress < 100)
export const getProgress = async () => {
  const response = await API.get("/courses/in-progress");
  return response.data;
};

// Get single course by ID (Includes enrollment info if authenticated)
export const getCoursesById = async (id) => {
  const response = await API.get(`/courses/${id}`);
  return response.data; // Crucial: needed to return the data!
};

// Get all enrollments for the authenticated user (For your Sidebar)
export const getEnrollments = async () => {
  const response = await API.get("/enrollments");
  return response.data;
};

// Enroll in a new course
export const enrollInCourse = async (courseId) => {
  const response = await API.post("/enrollments", { course_id: courseId });
  return response.data;
};

/**
 * FILTERS & METADATA
 */

export const getCategories = () =>
  API.get("/categories").then((res) => res.data);

export const getTopics = (categoryId) => {
  const url = categoryId ? `/topics?category_id=${categoryId}` : "/topics";
  return API.get(url).then((res) => res.data);
};

export const getInstructors = () =>
  API.get("/instructors").then((res) => res.data);
