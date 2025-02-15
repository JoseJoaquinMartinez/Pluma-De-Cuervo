import app from "./app";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    "https://pluma-de-cuervo.vercel.app",
    "https://pluma-de-cuervo-h5js.vercel.app",
    "http://localhost:3001",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Backend en funcionamiento");
});
app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
