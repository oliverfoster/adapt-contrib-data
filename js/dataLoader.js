define([
  'adapt-contrib-core/js/adapt'
], function(Adapt) {

  // This plugin will load all of the json files from the adapt/data/manifest.js file.
  // It is a precursor to the setup of the models and collections in Adapt
  // It allows any kind of new json file to be created in the course folder and loaded into Adapt

  var DataLoader = Backbone.Controller.extend({

    manifest: null,
    entries: null,
    loaded: 0,
    isReady: false,
    isAppReady: false,

    initialize: function() {
      this.entries = [];
      _.bindAll(this, "onManifestLoaded", "onEntryLoaded");
      this.setUpEventListeners();
      this.loadManifest();
    },

    setUpEventListeners: function() {
      this.listenToOnce(Adapt, "app:ready", this.onAppReady);
    },

    onAppReady: function() {
      this.isAppReady = true;
      this.checkReadyTrigger();
    },

    loadManifest: function() {
      $.getJSON("./adapt/data/manifest.js", this.onManifestLoaded);
    },

    onManifestLoaded: function(data) {
      this.manifest = data;
      this.loadManifestEntries();
    },

    loadManifestEntries: function() {
      this.entries = this.entries || [];
      var loaded = 0;
      this.manifest.forEach(function(file) {
        $.getJSON(file, function(data) {
          this.onEntryLoaded(file, data);
        }.bind(this));
      }.bind(this));
    },

    onEntryLoaded: function(file, data) {
      this.loaded++;
      if (data instanceof Array) {
        for (var i = 0, l = data.length; i < l; i++) data[i]._file = file;
        this.entries.push.apply(this.entries, data);
      } else {
        data._file = file;
        this.entries.push(data);
      }
      this.checkReadyTrigger();
    },

    checkReadyTrigger: function() {
      if (this.loaded !== this.manifest.length) return;
      if (!this.isAppReady) return;
      _.defer(function() {
        Adapt.trigger("dataloader:ready");
        Adapt.dataLoader.isReady = true;
      });
    },

    findByType: function(type) {
      return _.where(this.entries, { _type: type });
    },

    findByFile: function(file) {
      return _.where(this.entries, { _file: file });
    }

  });

  Adapt.dataLoader = new DataLoader;

});