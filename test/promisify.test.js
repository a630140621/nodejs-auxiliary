const {
    promisify,
    promisifyMany,
    promisifyAll
} = require('../lib/promisify');
const expect = require('chai').expect;


function noReturn(cb) {
    cb(null);
}

function getOne(cb) {
    cb(null, 1);
}

function getOneTwoThree(cb) {
    cb(null, 1, 2, 3);
}

function getArgs(arg1, arg2, cb) {
    cb(null, arg1, arg2);
}

function returnError(cb) {
    cb(new Error('test'));
}

class Person {
    constructor(name) {
        this.name = name;
    }

    getName(cb) {
        cb(null, this.name);
    }

    getOne() {
        return 1;
    }

    getNameSync() {
        return this.name;
    }
}

let house = {
    _window: 2,
    _name: 'house',
    getWindowNumberSync: function () {
        return this._window;
    },
    getWindowNumber: function (cb) {
        return cb(null, this._window);
    },
    getName(cb) {
        cb(null, this._name);
    },
    cbError(cb) {
        cb(new Error('test'));
    }
}

// let zhangsan = new Person('zhangsan');
// zhangsan.getName((error, name) => {
//     console.log(name)
// })
// console.log(house.getWindowNumberSync())
// console.log(zhangsan.getNameSync())
// house.getWindowNumber((error, name)=> {
//     console.log(name)
// })
describe('promisify', () => {
    it('promisify.promisify', async () => {
        let promisifyNoReturn = promisify(noReturn);
        let promisifyGetOne = promisify(getOne);
        let promisifyGetOneTwoThree = promisify(getOneTwoThree);
        let promisifyReturnError = promisify(returnError);
        let promisifyGetArgs = promisify(getArgs);
        let promisifyHousegetWindowNumber = promisify(house.getWindowNumber.bind(house));
        let zhangsan = new Person('zhangsan');
        let promisifyGetName = promisify(zhangsan.getName.bind(zhangsan));
        expect(await promisifyNoReturn()).to.be.undefined;
        expect(await promisifyGetOne()).to.be.equal(1);
        expect(await promisifyGetOneTwoThree()).to.be.deep.equal([1, 2, 3]);
        await promisifyReturnError().then(() => {}).catch(error => {
            expect(error).to.be.a('error');
        })
        expect(await promisifyGetArgs('arg1', 'arg2')).to.be.deep.equal(['arg1', 'arg2']);
        expect(await promisifyHousegetWindowNumber()).to.be.equal(2);
        expect(await promisifyGetName()).to.be.equal('zhangsan');
    });
    it('promisify.promisifyMany', async () => {
        let lisi = new Person('lisi');
        let promisifyLisi = promisifyMany(lisi, ['getName']);
        expect(promisifyLisi.name).to.be.equal('lisi');
        expect(promisifyLisi.getOne()).to.be.equal(1);
        expect(promisifyLisi.getNameSync()).to.be.equal('lisi');
        expect(await promisifyLisi.getName()).to.be.equal('lisi');

        let promisifyHouse = promisifyMany(house, ['getWindowNumber', 'getName']);
        expect(promisifyHouse._name).to.be.equal('house');
        expect(promisifyHouse.getWindowNumberSync()).to.be.equal(2);
        expect(await promisifyHouse.getName()).to.be.equal('house');
        expect(await promisifyHouse.getWindowNumber()).to.be.equal(2);
        expect(promisifyHouse.cbError(error => {
            expect(error).to.be.an('error');
        }))

        let promisifyHouse2 = promisifyMany(promisifyHouse, ['cbError']);
        promisifyHouse2.cbError().then().catch(error => {
            expect(error).to.be.an('error');
        })
    });
    it('promisify.promisifyAll', async () => {
        let wangwu = new Person('wangwu');
        let promisifyWangwu = promisifyAll(wangwu);
        expect(promisifyWangwu.name).to.be.equal('wangwu');
        expect(await promisifyWangwu.getName()).to.be.equal('wangwu');
        // expect(await promisifyWangwu.getNameSync()).to.be.equal('wangwu');
        // expect(await promisifyWangwu.getOne()).to.be.equal(1);

        let promisifyHouse = promisifyAll(house);
        // expect(await promisifyHouse.getWindowNumberSync()).to.be.equal(2);
        expect(await promisifyHouse.getWindowNumber()).to.be.equal(2);
        expect(await promisifyHouse.getName()).to.be.equal('house');
        await promisifyHouse.cbError().then().catch(error => {
            expect(error).to.be.an('error');
        })
    });
})