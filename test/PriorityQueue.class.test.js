const PriorityQueue = require("../lib/PriorityQueue.class");
const expect = require("chai").expect;


let priorityQueue = new PriorityQueue();
describe("PriorityQueue", () => {
    it("priorityQueue.push", () => {
        priorityQueue.push("item1", 1);
        priorityQueue.push("item2", 5);
        priorityQueue.push("item3", 2);
        priorityQueue.push("item4", 1);
        priorityQueue.push("item5", 3);
        priorityQueue.push("item6", 2);
        priorityQueue.push("item7", 5);
        priorityQueue.push("item8", 1);
        expect(priorityQueue.isEmpty()).to.be.false;
        expect(priorityQueue.length).to.be.equal(8);
    });
    it("priorityQueue.pop", () => {
        let item;
        item = priorityQueue.pop();
        expect(item.priority).to.be.equal(5);
        expect(item.item).to.be.equal("item2");
        item = priorityQueue.pop();
        expect(item.priority).to.be.equal(5);
        expect(item.item).to.be.equal("item7");
        item = priorityQueue.pop();
        expect(item.priority).to.be.equal(3);
        expect(item.item).to.be.equal("item5");
        item = priorityQueue.pop();
        expect(item.priority).to.be.equal(2);
        expect(item.item).to.be.equal("item3");
        item = priorityQueue.pop();
        expect(item.priority).to.be.equal(2);
        expect(item.item).to.be.equal("item6");
        item = priorityQueue.pop();
        expect(item.priority).to.be.equal(1);
        expect(item.item).to.be.equal("item1");
        item = priorityQueue.pop();
        expect(item.priority).to.be.equal(1);
        expect(item.item).to.be.equal("item4");
        item = priorityQueue.pop();
        expect(item.priority).to.be.equal(1);
        expect(item.item).to.be.equal("item8");
    });
});