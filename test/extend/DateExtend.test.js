require('../../extend')
require('chai').should();


let date_1 = new Date('2018-01-01 00:00:00')
let date_2 = new Date('2018-11-11 11:11:11.111')
describe('Test DateExtend', () => {
    it('Date.prototype.$format()', () => {
        let date_1_string_1 = date_1.$format()
        let date_2_string_1 = date_2.$format()
        date_1_string_1.should.be.a('string').to.equal('2018-01-01 00:00:00')
        date_2_string_1.should.be.a('string').to.equal('2018-11-11 11:11:11')


        let date_1_string_2 = date_1.$format('yyyy-MM-dd')
        let date_2_string_2 = date_2.$format('yyyy-MM-dd')
        date_1_string_2.should.be.a('string').to.equal('2018-01-01')
        date_2_string_2.should.be.a('string').to.equal('2018-11-11')

        let date_1_string_3 = date_1.$format('yyyy/MM/dd')
        let date_2_string_3 = date_2.$format('yyyy/MM/dd')
        date_1_string_3.should.be.a('string').to.equal('2018/01/01')
        date_2_string_3.should.be.a('string').to.equal('2018/11/11')

        let date_1_string_4 = date_1.$format('yyyy/MM/dd hh:mm')
        let date_2_string_4 = date_2.$format('yyyy/MM/dd hh:mm:ss')
        date_1_string_4.should.be.a('string').to.equal('2018/01/01 00:00')
        date_2_string_4.should.be.a('string').to.equal('2018/11/11 11:11:11')

        let date_1_string_5 = date_1.$format('yyyy-MM-dd hh:mm')
        let date_2_string_5 = date_2.$format('yyyy-MM-dd hh:mm:ss')
        date_1_string_5.should.be.a('string').to.equal('2018-01-01 00:00')
        date_2_string_5.should.be.a('string').to.equal('2018-11-11 11:11:11')

        let date_1_string_6 = date_1.$format('yyyy年MM月dd日')
        let date_2_string_6 = date_2.$format('yyyy年MM月dd日 hh:mm:ss')
        date_1_string_6.should.be.a('string').to.equal('2018年01月01日')
        date_2_string_6.should.be.a('string').to.equal('2018年11月11日 11:11:11')
        
        let date_1_string_7 = date_1.$format('yyyy-M-d hh:mm:ss')
        let date_2_string_7 = date_2.$format('yyyy-MM-dd hh:mm:ss.S')
        date_1_string_7.should.be.a('string').to.equal('2018-1-1 00:00:00')
        date_2_string_7.should.be.a('string').to.equal('2018-11-11 11:11:11.111')
    })
})