import Assert from "assert";
import Throttle from "../src/throttle.js";

describe("Throttle", function () {
    it("should work", function () {
        let count = 0;

        let add = function () {
            count++;
        };

        let fn = Throttle(add);

        for (var i = 0; i < 5; i++) {
            fn();
        }

        // 这是头节流函数
        Assert.equal(count, 1);
        // 如果是尾节流函数, 应该用下面的判断条件
        // Assert.equal(count, 0)

        setTimeout(function () {
            Assert.equal(count, 1);
        }, 1200);
    });
});
