const uuid = require("../lib/uuid");
const expect = require("chai").expect;


describe("uuid", () => {
    it("generate 10000 uuid", () => {
        let container = [];
        for (let i = 0; i < 1000; i++) {
            let id = uuid();
            expect(container.includes(id), `uuid#(${id}) has exist`).to.be.false;
            container.push(id);
        }
    });
});