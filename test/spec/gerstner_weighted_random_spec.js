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

});
