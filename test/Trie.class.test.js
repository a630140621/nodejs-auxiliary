const Trie = require("../lib/tree/Trie.class");
const expect = require("chai").expect;


describe("Trie", () => {
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
});
