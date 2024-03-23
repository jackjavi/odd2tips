import axios from "axios";

export const logout = async () => {
  const token = localStorage.getItem("token");
  const BASE_URL = `https://odd2tips.onrender.com/api/`;

  if (token) {
    try {
      await axios.post(
        `${BASE_URL}auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    }

    localStorage.removeItem("token");

    window.location.href = "/login";
  }
};
