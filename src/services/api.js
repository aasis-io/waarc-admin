import axios from "axios";
import toast from "react-hot-toast";
import router from "../routes/AppRoutes";

/**
 * Axios instance
 * Change baseURL when deploying
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

let isRedirecting = false; // prevent multiple login redirects

/**
 * Request interceptor
 */
api.interceptors.request.use(
  (config) => {
    const publicEndpoints = ["/login"];
    const isPublic = publicEndpoints.some((endpoint) =>
      config.url?.endsWith(endpoint)
    );

    if (isPublic) return config;

    const token = localStorage.getItem("accessToken");

    if (!token) {
      if (!isRedirecting) {
        isRedirecting = true;
        router.push("/auth/login");
        toast.error("Please login first!");
      }
      return Promise.reject(new Error("No Token"));
    }

    // attach token for protected endpoints
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/***
 * Response interceptor1
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isRedirecting) {
      isRedirecting = true;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.error("Session ended! Please login again.");
      router.push("/login");
    }

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
  const response = await api.get("/getHome");
  return response;
};

/**
 * Update Home Page Details
 * Only updates the existing default record
 * @param {FormData} data
 */
export const updateHomePageDetails = async (data) => {
  const token = localStorage.getItem("accessToken");

  const response = await api.put("/home", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
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
  const response = await api.put("/about", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

/**
 * Get About Us details
 */
export const getAboutUsDetails = async () => {
  const response = await api.get("/getAbout");
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
  const response = await api.get("/getTeam");
  return response;
};

/**
 * Get a single Team Member by ID
 * @param {number|string} id
 */
export const getTeamMember = async (id) => {
  const response = await api.get(`/team`, {
    params: { id }, // sends ?id=123
  });
  return response;
};

/**
 * Update a Team Member by ID
 * @param {number|string} id
 * @param {FormData} data
 */
export const updateTeamMember = async (id, data) => {
  const response = await api.put(`/team`, data, {
    params: { id }, // sends ?id=123
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

/**
 * Delete a Team Member by ID
 * @param {number|string} id
 */
export const deleteTeamMember = async (id) => {
  const response = await api.delete(`/team`, {
    params: { id }, // sends ?id=123
  });
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
  const response = await api.post("/journal", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

/**
 * Get all Journals
 */
export const getJournals = async () => {
  const response = await api.get("/getJournals");
  return response;
};

/**
 * Get a single Journal by ID
 * @param {string} id
 */
export const getJournalById = async (id) => {
  const response = await api.get(`/journal/${id}`);
  return response;
};

/**
 * Update a Journal by ID
 * @param {string} id
 * @param {FormData} data
 */
export const updateJournal = async (id, data) => {
  const response = await api.put(`/journal/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

/**
 * Delete a Journal by ID
 * @param {string} id
 */
export const deleteJournal = async (id) => {
  const response = await api.delete(`/journal/${id}`);
  return response;
};
/* ------------------------------------------------------------------
   SETTINGS APIs
------------------------------------------------------------------- */

/**
 * Get site settings
 */
export const getSettings = async () => {
  const response = await api.get("/getSiteSettings");
  return response;
};

/**
 * Update site settings
 * @param {object} data - settings fields (JSON)
 */
export const updateSettings = async (data) => {
  const response = await api.put("/siteSettings", data, {
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
  const response = await api.post("/link", data);
  return response;
};

/**
 * Get all Useful Links
 */
export const getUsefulLinks = async () => {
  const response = await api.get("/getLink");
  return response.data;
};

/**
 * Get single Useful Link by ID
 */
export const getUsefulLinkById = async (id) => {
  const response = await api.get(`/link`, {
    params: { id },
  });
  return response;
};

/**
 * Update Useful Link by ID
 * @param {string} id
 * @param {object} data
 */
export const updateUsefulLink = async (id, data) => {
  const response = await api.put(`/link`, data, {
    params: { id }, // sends ?id=123
  });
  return response;
};

/**
 * Delete Useful Link by ID
 * @param {string} id
 */
export const deleteUsefulLink = async (id) => {
  const response = await api.delete(`/link`, {
    params: { id },
  });
  return response;
};

/**
 * Add Event
 * @param {FormData} data
 */
export const addEvent = async (data) => {
  const response = await api.post("/event", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

/**
 * Delete Event
 */
export const deleteEvent = async (id) => {
  const response = await api.delete(`/event`);
  return response;
};

/**
 * Get Event
 */
export const getEvent = async () => {
  const response = await api.get("/getEvent");
  return response;
};

export default api;
