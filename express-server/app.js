import express from "express";

export function createApp(dbService) {
    const app = express();

    // Middleware to parse JSON bodies
    app.use(express.json());

    //endpoint to check backend connection with simple hello
    app.get("/", async (req, res) => {
        try {
            const hello = await dbService.getData();
            res.send(hello);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    });

    return app;
}