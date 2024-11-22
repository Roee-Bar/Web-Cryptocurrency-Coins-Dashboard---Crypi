import dbConnect from '../../lib/mongodb';
import mongoose from 'mongoose';

// Example schema
const DataSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Data = mongoose.models.Data || mongoose.model('Data', DataSchema);

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const data = await Data.find({});
    res.status(200).json({ success: true, data });
  } else if (req.method === 'POST') {
    try {
      const newData = await Data.create(req.body);
      res.status(201).json({ success: true, data: newData });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
