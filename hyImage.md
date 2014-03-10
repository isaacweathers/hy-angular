##hy-image
This is a responsive image solution based on the 
work done by BBC [Imager.js](https://github.com/BBC-News/Imager.js) written in
AngularJS

This works by
* loading any image once
* loading the most suitable sized image

---------
    
    <hy-image img-src="somesource/image||width||.jpg" sizes="[400,1080]" pixel="[1,2,3]"></hy-image>
This will create an img with the src of 'somesource/image400.jpg' or  'somesource/image1080.jpg' depending
for the correct width.

    <hy-image img-src="somesource/image||pixel||.jpg" sizes="[400,1080]" pixel="[1,2,3]"></hy-image>

This will create an img with the srouce somesource/image.jpg for ratio of 1 for apple phones it 
will create src with somesrouce/image-2x.jpg
As you resize the window the image will be replace with the correct size image.
