import React, { useState } from "react";
import Logo from "../components/Logo";
import { auth } from "../firebase";

const ClientDashboard = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    budget: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in to post a job.");
      const idToken = await user.getIdToken();
      const res = await fetch("http://localhost:4000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          ...form,
          budget: Number(form.budget),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Job posted successfully!");
        setForm({
          title: "",
          description: "",
          location: "",
          category: "",
          budget: "",
          deadline: "",
        });
      } else {
        setMessage(data.error || "Failed to post job.");
      }
    } catch (err) {
      setMessage(err.message || "Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Logo />
      <h1 className="text-3xl font-bold mt-8 mb-4">Welcome, Client!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Post jobs, manage your projects, and connect with skilled artisans.
      </p>
      <form
        className="w-full max-w-md bg-white p-6 rounded shadow"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4">Post a Job</h2>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          name="budget"
          value={form.budget}
          onChange={handleChange}
          placeholder="Budget"
          type="number"
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          placeholder="Deadline (YYYY-MM-DD)"
          type="date"
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
        {message && (
          <div className="mt-2 text-center text-sm text-red-600">{message}</div>
        )}
      </form>
    </div>
  );
};

export default ClientDashboard;
