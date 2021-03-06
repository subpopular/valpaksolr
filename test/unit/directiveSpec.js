// Generated by CoffeeScript 1.6.2
(function() {
  'use strict';  describe('directives', function() {
    beforeEach(function() {
      return this.addMatchers({
        toHaveClass: function(classname) {
          return this.actual.hasClass(classname);
        },
        toNotHaveClass: function(classname) {
          return !this.actual.hasClass(classname);
        }
      });
    });
    return describe('Dropdowns', function() {
      var $compile, $document, $rootScope, elem1, elem2;

      $compile = null;
      $rootScope = null;
      $document = null;
      elem1 = null;
      elem2 = null;
      beforeEach(module('vp.dropdowns'));
      beforeEach(inject([
        '$compile', '$rootScope', '$document', function($c, $r, $d) {
          $compile = $c;
          $rootScope = $r;
          $document = $d;
          elem1 = angular.element('<div dropdown-menu>\n    <button>DD 1</button>\n    <ul dropdown-options>\n        <li>Item 1</li>\n        <li>Item 2</li>\n        <li>Item 3</li>\n    </ul>\n</div>');
          elem2 = angular.element('<div dropdown-menu>\n    <button>DD 2</button>\n    <ul dropdown-options>\n        <li>Item 1</li>\n        <li>Item 2</li>\n        <li>Item 3</li>\n    </ul>\n</div>');
          $document.find('body').append(elem1);
          $document.find('body').append(elem2);
          $compile(elem1)($rootScope);
          $compile(elem2)($rootScope);
          return $rootScope.$digest();
        }
      ]));
      afterEach(function() {
        return $document.find('.vp-dropdown').remove();
      });
      it('should compile the directive', function() {
        expect(elem1).toHaveClass('vp-dropdown');
        return expect(elem1).toNotHaveClass('dropdown-active');
      });
      it('should assign a unique id', function() {
        var elem1UID, elem2UID;

        elem1UID = elem1.scope().uid;
        elem2UID = elem2.scope().uid;
        expect(elem1UID).toBeDefined();
        expect(elem2UID).toBeDefined();
        return expect(elem1UID).not.toBe(elem2UID);
      });
      it('should assign click handler by default', function() {
        var elem1toggleEvent;

        elem1toggleEvent = elem1.scope().toggleEvent;
        return expect(elem1toggleEvent).toBe('click');
      });
      it('should show/hide dropdown when clicked', function() {
        var elem1Scope;

        elem1Scope = elem1.scope();
        expect(elem1Scope.isActive).toBeFalsy();
        elem1.click();
        expect(elem1).toHaveClass('dropdown-active');
        expect(elem1Scope.isActive).toBeTruthy();
        elem1.click();
        expect(elem1).toNotHaveClass('dropdown-active');
        return expect(elem1Scope.isActive).toBeFalsy();
      });
      it('should close other dropdowns when clicked', function() {
        elem1.click();
        expect(elem1).toHaveClass('dropdown-active');
        expect(elem2).toNotHaveClass('dropdown-active');
        elem2.click();
        expect(elem2).toHaveClass('dropdown-active');
        return expect(elem1).toNotHaveClass('dropdown-active');
      });
      it('should close when clicking anywhere in document', function() {
        var elem1Scope;

        elem1Scope = elem1.scope();
        spyOn(elem1Scope, 'closeDropdown').andCallThrough();
        elem1.click();
        expect(elem1).toHaveClass('dropdown-active');
        $document.click();
        expect(elem1).toNotHaveClass('dropdown-active');
        return expect(elem1Scope.closeDropdown).toHaveBeenCalled();
      });
      return it('should close when clicking inner items', function() {
        elem1.click();
        expect(elem1).toHaveClass('dropdown-active');
        elem1.find('li').eq(0).click();
        return expect(elem1).toNotHaveClass('dropdown-active');
      });
    });
  });

}).call(this);

/*
//@ sourceMappingURL=directiveSpec.map
*/
