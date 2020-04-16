import Assert from "assert";
import Serialize from "../src/serialize.js";
import { Base64 } from "js-base64";

describe("Serialize", function () {
    it("should encode to Base64", function () {
        Assert.equal(Serialize(123), "MTIz");
        Assert.equal(Serialize("中文"), "5Lit5paH");

        Assert.equal(Serialize({ a: 123 }), "eyJhIjoxMjN9");
        Assert.equal(Serialize({ a: "中文" }), "eyJhIjoi5Lit5paHIn0");
    });
});
