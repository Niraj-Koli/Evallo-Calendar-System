import styles from "./Event.module.css";

import propTypes from "prop-types";

import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createEvent } from "@/features/calendar/calendarActions";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

function Event({ open, handleClose }) {
    const dispatch = useDispatch();

    const accessToken = useSelector((state) => state.auth.accessToken);
    const refreshToken = useSelector((state) => state.auth.refreshToken);

    const [formState, setFormState] = useState({
        title: "",
        description: "",
        participants: "",
        startDateTime: "",
        endDateTime: "",
    });

    const { title, description, participants, startDateTime, endDateTime } =
        formState;

    const handleChange = useCallback(
        (event) => {
            const { name, value } = event.target;
            setFormState({ ...formState, [name]: value });
        },
        [formState]
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();

            dispatch(
                createEvent({
                    title,
                    description,
                    participants: participants.split(","),
                    startDateTime,
                    endDateTime,
                    accessToken,
                    refreshToken,
                })
            ).then(() => {
                setFormState({
                    title: "",
                    description: "",
                    participants: "",
                    startDateTime: "",
                    endDateTime: "",
                });
            });
        },
        [
            dispatch,
            title,
            description,
            participants,
            startDateTime,
            endDateTime,
            accessToken,
            refreshToken,
        ]
    );

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className={styles.modelTitle}>
                    {"Create Event"}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            inputProps={{ className: styles.input }}
                            InputLabelProps={{ className: styles.label }}
                            margin="dense"
                            color="black"
                            label="Title"
                            type="text"
                            name="title"
                            id="title"
                            fullWidth
                            value={title}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            inputProps={{ className: styles.input }}
                            InputLabelProps={{ className: styles.label }}
                            margin="dense"
                            color="black"
                            label="Description"
                            type="text"
                            name="description"
                            id="description"
                            fullWidth
                            value={description}
                            onChange={handleChange}
                            required
                            multiline
                        />
                        <TextField
                            inputProps={{ className: styles.input }}
                            InputLabelProps={{ className: styles.label }}
                            margin="dense"
                            color="black"
                            label="Participants (Comma Separated)"
                            type="text"
                            name="participants"
                            id="participants"
                            fullWidth
                            value={participants}
                            onChange={handleChange}
                            required
                        />
                        <label className={styles.datetimeLabel}>
                            {"Start Date/Time:"}
                        </label>
                        <input
                            className={styles.datetimeInput}
                            type="datetime-local"
                            name="startDateTime"
                            id="startDateTime"
                            value={startDateTime}
                            onChange={handleChange}
                            required
                        />
                        <label className={styles.datetimeLabel}>
                            {"End Date/Time:"}
                        </label>
                        <input
                            className={styles.datetimeInput}
                            type="datetime-local"
                            name="endDateTime"
                            id="endDateTime"
                            value={endDateTime}
                            onChange={handleChange}
                            required
                        />

                        <DialogActions className={styles.actions}>
                            <Button
                                className={styles.button}
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={handleClose}>
                                {"Cancel"}
                            </Button>
                            <Button
                                type="submit"
                                className={styles.button}
                                fullWidth
                                variant="contained"
                                size="large"
                                color="primary"
                                onClick={handleClose}>
                                {"Create Event"}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

Event.propTypes = {
    open: propTypes.bool.isRequired,
    handleClose: propTypes.func.isRequired,
};

export default Event;
