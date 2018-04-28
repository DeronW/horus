import Assert from 'assert'
import Throttle from '../src/throttle.js'


describe('Throttle', function () {

    it('should throttle', function () {
        let count = 0
        let add = function(){
            count++
        }
        let t = Throttle(add)
        for(var i = 0 ; i < 5; i++){
            t()
        }
        t()
    });
});