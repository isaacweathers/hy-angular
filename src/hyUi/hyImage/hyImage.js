// ##hy-image
// This is a responsive image solution based on the 
// work done by BBC [Iamger.js](https:ithub.com/BBC-News/Imager.js/) written in
// AngularJS
// 
// This works by
// * loading any image once
// * loading the most suitable sized image
// 
// ---------
//     
//     <hy-image img-src="somesource/image||width||.jpg" sizes="[400,1080]" pixel="[1,2,3]"></hy-image>
// This will create an img with the src of 'somesource/image400.jpg' or  'somesource/image1080.jpg' depending
// for the correct width.
// 
//     <hy-image img-src="somesource/image||pixel||.jpg" sizes="[400,1080]" pixel="[1,2,3]"></hy-image>
// 
// This will create an img with the srouce somesource/image.jpg for ratio of 1 for apple phones it 
// will create src with somesrouce/image-2x.jpg
// As you resize the window the image will be replace with the correct size image.
// 
'use strict';

angular.module('hyImage', []);

angular.module('hyImage')
.directive('hyImage', function ($timeout,$window) {
    var findWidth = function (parentWidth, availableWidths){
        var width = 0;
        for (var i = availableWidths.length - 1; i >= 0; i--) {
          if(parentWidth > availableWidths[i]){
            width = availableWidths[i];
          }
        }
        if(width === 0 ){
          width = availableWidths[availableWidths.length -1];
        }
        return width;
      };

    var findPixle = function (devicePixel, availablePixel){
      var pixel = 1;
      availablePixel.sort(function( a, b){
        return (b-a);
      });
      for (var i = availablePixel.length - 1; i >= 0; i--) {
        if(devicePixel >= availablePixel[i]){
          pixel = availablePixel[i];
        }
      }
      return pixel === 1 ? '' : '-' + pixel + 'x';
    };

    var updateImage = function (tempString, parentWidth, availableWidths, availablePixel, element, scope){
      var thisWidth = findWidth(parentWidth, availableWidths);
      var pixelRatio = $window.devicePixelRatio || 1;
      var thisPixel = findPixle(pixelRatio, availablePixel);
      // var widthString = tempString.replace('||width||', thisWidth);
      scope.realImage = tempString.replace('||width||', thisWidth).replace('||pixelRatio||', thisPixel);
      var image = element.find('img');
      var himage = angular.element(image[0]);

      himage.on('load', function (){
        scope.imgLoaded = true;
        scope.$apply();
      });
      $timeout(function(){
        scope.$apply();
      });
      return thisWidth;
    };
    return {
        template: '<div><img ng-show="imgLoaded" ng-src="{{realImage}}"></img>' +
        '<img ng-hide="imgLoaded" src="{{imgSrc}}"></img></div>',
        restrict: 'E',
        replace: true,
        scope:{

        },
        link: function postLink(scope, element, attrs) {
            scope.imageTempUrl = attrs.imgSrc;
            scope.imgLoaded = false;
            var availableWidths = scope.$eval(attrs.sizes);
            var availablePixel = scope.$eval(attrs.pixel)|| [1,2,3];
            availableWidths.sort(function( a, b){
                return (b-a);
              });
            var p = element.parent();
            var parentWidth = p[0].offsetWidth;
            if(parentWidth === 0){
              parentWidth = p.css('width').slice(0,-2);
            }
            angular.element(window).on('resize', function (){
                if(parentWidth !== p[0].offsetWidth){
                  updateImage(tempString, parentWidth, availableWidths,availablePixel, element, scope);
                  parentWidth = p[0].offsetWidth;
                }
              });
            var tempString = scope.imageTempUrl;
            var thisWidth = updateImage(tempString, parentWidth, availableWidths,availablePixel, element, scope);
            scope.imgSrc = 'http://placehold.it/'+thisWidth;
            attrs.$observe('imgSrc', function (value){
              updateImage(value, parentWidth, availableWidths,availablePixel, element, scope);
            });
          }
      };
  });


