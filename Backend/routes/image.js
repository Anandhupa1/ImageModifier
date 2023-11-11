const ImageModel = require("../models/image.model");
require("dotenv").config();
const imageRouter = require("express").Router();
const upload = require('../config/multer.config'); 
const { authenticateUser } = require("../middlewares/authenticate.middleware");
const fs = require('fs');


imageRouter.get("/",async(req,res)=>{
    try {
        res.send("Image router")
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"somthing went wrong, please try again later",error})
    }
})
// Route to upload an image
imageRouter.post("/upload", authenticateUser, upload.single('image'), async (req, res) => {
    try {
        console.log(req.file.path)
        const imagePath = req.file.path; // Relative path from 'uploads', e.g., 'myimage.jpg'
        const imageUrl = `${process.env.SERVER_DEPLOYED_URL}/${imagePath}`; // Construct the full URL
        console.log(imageUrl)
        const newImage = new ImageModel({
            imageUrl ,
            path: req.file.path,
            userId: req.user._id
        });
        await newImage.save();
        res.status(201).json({ message: 'Image uploaded successfully', path: req.file.path, data:newImage });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error uploading image", error });
    }
});

// Route to get images for a specific user
imageRouter.get("/my-images", authenticateUser, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Current page number, default is 1
        const limit = parseInt(req.query.limit) || 10; // Number of items per page, default is 10
        const skip = (page - 1) * limit; // Number of documents to skip

        // Assuming your ImageModel has a 'createdAt' field
        // If not, you can sort by '_id' as well
        const userImages = await ImageModel.find({ userId: req.user._id })
                                           .sort({ createdAt: -1 }) // Sort by createdAt in descending order
                                           .skip(skip)
                                           .limit(limit);

        // Optional: Total number of documents for pagination metadata
        const totalImages = await ImageModel.countDocuments({ userId: req.user._id });

        res.status(200).json({
            userImages,
            currentPage: page,
            totalPages: Math.ceil(totalImages / limit),
            totalImages
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching images", error });
    }
});


imageRouter.get("/:imageId", authenticateUser, async (req, res) => {
    try {
      
        const image = await ImageModel.findById(req.params.imageId);
        if (req.user._id !==image.userId.toString()) {
            return res.status(401).json({ message: "You are only allowed to view images uploaded by yourself." });
        }
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }
        res.status(200).json({data:image});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching image", error });
    }
});


imageRouter.delete("/delete/:imageId", authenticateUser, async (req, res) => {
    try {
        const image = await ImageModel.findById(req.params.imageId);

        // Check if the image exists
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        // Check if the authenticated user is the one who uploaded the image
        console.log(req.user._id)
        console.log(image.userId.toString())
        if (req.user._id !==image.userId.toString()) {
            return res.status(401).json({ message: "You are not authorized to delete this image." });
        }

        // Delete image file from server storage
        const filePath = image.path;
        fs.unlink(filePath, err => {
            if (err) {
                return res.status(500).json({ message: "Error deleting the image file", error: err });
            }
        });

        // Delete image record from MongoDB
        await ImageModel.findByIdAndRemove(req.params.imageId);

        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting image", error });
    }
});











module.exports={imageRouter}