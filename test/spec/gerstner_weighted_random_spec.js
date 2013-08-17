describe("Gerstner.WeightedRandom", function() {

  var r;

  beforeEach(function() {
    r = new Gerstner.WeightedRandom();
  });

  it("should add, sort elements, and add to total weight", function()
  {
    r.add("Zach", 1);
    r.add("Steve", 3);
    r.add("Rune", 2);

    expect(r.totalWeight).toBe(6);
    expect(r.elements[0].value).toEqual("Steve");
    expect(r.elements[1].value).toEqual("Rune");
    expect(r.elements[2].value).toEqual("Zach");
  });

  it("should give back a random value back", function()
  {
    r.add("Zach", 1);
    r.add("Steve", 3);
    r.add("Rune", 2);

    expect(["Zach", "Steve", "Rune"]).toContain(r.random());
  });

  it("should pick correct values", function() {
    r.add("Zach", 1);
    r.add("Steve", 10);
    
    var results = [];
    results["Zach"] = 0;
    results["Steve"] = 0;

    _.times(5000, function() {
      var ran = r.random();
      results[ran] += 1;
    });

    var ratio = Math.round(results["Steve"] / results["Zach"]);
    expect(ratio).toBeLessThan(12);
    expect(ratio).toBeGreaterThan(8);
  });

});
