const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const checkoutRoute = require("./routes/checkoutRoute");
const orderRoute = require("./routes/orderRoute");
const uploadRoute = require("./routes/uploadRoute");
const subscriberRoute = require("./routes/subscriberRoute");
const adminRoute = require("./routes/adminRoute");
const productAdminRoute = require("./routes/productAdminRoute");
const adminOrderRoute = require("./routes/adminOrderRoute");

const app = express();

// CORS must be configured before other middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: false, // Set to false when using origin: "*"
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Elanic API!");
});

app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);
app.use("/api", subscriberRoute);
app.use("/api/admin/users", adminRoute);
app.use("/api/admin/products", productAdminRoute);
app.use("/api/admin/orders", adminOrderRoute);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
