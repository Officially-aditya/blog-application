const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI); // Temporary debug line


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:",err));

const app = express();

// Correct CORS Configuration
const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));  // Apply CORS to all routes

app.use(express.json());  // Enable JSON parsing



// Import blog routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blogs', blogRoutes);  // This applies the routes correctly

// Start Server
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
