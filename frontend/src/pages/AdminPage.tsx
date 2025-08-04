import { useEffect, useState } from "react";
import axios from "axios";

type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  media_url: string;
};

const BACKEND_URL = "https://editscape-backend.onrender.com";

const AdminPage = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/portfolio`);
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("❌ Error fetching portfolio items:", error);
      setItems([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📤 Uploading:", { title, description, mediaUrl });

    try {
      const newItem = { title, description, media_url: mediaUrl };
      await axios.post(`${BACKEND_URL}/api/portfolio`, newItem);
      await fetchItems();
      setTitle("");
      setDescription("");
      setMediaUrl("");
    } catch (error) {
      console.error("❌ Error uploading item:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/portfolio/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("❌ Error deleting item:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-xl bg-white p-6 border rounded-xl shadow-md mx-auto mb-10"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border border-gray-300 p-2 rounded"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border border-gray-300 p-2 rounded"
          required
        />
        <input
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          placeholder="Cloudinary Image/Video URL"
          className="border border-gray-300 p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-900 transition"
        >
          Upload
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white border rounded-xl p-4 shadow-md">
            {item.media_url.endsWith(".mp4") ? (
              <video
                src={item.media_url}
                controls
                className="w-full h-60 object-cover rounded"
              />
            ) : (
              <img
                src={item.media_url}
                alt={item.title}
                className="w-full h-60 object-cover rounded"
              />
            )}
            <h2 className="text-lg font-semibold mt-3">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-500 mt-2 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
