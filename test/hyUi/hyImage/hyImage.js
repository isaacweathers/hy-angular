'use strict';
/*global describe:true,beforeEach:true,it:true,inject:true,expect:true,spyOn:true*/
describe('Directive: Image', function () {
    
    beforeEach(module('hyImage'));
    var element, scope, rootScope, compile, window, httpBackend;
    beforeEach(inject(function ($rootScope, $compile, $window,$httpBackend ) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        compile = $compile;
        window = $window;
        httpBackend = $httpBackend;
        
    }));
    it('should test create Image', function(){
        element = angular.element('<div style="width:100px"><hy-image sizes="[100,200,400,600]" pixel="[1]"  img-src = "image/myimage||width||||pixelRatio||.jpg" '+
            ' >' +
            '</hy-image> </div>');
        element = compile(element)(scope);
        scope.$digest();
        expect(scope.$$childHead.realImage).toBe('image/myimage100.jpg');
    });
    it('should test create Image and use a image that will fit in 400 pixel div.', function(){
        element = angular.element('<div style="width:500px"><hy-image sizes="[100,200,400,600]" pixel="[1]"  img-src = "image/myimage||width||||pixelRatio||.jpg" '+
            ' >' +
            '</hy-image> </div>');
        element = compile(element)(scope);
        scope.$digest();
        expect(scope.$$childHead.realImage).toBe('image/myimage400.jpg');
    });
    it('should test create Image and use a image that will fit in 400 pixel div and pixelRatio 2', function(){
        window.devicePixelRatio =2;
        element = angular.element('<div style="width:500px"><hy-image sizes="[100,200,400,600]" pixel="[1,2]"  img-src = "image/myimage||width||||pixelRatio||.jpg" '+
            ' >' +
            '</hy-image> </div>');
        element = compile(element)(scope);
        scope.$digest();
        expect(scope.$$childHead.realImage).toBe('image/myimage400-2x.jpg');
    });
    
});

