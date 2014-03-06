'use strict';
/*global describe:true,beforeEach:true,it:true,inject:true,expect:true,spyOn:true*/
describe('Directive: split-pane', function () {
    
    beforeEach(module('hyImage'));
    var event = document.createEvent('MouseEvents');
    var element, scope, rootScope, compile, window;
    event.initMouseEvent('click', true, true, window, 1, 0, 0);
    beforeEach(inject(function ($rootScope, $compile, $window ) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        compile = $compile;
        window = $window;
        
    }));
    it('should test create Image', function(){
        element = angular.element('<div style="width:400px"><hy-image sizes="[100,200,400,600]" pixel="[1]"  img-src = "image/myimage||width||||pixelRatio||.jpg" '+
            ' >' +
            '</hy-image> </div>');
        element = compile(element)(scope);
        scope.$digest();
        expect(scope.$$childHead.realImage).toBe('image/myimage100.jpg');
    });
});