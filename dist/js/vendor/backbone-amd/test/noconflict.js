!function(){module("Backbone.noConflict"),test("noConflict",2,function(){var n=Backbone.noConflict();equal(window.Backbone,void 0,"Returned window.Backbone"),window.Backbone=n,equal(window.Backbone,n,"Backbone is still pointing to the original Backbone")})}();