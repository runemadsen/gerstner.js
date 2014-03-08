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
    this.fonts = [];
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

    addFont : function(font) {
      this.fonts.push(font);
    },

    renderCSSRule : function(selector, styles)
    {
      this.$el.append(selector + " {\n");
      _.each(styles, function(cssVal, cssProp) {
        this.$el.append("  " + cssProp + " : " + cssVal + ";\n");
      }, this);
      this.$el.append("}\n\n");
    },

    render : function()
    {
      this.$el.empty();

      // render fonts
      _.each(this.fonts, function(font) {
        font.render();
        this.renderCSSRule("@font-face", {
          "font-family" : font.fontName,
          "src" : 'url(data:font/woff;charset=utf-8;base64,'+font.getBase64()+') format("svg")'
        });
      }, this);

      // render styles
      _.each(this.styles, function(styles, selector) {
        this.renderCSSRule(selector, styles);
      }, this);

      return this;
    }

  });

  // Gerstner.random
  // ---------------------------------------------------------

  Gerstner.random = function(low, high)
  {
    if(high)
      return (Math.random() * (high-low)) + low;
    else
      return Math.random() * low;
  }

  // Gerstner.WeightedRandom
  // ---------------------------------------------------------

  var WeightedRandom = Gerstner.WeightedRandom = function()
  {
    this.totalWeight = 0;
    this.elements = [];
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
    },

    random : function()
    {
      var ran = Math.random() * this.totalWeight;
      var sum = this.totalWeight;
      return _.find(this.elements, function(element) {
        sum -= element.weight;
        return sum <= ran;
      }).value;
    }

  });

  // Gerstner.Font
  // ---------------------------------------------------------

  var Font = Gerstner.Font = function(fontName, settings)
  {
    this.fontName = fontName;
    this.settings = settings;
    this.$el = $("<div></div>");
    this.el = this.$el[0];
    this.glyphs = {};
  }

  _.extend(Font.prototype, {

    $: function(selector) {
      return this.$el.find(selector);
    },

    addGlyph : function(unicode, d, attribs) {
      this.glyphs[unicode] = {
        d : d,
        attribs : attribs
      }
    },

    render : function()
    {
      this.$el.html("<svg><defs><font><font-face></font-face></font></defs></svg>");

      // add root attributes
      this.$("svg").attr('xmlns', 'http://www.w3.org/2000/svg');
      this.$("svg").attr('width', '100%');
      this.$("svg").attr('height', '100%');
  
      // add font attributes
      this.$("font").attr("id", this.fontName);
      
      if(this.settings["horiz-adv-x"])
      {
        this.$("font").attr("horiz-adv-x", this.settings["horiz-adv-x"]);
        delete this.settings["horiz-adv-x"];
      }

      // add font-face attributes
      this.$("font-face").attr("font-family", this.fontName);
      _.each(this.settings, function(v,k) { this.$("font-face").attr(k, v); }, this);

      // add glyphs
      _.each(this.glyphs, function(v,k) {
        var gel = $("<glyph></glyph>");
        gel.attr("unicode", k);
        gel.attr("d", v.d);
        _.each(v.attribs, function(v2,k2) { gel.attr(k2, v2); });
        this.$("font").append(gel);
      }, this);
    },

    getBase64 : function()
    {
      return window.btoa(this.el.innerHTML);
    }

  });

}).call(this);