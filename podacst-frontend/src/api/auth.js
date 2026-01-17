import { api, API_URL } from "./client";

export const authApi = {
  login: async (email, password) => {
    const formData = new URLSearchParams();
    formData.append("username", email); // Must be 'username' for FastAPI OAuth2
    formData.append("password", password);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: formData, // do NOT JSON.stringify
      // do NOT set Content-Type, fetch sets it automatically
    });

    if (!response.ok) {
      let error = "Login failed";
      try {
        const errJson = await response.json();
        error = errJson.detail || error;
      } catch {}
      throw new Error(error);
    }

    const data = await response.json();

    // Save token for future requests
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("token_type", data.token_type || "bearer");

    return data;
  },

  register: (data) => api.post("/auth/register", data),
};
