import dotenv from "dotenv";
import { app } from "./app.js";
import connectDatabase from "./DB/index.js";

dotenv.config({ path: "./.env" });


connectDatabase()
    .then(() => {
        console.log("Database connection successful.");

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.error(`Database Connection Failed: ${err.message}`);
        console.error(err); 
        process.exit(1);
    });

process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});
