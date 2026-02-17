import axios from "axios";

/**
 * Axios instance
 * Change baseURL when deploying
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

/**
 * Global response handling (optional but recommended)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response || error);
    return Promise.reject(error);
  }
);

/* ------------------------------------------------------------------
   HOME PAGE API (single default record)
------------------------------------------------------------------- */

/**
 * Get Home Page Details (single default record)
 */
export const getHomePageDetails = async () => {
  const response = await api.get("/homepage/default");
  return response;
};

/**
 * Update Home Page Details
 * Only updates the existing default record
 * @param {FormData} data
 */
export const updateHomePageDetails = async (data) => {
  const response = await api.put("/homepage/default", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

/* ------------------------------------------------------------------
   ABOUT US APIs
------------------------------------------------------------------- */

/**
 * Update About Us page (singleton)
 * @param {FormData} data
 */
export const updateAboutUsDetails = async (data) => {
  const response = await api.post("/about-us", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

/**
 * Get About Us details
 */
export const getAboutUsDetails = async () => {
  const response = await api.get("/about-us");
  return response;
};
/* ------------------------------------------------------------------
   TEAM MEMBER APIs
------------------------------------------------------------------- */

/**
 * Add a new Team Member
 * @param {FormData} data - includes image, name, position, location
 */
export const addTeamMember = async (data) => {
  const response = await api.post("/team", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

/**
 * Get all Team Members
 */
export const getTeamMembers = async () => {
  const response = await api.get("/team");
  return response;
};

/**
 * Update a Team Member by ID
 * @param {string} id
 * @param {FormData} data
 */
export const updateTeamMember = async (id, data) => {
  const response = await api.put(`/team/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

/**
 * Delete a Team Member by ID
 * @param {string} id
 */
export const deleteTeamMember = async (id) => {
  const response = await api.delete(`/team/${id}`);
  return response;
};
/* ------------------------------------------------------------------
   JOURNAL APIs
------------------------------------------------------------------- */

/**
 * Add a new Journal
 * @param {FormData} data - includes title, authors, category, publishedDate, image, pdf
 */
export const addJournal = async (data) => {
  const response = await api.post("/journals", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

/**
 * Get all Journals
 */
export const getJournals = async () => {
  const response = await api.get("/journals");
  return response;
};

/**
 * Get a single Journal by ID
 * @param {string} id
 */
export const getJournalById = async (id) => {
  const response = await api.get(`/journals/${id}`);
  return response;
};

/**
 * Update a Journal by ID
 * @param {string} id
 * @param {FormData} data
 */
export const updateJournal = async (id, data) => {
  const response = await api.put(`/journals/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

/**
 * Delete a Journal by ID
 * @param {string} id
 */
export const deleteJournal = async (id) => {
  const response = await api.delete(`/journals/${id}`);
  return response;
};
/* ------------------------------------------------------------------
   SETTINGS APIs
------------------------------------------------------------------- */

/**
 * Get site settings
 */
export const getSettings = async () => {
  const response = await api.get("/settings");
  return response;
};

/**
 * Update site settings
 * @param {object} data - settings fields (JSON)
 */
export const updateSettings = async (data) => {
  const response = await api.put("/settings", data, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

/* ------------------------------------------------------------------
   EXPORT AXIOS INSTANCE (optional)
------------------------------------------------------------------- */

// Delete registered mail by ID
export const deleteRegisteredMail = async (id) => {
  try {
    const response = await api.delete(`/registered-mails/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting registered mail:", error);
    throw error;
  }
};

// Optional: fetch all registered mails
export const getRegisteredMails = async () => {
  try {
    const response = await api.get("/registered-mails");
    return response.data;
  } catch (error) {
    console.error("Error fetching registered mails:", error);
    throw error;
  }
};

/* ------------------------------------------------------------------
   USEFUL LINKS APIs
------------------------------------------------------------------- */

/**
 * Add a new Useful Link
 * @param {object} data - { title, link }
 */
export const addUsefulLink = async (data) => {
  const response = await api.post("/useful-links", data);
  return response;
};

/**
 * Get all Useful Links
 */
export const getUsefulLinks = async () => {
  const response = await api.get("/useful-links");
  return response.data;
};

/**
 * Get single Useful Link by ID
 */
export const getUsefulLinkById = async (id) => {
  const response = await api.get(`/useful-links/${id}`);
  return response.data;
};

/**
 * Update Useful Link by ID
 * @param {string} id
 * @param {object} data
 */
export const updateUsefulLink = async (id, data) => {
  const response = await api.put(`/useful-links/${id}`, data);
  return response;
};

/**
 * Delete Useful Link by ID
 * @param {string} id
 */
export const deleteUsefulLink = async (id) => {
  const response = await api.delete(`/useful-links/${id}`);
  return response;
};

export default api;
