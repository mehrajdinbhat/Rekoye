import React, { useState, useEffect } from "react";
import axios from "axios";

function Queries() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all messages
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4001/api/contact");
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Failed to fetch messages!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete query handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this query?")) return;

    try {
      await axios.delete(`http://localhost:4001/api/contact/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
      alert("Query deleted successfully!");
    } catch (error) {
      console.error("Error deleting query:", error);
      alert("Failed to delete query!");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Admin Messages Panel
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading messages...</p>
      ) : contacts.length === 0 ? (
        <p className="text-center text-gray-600">No messages found.</p>
      ) : (
        <>
          {/* Desktop / large screens table */}
          <div className="hidden md:block mt-6 bg-white shadow rounded-lg p-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Message</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-100">
                    <td className="p-2 border">{contact.name}</td>
                    <td className="p-2 border">{contact.email}</td>
                    <td className="p-2 border">{contact.message}</td>
                    <td className="p-2 border">
                      {new Date(contact.createdAt).toLocaleString()}
                    </td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view: card layout */}
          <div className="md:hidden mt-6 space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white shadow rounded-lg p-4 space-y-2"
              >
                <p>
                  <span className="font-semibold">Name:</span> {contact.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {contact.email}
                </p>
                <p>
                  <span className="font-semibold">Message:</span>{" "}
                  {contact.message}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(contact.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md w-full mt-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Queries;
