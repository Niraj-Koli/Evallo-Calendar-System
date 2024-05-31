import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    participants: { type: [String] },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
});

export default mongoose.model("Event", EventSchema);
