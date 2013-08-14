Gerstner.js
======================

Gerstner.js is an experiment in dynamically creating stylesheets via Javascript. It can be used to create generative color schemes, flexible grid systems, etc. It's still in an early stage, but look in the `examples` folder for how to use it.

If you like tests, there's also a bunch of those to help you.


Gerstner.Styler
---------------

This is the only class in the library right now, and it can be used to generate a `<style>` element that can be inserted in the `<head>` section of a web page.

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

```javascripts
var s = new Gerstner.Styler();

s.addStyle(".myclass", {
  "background-color" : "red",
  "font-size" : "16px"
});  

$('head').append(s.render().el);
```

As you can see, the first argument to the `addStyle` function is the CSS selector, and the second argument is an object with key/value pairs corresponsing to the CSS keys and values. The code above will produce the following tag:

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
