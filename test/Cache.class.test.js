const Cache = require("../lib/Cache.class");
let expect = require("chai").expect;


let cache = new Cache("demo");
describe(`Test Cache`, () => {
    it(`Cache Singleton`, () => {
        let cache_1 = new Cache("test_1");
        let cache_2 = new Cache("test_2");
        let cache_3 = new Cache("test_1");
        expect(cache_1).not.deep.equal(cache_2);
        expect(cache_1).deep.equal(cache_3);
        expect(cache_2).not.deep.equal(cache_3);
    });

    it(`Cache.set without timeout`, () => {
        cache.set("key1", "value1");
        cache.set("key2", []);
        cache.set("key3", true);
        cache.set("key4", false);
        cache.set("key5", {});
    });

    it(`Cache.set with timeout`, () => {
        cache.set("key91", "value1", 1300);
        cache.set("key92", [], 600);
        cache.set("key93", true, 2000);
        cache.set("key94", false, 300);
        cache.set("key95", {}, 1200);
    });

    it(`Cache.get with timeout`, () => {
        expect(cache.get("key91")).deep.equal("value1");
        expect(cache.get("key92")).deep.equal([]);
        expect(cache.get("key93")).to.be.true;
        expect(cache.get("key94")).to.be.false;
        expect(cache.get("key95")).deep.equal({});

        // 1s 后
        setTimeout(() => {
            expect(cache.get("key91")).deep.equal("value1");
            expect(cache.get("key92", [])).deep.equal([]);
            expect(cache.get("key93")).to.be.true;
            expect(cache.get("key94", true)).to.be.true;
            expect(cache.get("key95")).deep.equal({});
        }, 1000);
    });

    it(`Cache.get without timeout`, () => {
        expect(cache.get("key1")).deep.equal("value1");
        expect(cache.get("key2")).deep.equal([]);
        expect(cache.get("key3")).to.be.true;
        expect(cache.get("key4")).to.be.false;
        expect(cache.get("key5")).deep.equal({});

        // 1s 后
        setTimeout(() => {
            expect(cache.get("key1")).deep.equal("value1");
            expect(cache.get("key2")).deep.equal([]);
            expect(cache.get("key3")).to.be.true;
            expect(cache.get("key4")).to.be.false;
            expect(cache.get("key5")).deep.equal({});
        }, 1000);
    });

    it(`Cache.has with timeout`, () => {
        cache.set("key50", false, 1500);
        expect(cache.has("key50")).to.be.true;
        setTimeout(() => {
            expect(cache.has("key50")).to.be.true;
        }, 1000);
        setTimeout(() => {
            expect(cache.has("key50")).to.be.false;
        }, 2000);
    });

    it(`Cache.has without timeout`, () => {
        expect(cache.has("key1")).to.be.true;
        expect(cache.has("key2")).to.be.true;
        expect(cache.has("key3")).to.be.true;
        expect(cache.has("key4")).to.be.true;
        expect(cache.has("key5")).to.be.true;
        expect(cache.has("not exist")).to.be.false;

        // 1s 后
        setTimeout(() => {
            expect(cache.has("key1")).to.be.true;
            expect(cache.has("key2")).to.be.true;
            expect(cache.has("key3")).to.be.true;
            expect(cache.has("key4")).to.be.true;
            expect(cache.has("key5")).to.be.true;
            expect(cache.has("not exist")).to.be.false;
        }, 1000);
    });
});