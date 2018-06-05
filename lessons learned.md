1. making use of SVG

if there is a viewbox setting you sometimes can modify the width and height to scale the image.

2. you should put the svg in divs and then apply classes to the div. (for example with transformations on hover). if you have one div that has in it more divs with SVGs you should use position:relative on it.

3. in my example, in order to overlap 2 svg's I used on one of the divs a negative margin, so this moved up the div with the second svg. Also you can apply z-index to the enclosing divs to change the order.

4. using svg in CSS to fill areas with repeating patterns
https://www.heropatterns.com/
http://www.patternify.com/

4. CSS3 - using transitions (the way it changes and time) and transformations (changing shapes and positions) - they can be used togheter for animations:

https://stackoverflow.com/questions/19186585/css-transforms-vs-transitions

5. using range sliders buttons in HTML, CSS and Javascript
https://www.w3schools.com/howto/howto_js_rangeslider.asp

6. ASCII chart character encoding
https://grox.net/utils/encoding.html

7. targeting css with javascript - you can change the values (for example of marginLeft or marginRight or width) - but you have to declare them in the css for that to work (you have to have the width on that element/class in order to change the width with javascript).

8. I couldn't get the transitions or animations to work because it is very complicated to pause them/stop them. Instead, I changed parameters like margin and width with javascript in the timer functions. It is not that smooth (especially if the steps are big when the time is short) but at least you can control and pause the animation - by using zIndex for example.

9. when targeting css with JS you have to use camelcase for the properties. For example z-index in css becomes zIndex in JS.