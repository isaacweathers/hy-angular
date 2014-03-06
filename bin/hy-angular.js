angular.module('hySplitPanel', []);
angular.module('hySplitPanel').directive('hySplitPanel', function () {
  return {
    template: '<div class=\'split-parent\'>' + '<aside class=\'panel-left\'>' + '<div class=" splitter-bar" ng-click=\'toggleLeftBar()\'> ' + '<div class=\'panel-left-arrow\'></div> ' + '</div>' + '<div class="panel-content">' + '</div>' + '</aside>' + '<aside class=\'panel-right\'>' + '<div class=" splitter-bar" ng-click=\'toggleRightBar()\'> ' + '<div class=\'panel-right-arrow\'></div> ' + '</div>' + '<div class="panel-content">' + '</div>' + '</aside>' + '<section class=\'panel-main\'>' + '</section>' + '</div>',
    restrict: 'E',
    transclude: true,
    link: function (scope, element, attrs, controller, transclude) {
      var templateElement = element[0];
      var headElement = angular.element(templateElement.querySelector('.split-parent'));
      headElement[0].id = attrs.splitPaneId || '';
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
      var expandCallback = scope.$eval(attrs.expandEvent) || function () {
        };
      var collapseCallback = scope.$eval(attrs.collapseEvent) || function () {
        };
      transclude(scope, function (clone) {
        for (var i = 0; i < clone.length; i++) {
          var el = angular.element(clone[i]);
          if (el.hasClass('leftPane')) {
            leftContent.append(clone[i]);
            hasLeftPane = true;
          }
          if (el.hasClass('contentPane')) {
            sectionElement.append(clone[i]);
          }
          if (el.hasClass('rightPane')) {
            rightContent.append(clone[i]);
            hasRightPane = true;
          }
        }
        if (!hasRightPane) {
          rightElement.remove();
        }
        if (!hasLeftPane) {
          leftElement.remove();
        }
      });
      var toggleLeft = function () {
        if (toggleLeftClose) {
          leftElement.css('width', leftElementWidth);
          sectionElement.css('left', leftElementWidth);
          expandCallback();
          toggleLeftClose = false;
        } else {
          leftElement.css('width', '8px');
          sectionElement.css('left', '8px');
          collapseCallback();
          toggleLeftClose = true;
        }
        leftArrowElement.toggleClass('panel-left-arrow');
        leftArrowElement.toggleClass('panel-right-arrow');
      };
      var toggleRight = function () {
        if (toggleRightClose) {
          rightElement.css('width', rightElementWidth);
          sectionElement.css('right', rightElementWidth);
          expandCallback();
          toggleRightClose = false;
        } else {
          rightElement.css('width', '8px');
          sectionElement.css('right', '8px');
          collapseCallback();
          toggleRightClose = true;
        }
        rightArrowElement.toggleClass('panel-left-arrow');
        rightArrowElement.toggleClass('panel-right-arrow');
      };
      scope.toggleLeftBar = toggleLeft;
      scope.toggleRightBar = toggleRight;
      if (toggleLeftClose) {
        leftArrowElement.toggleClass('panel-left-arrow');
        leftArrowElement.toggleClass('panel-right-arrow');
      }
      if (toggleRightClose) {
        rightArrowElement.toggleClass('panel-left-arrow');
        rightArrowElement.toggleClass('panel-right-arrow');
      }
      if (hasLeftPane) {
        toggleLeft();
      }
      if (hasRightPane) {
        toggleRight();
      }
    }
  };
});
'use strict';
angular.module('hyImage', []);
angular.module('hyImage').directive('hyImage', [
  '$timeout',
  '$window',
  function ($timeout, $window) {
    var findWidth = function (parentWidth, availableWidths) {
      console.log(parentWidth + '----');
      var width = 0;
      for (var i = availableWidths.length - 1; i >= 0; i--) {
        if (parentWidth > availableWidths[i]) {
          width = availableWidths[i];
        }
      }
      if (width === 0) {
        width = availableWidths[availableWidths.length - 1];
      }
      return width;
    };
    var findPixle = function (devicePixel, availablePixel) {
      var pixel = 1;
      availablePixel.sort(function (a, b) {
        return b - a;
      });
      for (var i = availablePixel.length - 1; i >= 0; i--) {
        if (devicePixel > availablePixel[i]) {
          pixel = availablePixel[i];
        }
      }
      return pixel === 1 ? '' : '-' + pixel + 'x';
    };
    var updateImage = function (tempString, parentWidth, availableWidths, availablePixel, element, scope) {
      var thisWidth = findWidth(parentWidth, availableWidths);
      var pixelRatio = $window.devicePixelRatio || 1;
      var thisPixel = findPixle(pixelRatio, availablePixel);
      scope.realImage = tempString.replace('||width||', thisWidth).replace('||pixelRatio||', thisPixel);
      var image = element.find('img');
      var himage = angular.element(image[0]);
      himage.on('load', function () {
        scope.imgLoaded = true;
        scope.$apply();
      });
      $timeout(function () {
        scope.$apply();
      });
      return thisWidth;
    };
    return {
      template: '<div><img ng-show="imgLoaded" ng-src="{{realImage}}"></img>' + '<img ng-hide="imgLoaded" src="{{imgSrc}}"></img></div>',
      restrict: 'E',
      replace: true,
      scope: {},
      link: function postLink(scope, element, attrs) {
        scope.imageTempUrl = attrs.imgSrc;
        scope.imgLoaded = false;
        var availableWidths = scope.$eval(attrs.sizes);
        var availablePixel = scope.$eval(attrs.pixel) || [
            1,
            2,
            3
          ];
        availableWidths.sort(function (a, b) {
          return b - a;
        });
        var p = element.parent();
        console.log(p.css('width'));
        var parentWidth = p[0].offsetWidth;
        angular.element(window).on('resize', function () {
          if (parentWidth !== p[0].offsetWidth) {
            updateImage(tempString, parentWidth, availableWidths, availablePixel, element, scope);
            parentWidth = p[0].offsetWidth;
          }
        });
        var tempString = scope.imageTempUrl;
        var thisWidth = updateImage(tempString, parentWidth, availableWidths, availablePixel, element, scope);
        scope.imgSrc = 'http://placehold.it/' + thisWidth;
        attrs.$observe('imgSrc', function (value) {
          updateImage(value, parentWidth, availableWidths, availablePixel, element, scope);
        });
      }
    };
  }
]);