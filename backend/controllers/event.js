import Event from "../models/event.js";

import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

export const addEvent = async (req, res) => {
    const {
        title,
        description,
        participants,
        startDateTime,
        endDateTime,
        accessToken,
        refreshToken,
    } = req.body;

    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const newEvent = await calendar.events.insert({
        calendarId: "primary",
        requestBody: {
            summary: title,
            description,
            attendees: participants,
            start: {
                dateTime: new Date(startDateTime),
            },
            end: {
                dateTime: new Date(endDateTime),
            },
            colorId: Math.floor(Math.random() * 10) + 1,
        },
    });

    try {
        await Event.create({
            title,
            description,
            participants,
            startDateTime: new Date(startDateTime),
            endDateTime: new Date(endDateTime),
        });

        res.send(newEvent);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, participants, startDateTime, endDateTime } =
        req.body;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).send("Event not found");
        }

        event.title = title;
        event.description = description;
        event.participants = participants;
        event.startDateTime = startDateTime;
        event.endDateTime = endDateTime;

        await event.save();

        res.send(event);
    } catch (err) {
        console.error("Error updating event:", err);
        res.status(500).send("Error updating event");
    }
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).send("Event not found");
        }

        await event.remove();

        res.send("Event deleted successfully");
    } catch (err) {
        console.error("Error deleting event:", err);
        res.status(500).send("Error deleting event");
    }
};

export const retrieveEvent = async (req, res) => {
    try {
        const events = await Event.find();
        
        res.send(events);
    } catch (err) {
        console.error("Error retrieving events:", err);
        res.status(500).send("Error retrieving events");
    }
};
