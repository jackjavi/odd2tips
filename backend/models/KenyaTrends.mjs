import mongoose from "mongoose";

const KenyaTrendsSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  trends: [
    {
      title: String,
      url: String,
    },
  ],
});

const KenyaTrends = mongoose.model("KenyaTrends", KenyaTrendsSchema);

export default KenyaTrends;
