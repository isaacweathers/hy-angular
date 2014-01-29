'use strict';
/*global describe:true,beforeEach:true,it:true,inject:true,expect:true,spyOn:true*/
describe('Directive: split-pane', function () {
    
    beforeEach(module('hySplitPanel'));

    var event = document.createEvent('MouseEvents');
    var element, scope, rootScope, compile, window;
    event.initMouseEvent('click', true, true, window, 1, 0, 0);
    console.log('first beforeEach');
    beforeEach(inject(function ($rootScope) {

        scope = $rootScope.$new();
        rootScope = $rootScope;
    }));
    beforeEach(inject(function ($compile, $window ) {
        compile = $compile;
        window = $window;
    }));

    it('should test only a content pane', function(){
        element = angular.element('<hy-split-panel  '+
            ' >' +
            '<div class="contentPane"> <span> contentTest </span> </div>'+
            '</hy-split-panel>');
        element = compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('  contentTest  ');
        var leftPane = angular.element(element[0].querySelector('aside.panel-left'));
        expect(leftPane.length).toBe(0);
        var rightPane = angular.element(element[0].querySelector('aside.panel-right'));
        expect(rightPane.length).toBe(0);
    });

    it('should test left pane creation', function(){
        element = angular.element('<hy-split-panel  '+
            'split-pane-id="myTree" >' +
            '<div class="leftPane"> <span> leftPane </span> </div>' +
            '<div class="contentPane"> <span> contentTest </span> </div>'+
            '</hy-split-panel>');
        element = compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('    leftPane    contentTest  ');
        var leftPane = angular.element(element[0].querySelector('aside.panel-left'));
        expect(leftPane.length).toBe(1);
        expect(leftPane.text()).toBe('    leftPane  ');
        var rightPane = angular.element(element[0].querySelector('aside.panel-right'));
        expect(rightPane.length).toBe(0);
    });

    it('should test right pane creation', function(){
        element = angular.element('<hy-split-panel  '+
            'split-pane-id="myTree" >' +
            '<div class="rightPane"> <span> rightPane </span> </div>' +
            '<div class="contentPane"> <span> contentTest </span> </div>'+
            '</hy-split-panel>');
        element = compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('    rightPane    contentTest  ');
        var leftPane = angular.element(element[0].querySelector('aside.panel-left'));
        expect(leftPane.length).toBe(0);
        var rightPane = angular.element(element[0].querySelector('aside.panel-right'));
        expect(rightPane.length).toBe(1);
        expect(rightPane.text()).toBe('    rightPane  ');
    });

    it('should test both pane creation', function(){
        element = angular.element('<hy-split-panel  '+
            'split-pane-id="myTree" >' +
            '<div class="leftPane"> <span> leftPane </span> </div>' +
            '<div class="rightPane"> <span> rightPane </span> </div>' +
            '<div class="contentPane"> <span> contentTest </span> </div>'+
            '</hy-split-panel>');
        element = compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('    leftPane      rightPane    contentTest  ');
        var leftPane = angular.element(element[0].querySelector('aside.panel-left'));
        expect(leftPane.length).toBe(1);
        expect(leftPane.text()).toBe('    leftPane  ');
        var rightPane = angular.element(element[0].querySelector('aside.panel-right'));
        expect(rightPane.length).toBe(1);
        expect(rightPane.text()).toBe('    rightPane  ');
    });
    it('Test default is closed for left pane', function(){

        element = angular.element('<hy-split-panel  '+
            'split-pane-id="myTree" left-width="40px">' +
            '<div class="leftPane"> <span> leftPane </span> </div>' +
            '<div class="contentPane"> <span> contentTest </span> </div>'+
            '</hy-split-panel>');
        element = compile(element)(scope);
        scope.$digest();
        var leftPane = angular.element(element[0].querySelector('aside.panel-left'));
        expect(leftPane.css('width')).toBe('8px');
    });
    it('Test toggle of left pane', function(){

        element = angular.element('<hy-split-panel  '+
            'split-pane-id="myTree" left-width="40px">' +
            '<div class="leftPane"> <span> leftPane </span> </div>' +
            '<div class="contentPane"> <span> contentTest </span> </div>'+
            '</hy-split-panel>');
        element = compile(element)(scope);
        scope.$digest();
        var leftDiv = angular.element(element[0].querySelector('aside.panel-left div'));
        var leftSpan = angular.element(element[0].querySelector('aside.panel-left'));
        leftDiv[0].dispatchEvent(event);
        expect(leftSpan.css('width')).toBe('40px');
        leftDiv[0].dispatchEvent(event);
        expect(leftSpan.css('width')).toBe('8px');
    });

    it('Test default is closed for right pane', function(){

        element = angular.element('<hy-split-panel  '+
            'split-pane-id="myTree" right-width="40px">' +
            '<div class="rightPane"> <span> rightPane </span> </div>' +
            '<div class="contentPane"> <span> contentTest </span> </div>'+
            '</hy-split-panel>');
        element = compile(element)(scope);
        scope.$digest();
        var rightPane = angular.element(element[0].querySelector('aside.panel-right'));
        expect(rightPane.css('width')).toBe('8px');
    });
    it('Test toggle of right pane', function(){

        element = angular.element('<hy-split-panel  '+
            'split-pane-id="myTree" right-width="40px">' +
            '<div class="rightPane"> <span> rightPane </span> </div>' +
            '<div class="contentPane"> <span> contentTest </span> </div>'+
            '</hy-split-panel>');
        element = compile(element)(scope);
        scope.$digest();
        var rightDiv = angular.element(element[0].querySelector('aside.panel-right div'));
        var rightSpan = angular.element(element[0].querySelector('aside.panel-right'));
        rightDiv[0].dispatchEvent(event);
        expect(rightSpan.css('width')).toBe('40px');
        rightDiv[0].dispatchEvent(event);
        expect(rightSpan.css('width')).toBe('8px');
    });

    it('Test setting the left pane to be open at start', function (){
        element = angular.element('<hy-split-panel  '+
            'split-pane-id="myTree" left-width="40px" default-open=true >' +
            '<div class="leftPane"> <span> leftPane </span> </div>' +
            '<div class="contentPane"> <span> contentTest </span> </div>'+
            '</hy-split-panel>');
        element = compile(element)(scope);
        scope.$digest();
        var leftPane = angular.element(element[0].querySelector('aside.panel-left'));
        expect(leftPane.css('width')).toBe('40px');
    });
    it('Test setting the right pane to be open at start', function(){

        element = angular.element('<hy-split-panel  '+
            'split-pane-id="myTree" right-width="40px" default-open=true>' +
            '<div class="rightPane"> <span> rightPane </span> </div>' +
            '<div class="contentPane"> <span> contentTest </span> </div>'+
            '</hy-split-panel>');
        element = compile(element)(scope);
        scope.$digest();
        var rightPane = angular.element(element[0].querySelector('aside.panel-right'));
        expect(rightPane.css('width')).toBe('40px');
    });

    it('Test both panes open on page.', function(){

        element = angular.element('<hy-split-panel  '+
            'split-pane-id="myTree" right-width="40px" left-width="40px" default-open=true>' +
            '<div class="rightPane"> <span> rightPane </span> </div>' +
            '<div class="leftPane"> <span> leftPane </span> </div>' +
            '<div class="contentPane"> <span> contentTest </span> </div>'+
            '</hy-split-panel>');
        element = compile(element)(scope);
        scope.$digest();
        var rightPane = angular.element(element[0].querySelector('aside.panel-right'));
        expect(rightPane.css('width')).toBe('40px');
        var leftPane = angular.element(element[0].querySelector('aside.panel-left'));
        expect(leftPane.css('width')).toBe('40px');

    });
    it('Test toggle only the one that clicks..', function(){

        element = angular.element('<hy-split-panel  '+
            'split-pane-id="myTree" right-width="40px" left-width="40px" default-open=true>' +
            '<div class="rightPane"> <span> rightPane </span> </div>' +
            '<div class="leftPane"> <span> leftPane </span> </div>' +
            '<div class="contentPane"> <span> contentTest </span> </div>'+
            '</hy-split-panel>');
        element = compile(element)(scope);
        scope.$digest();
        var rightPane = angular.element(element[0].querySelector('aside.panel-right'));
        expect(rightPane.css('width')).toBe('40px');
        var leftPane = angular.element(element[0].querySelector('aside.panel-left'));
        expect(leftPane.css('width')).toBe('40px');
        var rightDiv = angular.element(element[0].querySelector('aside.panel-right div'));
        rightDiv[0].dispatchEvent(event);
        expect(rightPane.css('width')).toBe('8px');
        expect(leftPane.css('width')).toBe('40px');
        var leftDiv = angular.element(element[0].querySelector('aside.panel-left div'));
        leftDiv[0].dispatchEvent(event);
        expect(rightPane.css('width')).toBe('8px');
        expect(leftPane.css('width')).toBe('8px');
    });
});