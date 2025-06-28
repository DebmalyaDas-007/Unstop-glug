import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


// Setup cloudinary configuration ONCE



export const uploadOnCloudinary = async (localFilePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
    console.log(process.env.CLOUDINARY_API_SECRET);
    if (!localFilePath) return null;
    
    // Check if file exists before attempting upload
    if (!fs.existsSync(localFilePath)) {
      console.error('File does not exist:', localFilePath);
      return null;
    }
    
    try {
      const result = await cloudinary.uploader.upload(localFilePath, {
        resource_type: 'auto',
      });
      
      // Only delete if file still exists
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
      
      console.log('File uploaded:', result.secure_url);
      return result;
    } catch (error) {
      console.error('Cloudinary Upload Failed:', error);
      
      // Only delete if file exists
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
      return null;
    }
  };
