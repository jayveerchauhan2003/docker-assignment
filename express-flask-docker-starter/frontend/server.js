import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.render("index", { result: null, error: null });
});

app.post("/submit", async (req, res) => {
  try {
    // Gather form fields (works for both urlencoded and json)
    const payload = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    };

    // Send to Flask service (service name 'backend' from docker-compose)
    const backendURL = process.env.BACKEND_URL || "http://backend:5000/submit";

    const response = await axios.post(backendURL, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 8000
    });

    // Render result to the same page
    return res.render("index", { result: response.data, error: null });
  } catch (err) {
    const msg = err?.response?.data?.error || err.message || "Unknown error";
    return res.status(500).render("index", { result: null, error: msg });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Frontend listening on http://0.0.0.0:${PORT}`);
});
