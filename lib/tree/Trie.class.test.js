const Trie = require("./Trie.class");
const expect = require("chai").expect;


test("adds 1 + 2 to equal 3", () => {
    let trie = new Trie();
    trie.add("apple");
    
    expect(trie.startsWith("")).to.be.an("array").with.length(1).contain("apple");
    expect(trie.startsWith("a")).to.be.an("array").with.length(1).contain("apple");
    expect(trie.startsWith("ap")).to.be.an("array").with.length(1).contain("apple");
    trie.add("app");
    expect(trie.startsWith("")).to.be.an("array").with.length(2).contain("apple").and.contain("app");
    expect(trie.startsWith("app")).to.be.an("array").with.length(2).contain("app").and.contain("apple");
    expect(trie.startsWith("appl")).to.be.an("array").with.length(1).contain("apple");
});
