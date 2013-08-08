describe("Gerstner.Grid", function() {

  var g;

  beforeEach(function() {
    g = new Gerstner.Grid();
  });

  it("should generate a grid", function() {
    g.setColumns(12);
    g.setWidth(900);
    g.setGutter(10);
    var styles = g.getStyles();

    expect(styles[".container"]["margin"]).toEqual("0 auto");

    expect(styles[".container"]["margin"]).toEqual("0 auto");

    // .row
  })

});
