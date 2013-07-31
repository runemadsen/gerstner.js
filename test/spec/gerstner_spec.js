/* GHAPI Stubbing
------------------------------------------------------------------- */

describe("Gerstner.Styler", function() {

  var s;

  beforeEach(function() {
    s = new Gerstner.Styler();
  });

  it("should create a style el in .el and $el", function(){
    expect( s.el ).not.toBeUndefined();
    expect( s.$el ).not.toBeUndefined();
    expect( s.el.tagName ).toEqual("STYLE");
  });

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

  it("should render styles into the styles tag correctly", function() {
    var styles = {
      "color" : "#FFF",
      "font-family" : "Helvetica"
    };
    s.addStyle("body", styles);
    expect(s.render().$el.html()).toBe('body {\n  color : #FFF;\n  font-family : Helvetica;\n}\n\n');
  });

  // it should generate a grid system into it
});
