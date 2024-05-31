import styles from "./Auth.module.css";

import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import { getTokens } from "@/features/auth/authActions";

function Auth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            dispatch(getTokens(codeResponse.code))
                .then(() => {
                    navigate("/calendar");
                })
                .catch(() => {
                    console.error("Failed to get tokens");
                });
        },
        onError: () => {
            console.error("Google login failed");
        },
        flow: "auth-code",
        scopes: "https://www.googleapis.com/auth/calendar",
    });

    return (
        <>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.heading}>
                        {"Evallo Tutor Calender"}
                    </h1>
                </header>
                <div className={styles.card}>
                    <h2 className={styles.description}>
                        {
                            "Sync Your Google Calendar With Evallo Tutor To Manage Upcoming Events"
                        }
                    </h2>
                    <Button
                        className={styles.button}
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={googleLogin}>
                        {"Sign in with Google"}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Auth;
