const generateId = require("../utils/generateId");
const mongoose = require("mongoose");
const Url = require("../models/Url")
const dotenv = require("dotenv").config();

async function createShortUrl(req,res){
    try{
        const {originalUrl} = req.body;
          if (!originalUrl) {
      return res.status(400).json({ message: "originalUrl is required" });
    }
        const nanoid = generateId();

        const newUrl = await Url.create({originalUrl, shortId:nanoid});

        const base = process.env.BASE_URL;
        const shortUrl = `${base}/${nanoid}`
    return res.status(201).json({
      message: "Short URL created successfully",
      shortUrl,
      data: newUrl,
    });
  } catch (err) {
    console.error("Error creating short URL:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function redirectUrl(req,res){
    try{
        const {shortId} = req.params;

        if(!shortId){
            return res.status(400).send("Bad Request");
        }

        const doc = await Url.findOneAndUpdate({shortId},
            {$inc : {clicks:1}},
            {new: true}
        )
        if (!doc) {
            return res.status(404).json({ message: "Short URL not found" });
        }

        return res.redirect(doc.originalUrl);
  } catch (err) {
    console.error("getUrlStats error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = {createShortUrl, redirectUrl};