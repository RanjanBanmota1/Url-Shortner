import React, { useState } from 'react'
import { createShortUrl } from '../utils/urlService';


const UrlForm = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const [formData, setFormData] = useState({
    originalUrl:"",
  })

  const handleChange = (e)=>{
    const {name, value} = e.target;

    setFormData((prev)=>({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e)=>{
    e.preventDefault(); 
    
    setError("");
    setShortUrl("");
    
    if (loading) return; 

    if (!formData.originalUrl) return setError("Please enter a URL");
    
    setLoading(true);
    try{
      const data = await createShortUrl(formData.originalUrl);
      setShortUrl(data.shortUrl);
      setFormData({ originalUrl: "" }); 
    }catch (err) {
      console.error(err);
      setError("Failed to create short URL. Please check the link and try again.");
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <input 
          type="url"
          name='originalUrl'
          placeholder='enter your long url' 
          value={formData.originalUrl}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          disabled={loading}
        />

        <button 
          type="submit" 
          disabled={loading} 
          className='border-2 m-1.5 p-2 bg-blue-500 text-white rounded disabled:bg-gray-400'
        >
          {loading ? "Processing..." : "Convert Into Short Url"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          **Error:** {error}
        </div>
      )}

      {shortUrl && (
        <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500">
          <p className="font-semibold text-green-700 mb-1">✅ Short URL Created:</p>
          <a 
            href={shortUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 underline break-words"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  )
}

export default UrlForm