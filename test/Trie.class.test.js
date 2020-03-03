const Trie = require("../lib/tree/Trie.class");
const expect = require("chai").expect;


describe("Trie", () => {
    it("trie with default arguement", () => {
        let trie = new Trie(["app"]);

        expect(trie.startsWith("a")).to.be.an("array").with.length(1).and.contain("app");
        expect(trie.startsWith("b")).to.be.an("array").with.length(0);
        expect(trie.startsWith("appp")).to.be.an("array").with.length(0);
        
        trie.add("app");
        expect(trie.startsWith("a")).to.be.an("array").with.length(1).and.contain("app");
    });

    it("add same string", () => {
        let trie = new Trie();
        expect(trie.startsWith("a")).to.be.an("array").with.length(0);
    });

    it("empty trie and use startsWith", () => {
        let trie = new Trie();
        expect(trie.startsWith("")).to.be.an("array").with.length(0);
    });

    it("trie.startsWith", () => {
        let trie = new Trie();
        trie.add("apple");
        
        expect(trie.startsWith("")).to.be.an("array").with.length(1).contain("apple");
        expect(trie.startsWith("a")).to.be.an("array").with.length(1).contain("apple");
        expect(trie.startsWith("ap")).to.be.an("array").with.length(1).contain("apple");
        expect(trie.startsWith("appp")).to.be.an("array").with.length(0);
        trie.add("app");
        expect(trie.startsWith()).to.be.an("array").with.length(2).contain("apple").and.contain("app");
        expect(trie.startsWith("")).to.be.an("array").with.length(2).contain("apple").and.contain("app");
        expect(trie.startsWith("app")).to.be.an("array").with.length(2).contain("app").and.contain("apple");
        expect(trie.startsWith("appp")).to.be.an("array").with.length(0);
        expect(trie.startsWith("appl")).to.be.an("array").with.length(1).contain("apple");
    });

    it("trie.has", () => {
        let trie = new Trie();
        expect(trie.has("")).to.be.true;
        expect(trie.has("a")).to.be.false;
        trie.add("apple");
        expect(trie.has("app")).to.be.false;
        expect(trie.has("apple")).to.be.true;
        trie.add("app");
        expect(trie.has("app")).to.be.true;
        expect(trie.has("apple")).to.be.true;
    });

    it("trie.startsWith should return two value", () => {
        let trie = new Trie();
        trie.add("s");
        trie.add("sll");
        trie.add("");
        expect(trie.startsWith("s")).to.be.an("array").that.has.length(2).which.include("s").and.include("sll");
    });

    it("trie.startsWith should return ['']", () => {
        let trie = new Trie();
        trie.add("");
        expect(trie.startsWith("")).to.be.an("array").that.has.length(1).which.include("");
    });
});
