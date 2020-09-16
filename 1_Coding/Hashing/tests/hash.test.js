const { Hash } = require("../build/models/Hash");

test("Create new hash", async () => {
    const hash = Hash.calculate("0,dummy,1");

    expect(Buffer.from(hash, "hex").length).toEqual(32);
});
