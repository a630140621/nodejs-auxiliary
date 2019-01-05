require('../../extend')
let expect = require('chai').expect;


let o1 = {}
let o2 = {
    'a': 'a',
    'b': 1,
    'c': {
        'd': true,
        'a': 'a',
        'e': {
            'e': [1, 2],
            'f': null
        },
        'f': ['f1', 'f2']
    }
}
describe('Test ObjectExtend', () => {
    it('forin And Object.keys() should not find extend keys', () => {
        expect(Object.keys(o1)).to.be.an('array').and.has.length(0);
        expect(Object.keys(o2)).to.be.an('array').and.has.length(3).and.to.be.deep.equal(['a', 'b', 'c']);
    });
    it('Object.$isEmpty()', () => {
        expect(o1.$isEmpty()).be.true;
        expect(o2.$isEmpty()).be.false;
    });
    it('Object.$get()', () => {
        expect(o1.$get('a')).be.undefined;
        expect(o2.$get('a')).be.equal('a');
        expect(o2.$get('c.d')).be.true;
        expect(o2.$get('c.e.e')).be.deep.equal([1, 2]);
        expect(o2.$get('c.e.f')).be.null;
    });
    it('Object.$has()', () => {
        expect(o1.$has('a')).be.false;
        expect(o2.$has('a')).be.true;
        expect(o2.$has('c.d')).be.true;
        expect(o2.$has('c.e.d')).be.false;
        expect(o2.$has('c.e.f')).be.true;
    });
    it('Object.$deepClone()', () => {
        let copy_o2 = o2;
        let deep_o2 = o2.$deepClone();

        expect(copy_o2).be.a('object').and.equal(o2);
        expect(deep_o2).be.a('object').and.not.equal(o2);
    });
    it('Object.$inspect()', () => {
        let o2_inspect_obj = {
            'a': 'string',
            'b': 'number',
            'c.d': 'boolean',
            'c.a': 'string',
            'c.e.e': 'array',
            'c.f': 'array'
        }

        expect(o2.$inspect(o2_inspect_obj)).to.be.true;
        o2_inspect_obj['c.d'] = 'array';
        expect(o2.$inspect(o2_inspect_obj)).be.a('string').and.equal('type error: c.d expect Array|List but receive boolean');
    });
})