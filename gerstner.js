(function() {

  var root = this;
  var Gerstner = root.Gerstner = {};

  // Gerstner.Styler
  // ---------------------------------------------------------

  var Styler = Gerstner.Styler = function()
  {
    this.$el = $("<style></style>");
    this.el = this.$el[0];
    this.styles = {};
  }

  _.extend(Styler.prototype, {

    $: function(selector) {
      return this.$el.find(selector);
    },

    addStyle : function(selector, styles) {
      if(this.styles[selector])
        _.extend(this.styles[selector], styles);
      else
        this.styles[selector] = styles;
    },

    render : function()
    {
      this.$el.empty();

      _.each(this.styles, function(styles, selector) {
        this.$el.append(selector + " {\n");
        _.each(styles, function(cssVal, cssProp) {
          this.$el.append("  " + cssProp + " : " + cssVal + ";\n");
        }, this);
        this.$el.append("}\n\n");
      }, this);

      return this;
    }

  });

  // Gerstner.WeightedRandom
  // ---------------------------------------------------------

  var WeightedRandom = Gerstner.WeightedRandom = function()
  {
    this.totalWeight = 0;
    this.elements = [];
    this.initialize.apply(this, arguments);
  }

  _.extend(WeightedRandom.prototype, {

    initialize : function()
    {
    
    },

    add : function(value, weight)
    {
      this.totalWeight += weight;
      this.elements.push({
        value  : value,
        weight : weight
      });
      this.elements = _.sortBy(this.elements, function(element){
        return -element.weight;
      });
    }

  });

  

  // Gerstner.Grid
  // ---------------------------------------------------------



}).call(this);