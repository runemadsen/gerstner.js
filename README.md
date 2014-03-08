Gerstner.js
======================

Gerstner.js is an experiment in dynamically creating stylesheets via Javascript. It can be used to create generative color schemes, flexible grid systems, etc. It's still in an early stage, but look in the `examples` folder for how to use it.

If you like tests, there's also a bunch of those to help you.


Gerstner.Styler
---------------

This class can be used to generate a `<style>` element that can be inserted in the `<head>` section of a web page.

This is how to dynamically create an empty `<style>` tag on a webpage:

```html
<html>
  <head>
    <script type="text/javascript" src="gerstner.js"></script>
    <script type="text/javascript">
      $(function() 
      {
        var s = new Gerstner.Styler();
        $('head').append(s.render().el);
      });
    </script>
  </head>
  <body>
  </body>
</html>
```

This, of course, won't do much. But once you have a `Gerstner.Styler` object, you can add styles directly in JS:

```javascript
var s = new Gerstner.Styler();

s.addStyle(".myclass", {
  "background-color" : "red",
  "font-size" : "16px"
});  

$('head').append(s.render().el);
```

As you can see, the first argument to the `addStyle` function is the CSS selector, and the second argument is an object with key/value pairs corresponding to the CSS keys and values. The code above will produce the following tag:

```html
<style>
  .myclass {
    background-color: red;
    font-size: 16px;
  }
</style>
```

You can add as many styles as you want, and the library will automatically merge duplicated selectors.

For a simple example of `Gerstner.Styler` in use, see the `generative_color_scheme.html` example in the `/examples` folder.


Gerstner.random()
-----------------

Gerstner ships with a number of functions that makes it easier to generate random values for your CSS. The simplest is `Gerstner.random` that can generate a number between two numbers:

```javascript
// generate a random number between 10 and 20
var ran = Gerstner.random(10, 20);
```

You can also generate a number between zero and a higher number, by passing in a single parameter:

```javascript
// generate a random number between 0 and 20
var ran = Gerstner.random(20);
```

Gerstner.WeightedRandom
-----------------------

The `WeightedRandom` class can help you randomly pick an object from a list of objects, each having a specified weight that determines its chance of getting picked.

Here's a simple example of how to add a number of objects, and have the class pick a value for you.

```javascript
var r = new Gerstner.WeightedRandom();
r.add("Zach", 1);
r.add("Steve", 3);
r.add("Rune", 2);
var randomName = r.random();
```

Above, "Steve" has 3 times the chance of getting picked over `"Zach"`, while `"Rune"` has 2 times the chance over `"Zach"`.

You can pass any object to the `WeightedRandom` class, as shown in the following code where we use `WeightedRandom` to pick a setting for our fonts, and pass that to the `Gerstner.Styler` object.

```javascript
var r = new Gerstner.WeightedRandom();
r.add({ "font-size" : 14, "font-family" : "Helvetica"}, 5);
r.add({ "font-size" : 13, "font-family": "Arial"}, 4);

var s = new Gerstner.Styler();
s.addStyle("body", r.random());
```

Gerstner.Font
-------------

The `Gerstner.Font` class can be used to generate SVG web fonts via JS. It can generate a base64 encoded SVG string that can be used with a `Gerstner.Styler` object to generate a valid `font-face` rule. Because these fonts are created dynamically, you can change change and rerender them over time, while still preserving copy/paste functionality.

First, you have to create a `Gerstner.Font` object. The constructor takes a name of the new font and an object of attributes that will be added to the `font-face` SVG tag. Here's a simple example.

```js
var f = new Gerstner.Font("myfont", {
  "units-per-em" : "50"
});
```

Now you can start adding glyphs to your font object. The `addGlyph` function takes the unicode character of the glyph, the SVG glyph path data, and an optional object of extra attributes for the glyph tag. Here's an example of a glyph made up of a triangle with a kerning of 5 pixels. 

```js
f.addGlyph("a", "M 50 0 L 50 50 L 0 50 Z", {
  "horiz-adv-x" : 55
});
```

Keep in mind that `Gerstner.js` won't help you generate the glyph path data. You will need to do that yourself, or via a library like `d3.js`. If you use d3, please know that the SVG glyph tag specification only supports a single "d" attribute and no nested `path` tags, which goes against d3's general philosophy.

Now that you've added one or many glyphs to your font, you can add the font to your `Gerstner.Styler` object. The next time it renders, it will have a generate `font-face` rule that you can use in your CSS (as shown in the `addStyle` command here).

```js
s.addFont(f);
s.addStyle("h1", {
  "font-family": "myfont",
  "font-size" : "50px"
});
```

Please visit the [examples](/examples/generative_webfont) to see it in use.

Generative Color
----------------

This library doesn't ship with a built-in color library, but it's easy to generate colors with such brilliant libraries as [color.js](https://github.com/brehaut/color-js) or [toxiclibs.js](http://haptic-data.com/toxiclibsjs/)
