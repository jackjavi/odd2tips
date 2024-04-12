import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateRoom: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    privacy: "public",
    adminId: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/auth/checkAuth", {
          withCredentials: true,
        });
        if (data.isAuthenticated) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            adminId: data.user.userId,
          }));
        } else {
          setError("You must be logged in to create a room.");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setError(
          "An error occurred while checking authentication, you must be logged in to create a room."
        );
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // Ensure adminId is not empty before attempting to create a room
    if (!formData.adminId) {
      setError("Authentication required to create a room.");
      setSubmitting(false);
      return;
    }

    try {
      await axios.post("/api/rooms/create", formData, {
        withCredentials: true,
      });
      alert("Room created successfully!");
      // Optionally, reset form or redirect user
    } catch (err) {
      setError("Failed to create room. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create a New Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="privacy" className="block mb-2">
            Privacy
          </label>
          <select
            id="privacy"
            name="privacy"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.privacy}
            onChange={handleInputChange}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Room"}
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
