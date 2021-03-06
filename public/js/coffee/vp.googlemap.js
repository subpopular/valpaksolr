// Generated by CoffeeScript 1.6.2
(function() {
  var setMapCenter, setMapSize;

  $.widget('vp.googlemap', {
    options: {
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      locations: [],
      width: '300px',
      height: '300px',
      widgetClassName: 'vp-googlemap',
      onMapClick: function() {
        return this;
      },
      onLocationAdded: function() {
        return this;
      }
    },
    widgetEventPrefix: 'googlemap:',
    map: null,
    _create: function() {
      var _this = this;

      this.element.addClass(this.options.widgetClassName);
      this.element.on('googlemap:locationadded', function(event, data) {
        return _this.options.onLocationAdded(data, _this);
      });
      return this._initMap();
    },
    _destroy: function() {
      return this.element.removeClass(this.options.widgetClassName);
    },
    _setOption: function(key, value) {
      var fnMap, prev,
        _this = this;

      prev = this.options[key];
      fnMap = {
        'center': function() {
          return setMapCenter(value, _this);
        },
        'width': function() {
          return setMapSize('width', value, _this);
        },
        'height': function() {
          return setMapSize('height', value, _this);
        }
      };
      this._super(key, value);
      if (fnMap[key] != null) {
        fnMap[key]();
        return this._triggerOptionChanged(key, prev, value);
      }
    },
    _triggerOptionChanged: function(optionKey, previousValue, currentValue) {
      return this._trigger('setoption', {
        type: 'setoption'
      }, {
        option: optionKey,
        previous: previousValue,
        current: currentValue
      });
    },
    _initMap: function() {
      var gmapOptions, loc, _i, _j, _len, _len1, _ref, _ref1, _ref2,
        _this = this;

      _ref = this.options.locations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        loc = _ref[_i];
        this._addLocationToMap(loc);
      }
      gmapOptions = {
        center: ((_ref1 = this.options.primaryLocation) != null ? _ref1.latlong : void 0) || new google.maps.LatLng(40.76104083532429, -73.97850036621094),
        mapTypeId: this.options.mapTypeId,
        zoom: this.options.zoom
      };
      this.map = new google.maps.Map(this.element[0], gmapOptions);
      _ref2 = this.options.locations;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        loc = _ref2[_j];
        this._addLocationMarker(loc);
      }
      this._setOptions({
        'width': this.options.width,
        'height': this.options.height
      });
      return google.maps.event.addListener(this.map, 'click', function(event) {
        return _this.options.onMapClick(event, _this);
      });
    },
    _addLocationToMap: function(loc) {
      loc.latlong = new google.maps.LatLng(loc.lat, loc.lon);
      if (loc.primary) {
        this.options.primaryLocation = loc;
      }
      this._addLocationMarker(loc);
      return this._trigger('locationAdded', {
        type: 'locationAdded'
      }, loc);
    },
    _addLocationMarker: function(loc) {
      var _ref;

      loc.marker = new google.maps.Marker({
        position: loc.latlong,
        map: this.map
      });
      if (((_ref = this.options.overlay) != null ? _ref.trigger : void 0) != null) {
        this.map.infoWindow = new google.maps.InfoWindow();
        return google.maps.event.addListener(loc.marker, this.options.overlay.trigger, function() {
          this.map.infoWindow.setContent(loc.overlayContent);
          return this.map.infoWindow.open(this.map, loc.marker);
        });
      }
    },
    addLocation: function(loc) {
      var l, _i, _len, _ref;

      _ref = this.options.locations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        l = _ref[_i];
        if (loc.lat === l.lat && loc.lon === l.lon) {
          return false;
        }
      }
      this.options.locations.push(loc);
      return this._addLocationToMap(loc);
    },
    getMap: function() {
      return this.map;
    }
  });

  setMapCenter = function(latlong, widget, animated) {
    return widget.map.panTo(latlong);
  };

  setMapSize = function(dimension, size, widget) {
    var o;

    o = widget.option();
    widget.element.css(dimension, size);
    return widget.option('center', widget.getMap().getCenter());
  };

}).call(this);

/*
//@ sourceMappingURL=vp.googlemap.map
*/
