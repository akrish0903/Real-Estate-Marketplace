// Load environment variables
require('dotenv').config();

const http = require("http")
const express = require('express');
const cors = require('cors');
const httpErrors = require("http-errors");
const authRoutes = require("./Routes/authUser");
const userProperties = require("./Routes/userProperties");
const scheduleRoutes = require("./Routes/scheduleRoutes");
const questionRoutes = require("./Routes/questionRoutes")
const reviewRoutes = require('./Routes/reviewRoutes');
const MongoDBConnector = require("./db/MongoDBConnector");
require("./utils/init_redis");
const chartRoutes = require("./Routes/chartRoutes");
const chatRoutes = require('./Routes/chatRoutes');
const socketService = require('./services/socket');
const propertyBidsRouter = require('./Routes/propertyBids');
const aiRouter = require('./Routes/ai');
const meetingRoutes = require('./Routes/meetingRoutes');

const app = express();
const server = http.createServer(app);

// connection to mongo db 
MongoDBConnector();
// cors setting 
// Enable CORS for all routes
app.use(cors({
    origin: ['https://real-estate-marketplace-1-ojvt.onrender.com', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true // If you're using cookies/sessions
}));
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize socket.io
socketService.init(server);

// main server 
app.use(authRoutes);
app.use(userProperties);
app.use(scheduleRoutes);
app.use(questionRoutes);
app.use("/api/users", chartRoutes);
app.use("/api/properties", chartRoutes);
app.use('/api', reviewRoutes);
app.use('/api', chatRoutes);
app.use('/api', propertyBidsRouter);
app.use('/ai', aiRouter);
app.use('/api', meetingRoutes);

// unknown route
app.use("*", (req, res, next) => {
    next(httpErrors.NotFound('This router do not exist'));
})
// error route 
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})

// Update the listener to use the server instead of app
server.listen(process.env.PORT, () => {
    console.log("---------------------------Server is running---------------------------------------")
})