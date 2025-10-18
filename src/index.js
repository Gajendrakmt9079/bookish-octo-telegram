import { app } from './app.js'; // Ensure the correct extension
import connectDB from './db/index.js';

// Load environment variables using dynamic import
import('dotenv').then((dotenv) => {
  dotenv.config();

  connectDB()
    .then(() => {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
      });
    })
    .catch((error) => {
      console.error(`MongoDB connection failed: ${error}`);
    });
});

