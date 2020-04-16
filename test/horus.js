import Assert from "assert";
import Horus from "../src/index.js";

describe("Horus", function () {
    it("init", function () {
        let horus = new Horus();

        Assert.equal(typeof horus, "object");
        Assert.equal(horus.opt.url, "");
        Assert.equal(horus.opt.project, "Empty");
        Assert.equal(horus.opt.debug, false);

        horus.setConfig("url", "url value");
        Assert.equal(horus.opt.url, "url value");
        horus.setConfig({ url: "new url value" });
        Assert.equal(horus.opt.url, "new url value");
    });
});
