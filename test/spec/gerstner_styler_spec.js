describe("Gerstner.Styler", function() {

  var s;

  beforeEach(function() {
    s = new Gerstner.Styler();
  });

  describe("#initialize", function() {

    it("should create a style el in .el and $el", function(){
      expect( s.el ).not.toBeUndefined();
      expect( s.$el ).not.toBeUndefined();
      expect( s.el.tagName ).toEqual("STYLE");
    });

  });

  describe("addStyle", function() {

    it("should add style object with addStyle", function() {
      var styles = {
        "color" : "#FFF",
        "font-family" : "Helvetica"
      };
      s.addStyle("body", styles);
      expect(s.styles["body"]).toBe(styles);
    });

    it("should merge with existing styles", function() {
      s.addStyle("body", {"color": "#FFF"});
      s.addStyle("body", {"font-family" : "Helvetica"});
      expect(s.styles["body"]["color"]).toBe("#FFF");
      expect(s.styles["body"]["font-family"]).toBe("Helvetica");
    });

  });

  describe("addFont", function() {

    it("should add a font-face declaration fron a Gerstner.Font object", function() {
      var f = new Gerstner.Font("RuneFont", {});
      f.addGlyph("a", "myglyphdata");
      s.addFont(f);
      expect(s.fonts.length).toBe(1);
    });

  });

  describe("#render", function() {

    it("should render styles", function() {
      var styles = {
        "color" : "#FFF",
        "font-family" : "Helvetica"
      };
      s.addStyle("body", styles);
      expect(s.render().$el.html()).toBe('body {\n  color : #FFF;\n  font-family : Helvetica;\n}\n\n');
    });

    it("should render fonts", function() {
      var f = new Gerstner.Font("RuneFont", {});
      f.addGlyph("a", "myglyphdata");
      s.addFont(f);
      s.render();
      expect(s.render().$el.html()).toBe('@font-face {\n  font-family : RuneFont;\n  src : url(data:font/woff;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxmb250IGlkPSJSdW5lRm9udCI+PGZvbnQtZmFjZSBmb250LWZhbWlseT0iUnVuZUZvbnQiPjwvZm9udC1mYWNlPjxnbHlwaCB1bmljb2RlPSJhIiBkPSJteWdseXBoZGF0YSI+PC9nbHlwaD48L2ZvbnQ+PC9kZWZzPjwvc3ZnPg==) format("svg");\n}\n\n');
    });

    it("should rerender updated fonts", function() {

    });

  });

  

});
