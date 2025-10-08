import fs from "fs";
import path from "path";

//TODO: Convert this to a class for future abstraction

export async function getData() {
    const data = [
            {"id": 1, "message": "Hello World!"},
            {"id": 2, "message": "From the server!"}
        ];
    return data;
}