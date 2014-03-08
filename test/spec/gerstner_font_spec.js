describe("Gerstner.Font", function() {

  var s;

  beforeEach(function() {
    s = new Gerstner.Styler();
  });

  describe("#addGlyph", function() {

    it("adds a glyph", function() {
      var f = new Gerstner.Font("RuneFont", {});
      f.addGlyph("a", "myglyphdata", { "other" : "thing"});
      expect(_.keys(f.glyphs).length).toBe(1);
      expect(f.glyphs["a"].d).toBe("myglyphdata");
      expect(f.glyphs["a"].attribs.other).toBe("thing")
    });

  });

  describe("#render", function() {

    it("generates svg skeleton", function() {
      var f = new Gerstner.Font("RuneFont", {});
      f.render();
      
      // attributes on svg
      expect(f.$("svg").attr('xmlns')).toBe('http://www.w3.org/2000/svg');
      expect(f.$("svg").attr('width')).toBe('100%');
      expect(f.$("svg").attr('height')).toBe('100%');
      
      // skeleton ordering
      expect(f.$("defs font font-face").length).toBe(1);
      expect(f.$("font").attr("id")).toBe("RuneFont");
    });
  
    it("adds special attributes to font tag", function() {
      var f = new Gerstner.Font("RuneFont", {
        "horiz-adv-x" : 99
      });
      f.render();
      expect(f.$("font").attr("horiz-adv-x")).toBe("99")
      expect(f.$("font-face").attr("horiz-adv-x")).toBe(undefined)
    });
  
    it("adds fontName and other settings to font-face tag", function() {
      var f = new Gerstner.Font("RuneFont", {
        "some-other-thing" : "lala"
      });
      f.render();
      expect(f.$("font-face").attr("font-family")).toBe("RuneFont");
      expect(f.$("font-face").attr("some-other-thing")).toBe("lala");
    });

    it("generates glyphs", function() {
      var f = new Gerstner.Font("RuneFont", {});
      f.addGlyph("a", "myglyphdata");
      f.render();
      expect(f.$("font-face glyph").length).toBe(1);
      expect(f.$("font-face glyph").attr("d")).toBe("myglyphdata");
      expect(f.$("font-face glyph").attr("unicode")).toBe("a");
    });

  });

  describe("#getBase64", function() {

    it("renders base 64 string", function() {
      var f = new Gerstner.Font("RuneFont", {});
      f.addGlyph("a", "myglyphdata");
      f.render();
      expect(f.getBase64()).toNotBe(undefined);
      expect(f.getBase64()).toBe(window.btoa(f.el.innerHTML));
    });

  });

});
