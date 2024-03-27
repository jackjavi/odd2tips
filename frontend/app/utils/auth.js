import axios from "axios";

export const logout = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  }
};
