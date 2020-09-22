const axios = require("axios");
const fs = require("fs");
const parseCsv = require("csv-parse/lib/sync");

const { Line } = require("../build/models/Line");

test("Post a new message", async () => {
    const message = { test: new Date() };

    try {
        const response = await axios.post(`http://localhost:3000/`, message);
        expect(response.status).toBe(200);
    } catch (error) {
        expect(400).toBe(200);
    }
});

test("Test source integrity", async () => {
    const message = { test: new Date() };

    try {
        let response;

        response = await axios.post(`http://localhost:3000/`, message);
        expect(response.status).toBe(200);
        response = await axios.post(`http://localhost:3000/`, message);
        expect(response.status).toBe(200);
        response = await axios.post(`http://localhost:3000/`, message);
        expect(response.status).toBe(200);
        response = await axios.post(`http://localhost:3000/`, message);
        expect(response.status).toBe(200);
        response = await axios.post(`http://localhost:3000/`, message);
        expect(response.status).toBe(200);
        response = await axios.post(`http://localhost:3000/`, message);
        expect(response.status).toBe(200);

        const csv = parseCsv(fs.readFileSync("./source/file.csv"), { columns: false, quote: false });
        csv.forEach(([hash, payload, nonce]) => {
            const isValid = Line.checkIntegrity(hash, payload, nonce);
            expect(isValid).toBeTruthy();
        });
    } catch (error) {
        console.log(error);
        expect(400).toBe(200);
    }
});
