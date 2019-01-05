require('../../extend')
require('chai').should();


let a = [1, 2, 3]
let b = [2, 3, 4]
let c = [3, 4, 5]

describe('Test ArrayExtend', () => {
    it('Array.prototype.$intersection()', () => {
        let a_b = a.$intersection(b)
        let a_c = a.$intersection(c)
        let b_c = b.$intersection(c)

        a_b.should.be.a('array').to.deep.equal([2, 3])
        a_c.should.be.a('array').to.deep.equal([3])
        b_c.should.be.a('array').to.deep.equal([3, 4])
    });
    it('Array.prototype.$union()', () => {
        let a_b = a.$union(b)
        let a_c = a.$union(c)
        let b_c = b.$union(c)

        a_b.should.be.a('array').to.deep.equal([1, 2, 3, 4])
        a_c.should.be.a('array').to.deep.equal([1, 2, 3, 4, 5])
        b_c.should.be.a('array').to.deep.equal([2, 3, 4, 5])
    });
    it('Array.prototype.$difference()', () => {
        let a_b = a.$difference(b)
        let a_c = a.$difference(c)
        let b_c = b.$difference(c)

        a_b.should.be.a('array').to.deep.equal([1])
        a_c.should.be.a('array').to.deep.equal([1, 2])
        b_c.should.be.a('array').to.deep.equal([2])
    });
})