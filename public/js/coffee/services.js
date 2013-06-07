// Generated by CoffeeScript 1.6.2
(function() {
  var module;

  module = angular.module('app.services', ['ngResource']);

  module.service('User', [
    '$resource', function($resource) {
      var User, userResource;

      userResource = $resource('/user/:action/:id', {
        action: '@action',
        id: '@id'
      }, {
        create: {
          method: 'POST',
          params: {
            action: 'create'
          }
        }
      });
      User = function() {
        this.name = '';
        this.fbId = '';
        this.email = '';
        this.loggedIn = false;
        this.isAuthenticated = false;
        return this.defaultGeo = '';
      };
      User.prototype.setDefaultGeo = function(geo) {
        return this.defaultGeo = geo;
      };
      User.prototype.$save = function() {
        return userResource.create({
          user: this
        }, function(response) {
          return console.debug(response);
        }, function(err) {
          return console.debug('CANT CREATE USER');
        });
      };
      User.prototype.find = function(id) {
        return userResource.get({
          id: id
        }, function(_user) {
          return console.debug(_user);
        }, function() {
          return console.debug('NO USER');
        });
      };
      return new User();
    }
  ]);

  module.factory('KeywordListings', [
    '$resource', function($resource) {
      return $resource('/api/listings');
    }
  ]);

  module.factory('KeywordListingLoader', [
    'KeywordListings', '$q', '$location', function(KeywordListings, $q, $location) {
      return function(keyword) {
        var delay;

        delay = $q.defer();
        KeywordListings.get({
          keywords: keyword
        }, function(listings) {
          return delay.resolve(listings);
        }, function() {
          return delay.reject('Could not get listings');
        });
        return delay.promise;
      };
    }
  ]);

  module.factory('CategoryListings', [
    '$resource', function($resource) {
      return $resource('/api/listings/:cat', {
        cat: '@cat'
      });
    }
  ]);

  module.factory('CategoryListingsLoader', [
    'CategoryListings', '$q', '$route', '$location', function(CategoryListings, $q, $route, $location) {
      return function(category) {
        var delay;

        delay = $q.defer();
        CategoryListings.save({
          cat: category
        }, function(listings) {
          return delay.resolve(listings);
        }, function(err) {
          return delay.reject(err);
        });
        return delay.promise;
      };
    }
  ]);

  module.service('Coupons', [
    'KeywordListingLoader', 'CategoryListingsLoader', '$q', '$route', '$location', function(KeywordListingLoader, CategoryListingsLoader, $q, $route, $location) {
      var getListings;

      getListings = function() {
        if ($route.current.params.keywords) {
          return KeywordListingLoader($route.current.params.keywords);
        } else {
          return CategoryListingsLoader($route.current.params.category);
        }
      };
      return {
        getAllListings: getListings
      };
    }
  ]);

  module.factory('BusinessProfile', [
    '$resource', function($resource) {
      return $resource('/api/profile/:id', {
        id: '@id'
      });
    }
  ]);

  module.factory('BusinessProfileLoader', [
    'BusinessProfile', '$q', '$route', function(BusinessProfile, $q, $route) {
      return function() {
        var delay;

        delay = $q.defer();
        BusinessProfile.get({
          id: $route.current.params.profileId
        }, function(profile) {
          return delay.resolve(profile);
        }, function() {
          return delay.reject('Could not get profile');
        });
        return delay.promise;
      };
    }
  ]);

  module.service('ListingFilter', [
    '$routeParams', function($routeParams) {
      return {
        searchTerms: null,
        loading: true,
        searchText: '',
        activeFilters: {},
        lists: {
          vpPrintable: true,
          grocery: true,
          deals: true,
          sdc: true
        },
        resultsLabel: '',
        slidemenuActive: true,
        layoutOption: localStorage.getItem('layout_option') || 'grid'
      };
    }
  ]);

  module.factory('ScrollWatch', [
    '$rootScope', function($rootScope) {
      var scrollLimit;

      scrollLimit = function(el) {
        return $rootScope.$broadcast('scrollLimit', el);
      };
      return {
        scrollLimit: scrollLimit
      };
    }
  ]);

  module.factory('$fb', [
    '$rootScope', '$window', '$q', function($rootScope, $window, $q) {
      var defer, init, login;

      defer = $q.defer();
      init = function() {
        return defer.promise;
      };
      login = function() {
        var loginDefer;

        loginDefer = $q.defer();
        FB.login(function(response) {
          return FB.api('/me?fields=id,name,picture', function(user) {
            return $rootScope.$apply(loginDefer.resolve(user));
          });
        });
        return loginDefer.promise;
      };
      $window.fbAsyncInit = function() {
        FB.init({
          appId: '130720057130864',
          channelUrl: '//darek.io/channel.html',
          status: true,
          cookie: true,
          xfbml: true
        });
        FB.Event.subscribe('auth.authResponseChange', function(response) {});
        return FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            console.log('user authorized, getting user');
            return FB.api('/me?fields=id,name,picture', function(user) {
              return $rootScope.$apply(defer.resolve(user));
            });
          } else if (response.status === 'not_authorized') {
            console.log('not authorized');
            return defer.resolve(response);
          } else {
            console.log('not logged in');
            return defer.resolve(response);
          }
        });
      };
      (function(d) {
        var id, js, ref;

        id = 'facebook-jssdk';
        ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        return ref.parentNode.insertBefore(js, ref);
      })(document);
      return {
        init: init,
        login: login
      };
    }
  ]);

}).call(this);

/*
//@ sourceMappingURL=services.map
*/