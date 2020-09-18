const axios = require("axios");

test("Post a new message", async () => {
    const message = { test: new Date() };

    try {
        const response = await axios.post(`http://localhost:3000/`, message);
        expect(response.status).toBe(200);
    } catch (error) {
        expect(400).toBe(200);
    }
});
