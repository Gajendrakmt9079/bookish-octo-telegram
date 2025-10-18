import cloudinary from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: "dgomh6r4g",
  api_key: "786265788274275",
  api_secret: "IkuZKei4n2J0Wd0iZYMqUjs4Yag", // Be cautious with hardcoding secrets in production!
});

const cloudinaryUploader = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Error uploading file:", error); // Log the error for debugging
    fs.unlinkSync(localFilePath); // Clean up the file if upload fails
    return null; // Return null or handle the error as needed
  }
};

export default cloudinaryUploader;
