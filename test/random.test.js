const random = require("../lib/random");
const expect = require("chai").expect;


describe("random", () => {
    it("random.random", () => {
        for (let i = 0; i < 10; i++) {
            let rand = random.random();
            // console.log(rand);
            expect(rand).to.be.an("number").and.lessThan(1).greaterThan(0);
        }
    });

    it("random.randint", () => {
        let min = 0;
        let max = 5;
        for (let i = 0; i < 10; i++) {
            let rand = random.randint(min, max);
            // console.log(rand);
            expect(rand).to.be.an("number").and.lte(max).gte(min);
        }
    });

    it("random.choice", () => {
        let s = "hello";
        let arr = [1, 2, 3, 4, 5, 6];
        for (let i = 0; i < 20; i++) {
            let char = random.choice(s);
            // console.log(char);
            expect(char).to.be.an("string").and.lengthOf(1);
            expect(s.indexOf(char)).not.equal(-1);
            let value = random.choice(arr);
            // console.log(value);
            expect(arr).include(value);
        }
    });

    it("random.sample", () => {
        let s = "hello world";
        let arr = [1, 2, 3, 4, 5];
        for (let i = 0; i < 20; i++) {
            let sample_s_2 = random.sample(s, 2);
            let sample_s_3 = random.sample(s, 3);
            expect(sample_s_2).to.be.an("array").lengthOf(2);
            sample_s_2.map(item => expect(s.indexOf(item)).not.equal(-1));
            expect(sample_s_3).to.be.an("array").lengthOf(3);
            sample_s_3.map(item => expect(s.indexOf(item)).not.equal(-1));
            // console.log(`sample_s_2 = ${sample_s_2}`);
            // console.log(`sample_s_3 = ${sample_s_3}`);

            let sample_arr_1 = random.sample(arr, 1);
            let sample_arr_3 = random.sample(arr, 3);
            expect(sample_arr_1).to.be.an("array").lengthOf(1);
            sample_arr_1.map(item => expect(arr.indexOf(item)).not.equal(-1));
            expect(sample_arr_3).to.be.an("array").lengthOf(3);
            sample_arr_3.map(item => expect(arr.indexOf(item)).not.equal(-1));
            // console.log(`sample_arr_1 = ${sample_arr_1}`);
            // console.log(`sample_arr_3 = ${sample_arr_3}`);
        }
    });

    it("random.shuffle", () => {
        let arr = [1, 2, 3, 4, 5];
        for (let i = 0; i < 10; i++) {
            let new_arr = random.shuffle(arr);
            expect(new_arr).to.be.an("array").lengthOf(5);
            // console.log(new_arr);
        }
    });
});