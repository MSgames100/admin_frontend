import { toast } from "@/hooks/use-toast";

// API base URL - change this to your actual API URL
const API_URL = import.meta.env.VITE_APP_BASE_URL;

// Default headers for JSON requests
const defaultHeaders = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
};

// Helper to add auth token to requests
const getAuthHeader = () => {
  const auth = JSON.parse(localStorage.getItem("msGamesAuth") || "{}");
  return auth.token ? { Authorization: `Bearer ${auth.token}` } : {};
};

// Generic API request handler
const apiRequest = async (endpoint, method = "GET", data = null) => {
  try {
    const headers = {
      ...defaultHeaders,
      ...getAuthHeader(),
    };

    const config = {
      method,
      headers,
    };

    if (data && (method === "POST" || method === "PUT")) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const result = await response.json();

    return result;
  } catch (error) {
    toast({
      variant: "destructive",
      title: "API Error",
      description: error.message || "An error occurred during API request",
    });
    return null; // ✅ Also return null on unexpected error
  }
};

// Auth endpoints
export const authApi = {
  login: (email, password) =>
    apiRequest("/auth/login", "POST", { email, password }),
  register: (userData) => apiRequest("/auth/register", "POST", userData),
};

// Simulations endpoints
export const simulationsApi = {
  getAll: () => apiRequest("/simulations/"),
  getOne: (id) => apiRequest(`/simulations/${id}`),
  create: (data) => apiRequest("/simulations/", "POST", data),
  update: (id, data) => apiRequest(`/simulations/${id}`, "PUT", data),
  delete: (id) => apiRequest(`/simulations/${id}`, "DELETE"),
};

// Institutes endpoints
export const institutesApi = {
  getAll: () => apiRequest("/institutes/"),
  getOne: (id) => apiRequest(`/institutes/${id}`),
  create: (data) => apiRequest("/institutes/", "POST", data),
  update: (id, data) => apiRequest(`/institutes/${id}`, "PUT", data),
  delete: (id) => apiRequest(`/institutes/${id}`, "DELETE"),
};

// Subscriptions endpoints
export const subscriptionsApi = {
  getAll: () => apiRequest("/subscriptions/"),
  getOne: (id) => apiRequest(`/subscriptions/${id}`),
  getSubscriptionByInstitute: (instituteId) =>
    apiRequest(`/subscriptions/institute/${instituteId}`),
  create: (data) => apiRequest("/subscriptions/", "POST", data),
  update: (id, data) => apiRequest(`/subscriptions/${id}`, "PUT", data),
  delete: (id) => apiRequest(`/subscriptions/${id}`, "DELETE"),
};

// Rate versions endpoints
export const rateVersionsApi = {
  getAll: (simulationId) =>
    apiRequest(`/rate-versions/simulation/${simulationId}`),
  getLatest: (simulationId) =>
    apiRequest(`/rate-versions/latest/${simulationId}`),
  create: (data) => apiRequest("/rate-versions/", "POST", data),
  update: (id, data) => apiRequest(`/rate-versions/${id}`, "PUT", data),
  delete: (id) => apiRequest(`/rate-versions/${id}`, "DELETE"),
};

// Professors endpoints
export const professorsApi = {
  getAll: () => apiRequest(`/professors`),
  getOne: (id) => apiRequest(`/professors/${id}`),
  create: (data) => apiRequest("/professors/", "POST", data),
  update: (id, data) => apiRequest(`/professors/${id}`, "PUT", data),
  delete: (id) => apiRequest(`/professors/${id}`, "DELETE"),
};
