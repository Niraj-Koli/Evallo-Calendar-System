import styles from "./Loader.module.css";

import { CircularProgress } from "@mui/material";

function Loader() {
    return (
        <>
            <div className={styles.loaderCard}>
                <CircularProgress
                    size={50}
                    color="inherit"
                    sx={{ margin: "1rem" }}
                />
            </div>
        </>
    );
}

export default Loader;
