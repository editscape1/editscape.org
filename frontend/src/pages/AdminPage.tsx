import { useEffect, useState } from "react";
import axios from "axios";

type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  media_url: string;
};

const AdminPage = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  // Fetch all portfolio items
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/portfolio");
      const data = Array.isArray(res.data) ? res.data : res.data.portfolio || [];
      setItems(data);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
      setItems([]);
    }
  };

  // Submit a new item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newItem = { title, description, media_url: mediaUrl };
      await axios.post("/api/portfolio", newItem);
      await fetchItems(); // Refresh the list
      setTitle("");
      setDescription("");
      setMediaUrl("");
    } catch (error) {
      console.error("Error uploading item:", error);
    }
  };

  // Delete an item
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/portfolio/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 w-full"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 w-full"
          required
        />
        <input
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          placeholder="Cloudinary Image/Video URL"
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-black text-white px-4 py-2">
          Upload
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.isArray(items) &&
          items.map((item) => (
            <div key={item.id} className="border p-4">
              {item.media_url.includes(".mp4") ? (
                <video src={item.media_url} controls className="w-full h-auto" />
              ) : (
                <img
                  src={item.media_url}
                  alt={item.title}
                  className="w-full h-auto"
                />
              )}
              <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
              <p>{item.description}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 mt-2"
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
