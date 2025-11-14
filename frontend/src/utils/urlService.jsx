import api from "../services/api";

export const createShortUrl = async (originalUrl) => {
  // backend route is POST /api/url
  const res = await api.post("/api/url", { originalUrl });
  return res.data; // backend returns { message, shortUrl, data }
};