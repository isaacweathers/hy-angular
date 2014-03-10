// ##hy-split-panel
// This is an angular directive for displaying split panels with colapsable left and right panels.  You can have only one
// or both displayed on the page.

// You can get this either by down loading the code or using bower.

//     bower install hy-angular
  
// Load the script files into your page

//     <script type="text/javascript" src="bower_components/hy-angular/bin/hy-angular.js"></script>
//     or
//     <script type="text/javascript" src="bower_components/hy-angular/bin/hy-angular.min.js"></script>
  
// Load the CSS file hyCss.css into your app.

//     <link rel="stylesheet" href="bower_components/hy-angular/css/hyCss.css" />

// Inject the module hySplitPanel into you app.  An example would be in your app.js

//     angular.module('yourApp', [
//      'ngCookies',
//      'ngResource',
//      'ngSanitize',
//      'ngRoute',
//      'hySplitPanel'
//      ])


// ##Useage
// To use this just use the following example.

//     <hy-split-panel left-width-'30%' split-pane-id='homePane'>
//       <div class='leftPane'>
//         <h2>Left Side</h2>
//       </div>
//       <div class='contentPane'>
//         <h2>Content</h2>
//       </div>
//     </hy-split-panel>
  
// This will display a left pane that is closed and a content pane in the middle.  When you click on the exspand bar it
// will expand to 30% of the page.

//     <hy-split-panel right-width-'30%' split-pane-id='homePane'>
//        <div class='rightPane'>
//         <h2>Right Side</h2>
//      </div>
//      <div class='contentPane'>
//        <h2>Content</h2>
//      </div>
//     </hy-split-panel>
  
// This will display a right pane that is closed and a content pane in the middle.  When you click on the exspand bar it
// will expand to 30% of the page.
// To display both left and right panes.

//     <hy-split-panel left-width-'30%' right-width-'30%' split-pane-id='homePane'>
//       <div class='leftPane'>
//         <h2>Left Side</h2>
//       </div>
//       <div class='rightPane'>
//         <h2>Right Side</h2>
//       </div>
//       <div class='contentPane'>
//         <h2>Content</h2>
//       </div>
//     </hy-split-panel>

// If you want to have the pane open by default add the attribute default-open.  you can add two callback functions with 

// >expand-event='someFunctionOnScope' 

// and 

// >collapseEvent='someFunctionOnScope'  

// The .split-parent css is where you can set the top of the directive if it is not displaying properly.

angular.module('hySplitPanel', []);

angular.module('hySplitPanel').
    directive('hySplitPanel', function(){
        // Runs during compile
        return {
            template: '<div class=\'split-parent\'>' +
                    '<aside class=\'panel-left\'>' +
                    '<div class=" splitter-bar" ng-click=\'toggleLeftBar()\'> ' +
                    '<div class=\'panel-left-arrow\'></div> ' +
                    '</div>' +
                    '<div class="panel-content">' +
                    '</div>' +
                    '</aside>' +
                    '<aside class=\'panel-right\'>' +
                    '<div class=" splitter-bar" ng-click=\'toggleRightBar()\'> '+
                    '<div class=\'panel-right-arrow\'></div> ' +
                    '</div>' +
                    '<div class="panel-content">' +
                    '</div>' +
                    '</aside>' +
                    '<section class=\'panel-main\'>' +
                    '</section>' +
                    '</div>' ,
        restrict: 'E',
        transclude:true,
            link: function(scope, element, attrs, controller, transclude) {
                var templateElement = element[0];
                var headElement = angular.element(templateElement.querySelector('.split-parent'));
                headElement[0].id = attrs.splitPaneId||'';
                var leftElementWidth = attrs.leftWidth || '8px';
                var rightElementWidth = attrs.rightWidth || '8px';
                var toggleLeftClose = attrs.defaultOpen || false;
                var toggleRightClose = attrs.defaultOpen || false;
                var hasLeftPane = false;
                var hasRightPane = false;
                var leftElement = angular.element(templateElement.querySelector('aside.panel-left'));
                var leftContent = angular.element(templateElement.querySelector('aside.panel-left .panel-content'));
                var rightElement = angular.element(templateElement.querySelector('aside.panel-right'));
                var rightContent = angular.element(templateElement.querySelector('aside.panel-right .panel-content'));
                var leftArrowElement = angular.element(templateElement.querySelector('aside.panel-left .splitter-bar > div'));
                var rightArrowElement = angular.element(templateElement.querySelector('aside.panel-right .splitter-bar > div'));
                
                var sectionElement = element.find('section');
                
                var expandCallback = scope.$eval(attrs.expandEvent) || function (){};
                var collapseCallback = scope.$eval(attrs.collapseEvent) || function (){};
                transclude(scope,function(clone){
                    for (var i = 0; i < clone.length; i++) {
                        var el =angular.element(clone[i]);
                        if(el.hasClass('leftPane')){
                            leftContent.append(clone[i]);
                            hasLeftPane = true;
                        }
                        if(el.hasClass('contentPane')){
                            sectionElement.append(clone[i]);
                        }
                        if(el.hasClass('rightPane')){
                            rightContent.append(clone[i]);
                            hasRightPane = true;
                        }
                    }
                    if(!hasRightPane){
                        rightElement.remove();
                    }
                    if(!hasLeftPane){
                        leftElement.remove();
                    }
                });
            
                var toggleLeft = function (){
                    if(toggleLeftClose){
                        leftElement.css('width',leftElementWidth);
                        sectionElement.css('left',leftElementWidth);
                        expandCallback();
                        toggleLeftClose = false;
                    }else{
                        leftElement.css('width','8px');
                        sectionElement.css('left','8px');
                        collapseCallback();
                        toggleLeftClose = true;
                    }
                    leftArrowElement.toggleClass('panel-left-arrow');
                    leftArrowElement.toggleClass('panel-right-arrow');
                    //element.toggleClass('shut-left');
                };

                var toggleRight = function (){
                    if(toggleRightClose){
                        rightElement.css('width',rightElementWidth);
                        sectionElement.css('right',rightElementWidth);
                        expandCallback();
                        toggleRightClose = false;
                    }else{

                        rightElement.css('width','8px');
                        sectionElement.css('right','8px');
                        collapseCallback();
                        toggleRightClose = true;
                    }
                    rightArrowElement.toggleClass('panel-left-arrow');
                    rightArrowElement.toggleClass('panel-right-arrow');
                    // element.toggleClass('shut-right');
                };


                scope.toggleLeftBar = toggleLeft;
                scope.toggleRightBar = toggleRight;
                if(toggleLeftClose){
                    leftArrowElement.toggleClass('panel-left-arrow');
                    leftArrowElement.toggleClass('panel-right-arrow');
                }
                if(toggleRightClose){
                    rightArrowElement.toggleClass('panel-left-arrow');
                    rightArrowElement.toggleClass('panel-right-arrow');
                }
                if(hasLeftPane){
                    toggleLeft();
                }
                if(hasRightPane) {
                    toggleRight();
                }
                }
        };
    });