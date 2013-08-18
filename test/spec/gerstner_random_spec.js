describe("Gerstner.random()", function() {

  it("should generate a number with two values", function(){
    var ran = Gerstner.random(10, 20);
    expect(ran).toBeGreaterThan(9);
    expect(ran).toBeLessThan(21);
  });

  it("should generate a number with one value", function() {
    var ran = Gerstner.random(20);
    expect(ran).toBeGreaterThan(-1);
    expect(ran).toBeLessThan(21);
  });

});
