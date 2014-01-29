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