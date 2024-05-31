import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: new URL("src", import.meta.url).pathname,
            },
        ],
    },
});
