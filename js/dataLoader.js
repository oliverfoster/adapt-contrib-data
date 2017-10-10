define([
  'adapt-contrib-core/js/adapt'
], function(Adapt) {

  var DataLoader = Backbone.Controller.extend({

    manifest: null,
    entries: null,
    loaded: 0,

    initialize: function() {
      this.entries = [];
      _.bindAll(this, "onManifestLoaded", "onEntryLoaded");
      this.loadManifest();
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
      this.manifest.forEach(function(entry) {
        $.getJSON(entry, function(data) {
          this.onEntryLoaded(entry, data);
        }.bind(this));
      }.bind(this));
    },

    onEntryLoaded: function(entry, data) {
      this.loaded++;
      if (data instanceof Array) {
        for (var i = 0, l = data.length; i < l; i++) data[i]._entry = entry;
        this.entries.push.apply(this.entries, data);
      } else {
        data._entry = entry;
        this.entries.push(data);
      }
      if (this.loaded === this.manifest.length) {
        Adapt.trigger("dataloader:ready");
      }
    }

  });

  Adapt.dataLoader = new DataLoader;


});