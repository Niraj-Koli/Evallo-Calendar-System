import fetch from "node-fetch";

import User from "../models/user.js";

export const authenticateUser = async (req, res) => {
    const { code } = req.body;

    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;
    const grant_type = "authorization_code";

    try {
        const tokenResponse = await fetch(
            "https://oauth2.googleapis.com/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    code,
                    client_id,
                    client_secret,
                    redirect_uri,
                    grant_type,
                }),
            }
        );

        const tokens = await tokenResponse.json();

        if (!tokens.id_token) {
            throw new Error("No id_token found in token response");
        }

        const userInfoResponse = await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
        );

        const userInfo = await userInfoResponse.json();

        const existingUser = await User.findOne({ email: userInfo.email });

        if (existingUser) {
            existingUser.access_token = tokens.access_token;
            existingUser.refresh_token = tokens.refresh_token;
            existingUser.id_token = tokens.id_token;

            await existingUser.save();
        } else {
            const newUser = new User({
                email: userInfo.email,
                name: userInfo.name,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                id_token: tokens.id_token,
            });

            await newUser.save();
        }

        res.json({ userInfo, tokens });
    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
