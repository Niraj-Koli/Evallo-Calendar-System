import styles from "./Calendar.module.css";

import { useCallback, useState, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { setLogout } from "@/features/auth/authSlice";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

const Event = lazy(() => import("@/components/Event/Event"));
const Loader = lazy(() => import("@/components/Loader/Loader"));

function Calendar() {
    const [openDialog, setOpenDialog] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    const handleDateClick = useCallback(() => {
        setOpenDialog(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setOpenDialog(false);
    }, []);

    const handleLogout = useCallback(() => {
        dispatch(setLogout());
        navigate("/");
    }, [dispatch, navigate]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.heading}>
                        {"Evallo Tutor Calender"}
                    </h1>

                    <Button
                        className={styles.logoutbutton}
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleLogout}>
                        {"Logout"}
                    </Button>
                </div>

                <div className={styles.eventAction}>
                    <h2
                        className={
                            styles.userName
                        }>{`Welcome, ${user.name}`}</h2>
                    <Button
                        className={styles.eventbutton}
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleDateClick}>
                        {"Create Event"}
                    </Button>
                </div>

                <Suspense fallback={<Loader />}>
                    <Event open={openDialog} handleClose={handleCloseDialog} />
                </Suspense>

                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        googleCalendarPlugin,
                    ]}
                    initialView="dayGridMonth"
                    events={{
                        googleCalendarId: import.meta.env
                            .VITE_GOOGLE_CALENDAR_ID,
                    }}
                    googleCalendarApiKey={
                        import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY
                    }
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    height={"80vh"}
                />
            </div>

            <div style={{ height: "10vh" }}></div>
        </>
    );
}

export default Calendar;
