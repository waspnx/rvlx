define(["hbs!"+require.toUrl("tests/templates/partial")],function(e){describe("template with a partial",function(){it("loads the partials",function(){var t=e({partialValue:"ha"}),a=document.createElement("div");a.innerHTML=t;var i=a.getElementsByTagName("b");expect(i).to.exist,expect(i.length).to.equal(1),expect(i[0].innerText).to.equal("Hello ha")})})});