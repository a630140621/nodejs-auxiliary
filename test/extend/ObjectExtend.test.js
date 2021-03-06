require("../../extend");
let expect = require("chai").expect;


let o1 = {};
let o2 = {
    "a": "a",
    "b": 1,
    "c": {
        "d": true,
        "a": "a",
        "e": {
            "e": [1, 2],
            "f": null
        },
        "f": ["f1", "f2"]
    },
    "d": [{
        "id": 1
    }]
};
describe("Test ObjectExtend", () => {
    it("forin And Object.keys() should not find extend keys", () => {
        expect(Object.keys(o1)).to.be.an("array").and.has.length(0);
        expect(Object.keys(o2)).to.be.an("array").and.has.length(4).and.to.be.deep.equal(["a", "b", "c", "d"]);
    });
    it("Object.$isEmpty()", () => {
        expect(o1.$isEmpty()).be.true;
        expect(o2.$isEmpty()).be.false;
    });
    it("Object.$get()", () => {
        expect(o1.$get("a")).be.undefined;
        expect(o2.$get("a")).be.equal("a");
        expect(o2.$get("c.d")).be.true;
        expect(o2.$get("c.e.e")).be.deep.equal([1, 2]);
        expect(o2.$get("c.e.f")).be.null;
    });
    it("Object.$has()", () => {
        expect(o1.$has("a")).be.false;
        expect(o2.$has("a")).be.true;
        expect(o2.$has("c.d")).be.true;
        expect(o2.$has("c.e.d")).be.false;
        expect(o2.$has("c.e.f")).be.true;
    });
    it("Object.$deepClone()", () => {
        let copy_o2 = o2;
        let deep_o2 = o2.$deepClone();

        expect(copy_o2).be.a("object").and.equal(o2);
        expect(deep_o2).be.a("object").and.not.equal(o2);
    });
    it("Object.$reserveKeys", () => {
        let o = {
            "a": "a",
            "b": {
                "b": "b"
            },
            "c": 1,
            "d": true,
            "e": [1, 2, 3]
        };

        expect(o).be.an("object").and.to.have.all.keys("a", "b", "c", "d", "e");
        expect(o.$reserveKeys(["a"])).be.an("object").and.to.have.all.keys("a");
        expect(o).be.an("object").and.to.have.all.keys("a", "b", "c", "d", "e");
        expect(o.$reserveKeys(["a", "b"])).be.an("object").and.to.have.all.keys("a", "b");
        expect(o.$reserveKeys(["a", "c"])).be.an("object").and.to.have.all.keys("a", "c");
        expect(o.$reserveKeys(["a", "d"])).be.an("object").and.to.have.all.keys("a", "d");
        expect(o.$reserveKeys(["a", "e"])).be.an("object").and.to.have.all.keys("a", "e");
        expect(o).be.an("object").and.to.have.all.keys("a", "b", "c", "d", "e");
    });
});