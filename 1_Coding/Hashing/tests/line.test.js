const { Line } = require("../build/models/Line");
const { Hash } = require("../build/models/Hash");

test("Create new line", async () => {
    const { hash, nonce } = Line.getNew("0", "test");

    expect(Buffer.from(hash, "hex").length).toEqual(32);
    expect(hash.substr(0, 2)).toEqual("00");

    expect(nonce).not.toBeNaN();
});

test("Check new line integrity", async () => {
    let isValid = false,
        lastHash = "0000000000000000000000000000000000000000000000000000000000000000",
        nonce = 0,
        newHash = "";

    ({ hash: newHash, nonce } = Line.getNew(lastHash, "newLine1"));
    isValid = Line.checkIntegrity(lastHash, "newLine1", nonce);
    lastHash = newHash;
    expect(isValid).toBeTruthy();

    ({ hash: newHash, nonce } = Line.getNew(lastHash, "newLine2"));
    isValid = Line.checkIntegrity(lastHash, "newLine2", nonce);
    lastHash = newHash;
    expect(isValid).toBeTruthy();

    ({ hash: newHash, nonce } = Line.getNew(lastHash, "newLine3"));
    isValid = Line.checkIntegrity(lastHash, "newLine3", nonce);
    lastHash = newHash;
    expect(isValid).toBeTruthy();
});
