import express from "express";
import mongoose from "mongoose";
import cors  from "cors"
import { Symptom } from "./model";
// const STORAGE_KEY = "symptom-journal-entries";
// const stored = () => {
//   const data = localStorage.getItem(STORAGE_KEY);

//   return data ? JSON.parse(data) : [];
// };

// const storeEntries = (entries: string) => {
//   try {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
//   } catch (error) {
//     console.error("Error writing to localStorage:", error);
//   }
// };

const app = express();

app.use(express.json());
app.use(cors())

app.get("/get", async (req, res) => {
  try {
    const allData = await Symptom.find({});
    res.json({ allData });
    return;
  } catch (e) {
    console.log(`${e}`);
    throw new Error("Something went wrong");
  }
});

app.post("/add", async (req, res) => {
  try {
    const newEntry = new Symptom(req.body);
    await newEntry.save();
    res.json({ message: "Entry saved" });
    return;
  } catch (e) {
    console.log(`${e}`);
    throw new Error("Something went wrong");
  }
});
app.delete("/delete/:id", async (req, res) => {
  try {
    await Symptom.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted" });
    return;
  } catch (e) {
    console.log(`${e}`);
    throw new Error("Something went wrong");
  }
});

app.listen(3000, async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/symptom');
    // await mongoose.connect(process.env.DB);
    console.log("Connected with DB");
  } catch (e) {
    console.log(`Something went wrong ${e}`);
  }
  console.log("Backend Stated");
});
