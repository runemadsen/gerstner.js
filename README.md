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

Generative Color
----------------

This library doesn't ship with a built-in color library, but it's easy to generate colors with such brilliant libraries as [color.js](https://github.com/brehaut/color-js) or [toxiclibs.js](http://haptic-data.com/toxiclibsjs/)
