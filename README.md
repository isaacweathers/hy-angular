hy-angular
==========

angular modules directives.

##Requirements
AngularJS 1.2 >


##hy-split-panel
This is an angular directive for displaying split panels with colapsable left and right panels.  You can have only one
or both displayed on the page.

You can get this either by down loading the code or using bower.

  bower install hy-angular
  
Load the script files into your page

  <script type="text/javascript" src="bower_components/hy-angular/bin/hy-angular.js"></script>
  or
  <script type="text/javascript" src="bower_components/hy-angular/bin/hy-angular.min.js"></script>
  
Load the CSS file hyCss.css into your app.

  <link rel="stylesheet" href="bower_components/hy-angular/css/hyCss.css" />
  
##Useage
To use this just use the following example.

  <hy-split-panel left-width-'30%' split-pane-id='homePane'>
    <div class='leftPane'>
      <h2>Left Side</h2>
    </div>
    <div class='contentPane'>
      <h2>Content</h2>
    </div>
  </hy-split-panel>
  
This will display a left pane that is closed and a content pane in the middle.  When you click on the exspand bar it
will expand to 30% of the page.


  <hy-split-panel right-width-'30%' split-pane-id='homePane'>
    <div class='rightPane'>
      <h2>Right Side</h2>
    </div>
    <div class='contentPane'>
      <h2>Content</h2>
    </div>
  </hy-split-panel>
  
This will display a right pane that is closed and a content pane in the middle.  When you click on the exspand bar it
will expand to 30% of the page.
To display both left and right panes.

  <hy-split-panel left-width-'30%' right-width-'30%' split-pane-id='homePane'>
    <div class='leftPane'>
      <h2>Left Side</h2>
    </div>
    <div class='rightPane'>
      <h2>Right Side</h2>
    </div>
    <div class='contentPane'>
      <h2>Content</h2>
    </div>
  </hy-split-panel>

If you want to have the pane open by default add the attribute default-open.  you can add two callback functions with 

>expand-event='someFunctionOnScope' 

and 

>collapseEvent='someFunctionOnScope'  

The .split-parent css is where you can set the top of the directive if it is not displaying properly.
