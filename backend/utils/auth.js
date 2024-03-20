import axios from "axios";

export const logout = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      await axios.post(
        "http://localhost:8888/api/auth/logout",
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
