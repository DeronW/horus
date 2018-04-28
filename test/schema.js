import Assert from 'assert'
import Schema from '../src/schema.js'


describe('Schema', function () {

    it('should get properties', function () {
        let ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11'
        let ua_r = Schema.Properties(ua)
        Assert.equal(ua_r.user_os, 'Mac OS/10.7.3')
        Assert.equal(ua_r.user_brand, undefined)
        Assert.equal(ua_r.user_explorer, 'Chrome/20.0.1132.57')
        Assert.equal(ua_r.user_model, undefined)
    })

    it('should get properties', function () {
        let ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
        let ua_r = Schema.Properties(ua)
        Assert.equal(ua_r.user_os, 'iOS/11.0')
        Assert.equal(ua_r.user_brand, 'Apple')
        Assert.equal(ua_r.user_explorer, 'Mobile Safari/11.0')
        Assert.equal(ua_r.user_model, 'iPhone')
    })
})