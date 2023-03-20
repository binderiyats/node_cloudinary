import express from "express";
import cloudinary from "./cloudinary.js";
import uploader from "./multer.js";

const app = express();
app.get("/", (req, res) => {
  res.send("Server is running");
});

// app.post("/upload", uploader.single("file"), async (req, res) => {
//   const upload = await cloudinary.v2.uploader.upload(req.file.path);
//   return res.json({
//     success: true,
//     file: upload.secure_url,
//   });
// });

app.post("/upload", uploader.array("file", 12), async (req, res) => {
  const result = [];

  const uploadSingle = async (file) => {
    const upload = await cloudinary.v2.uploader.upload(file.path);
    result.push(upload.secure_url);
  };

  for (let file of req.files) {
    await uploadSingle(file);
  }

  return res.json({
    success: true,
    file: result,
  });
});

app.listen(3000);
