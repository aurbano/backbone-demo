/**
 * Application controller view
 * Starts application, inits a new CommentCollection collection, assigns the empty list to 
 * a CommentlistView controller, also inits a NewButtonView instance to handle new comment insertion.
 * 
 * Check index.html to find the place where App is initialized, it's right after the container
 * DOM node is rendered.
 *
 * @class App
 * @extends Backbone.View
 * @author Bodnar Istvan <istvan@gawker.com>
 */

define(['jquery', 'backbone', 'commentcollection', 'newbuttonview', 'randombuttonview', 'listview', 'commentmodel'], function($, Backbone, CommentCollection, NewButtonView, RandomButtonView, CommentlistView, CommentModel) {

    /*global CommentCollection, CommentlistView, FormView, NewButtonView, RandomButtonView */
	var App = Backbone.View.extend(
	/** @lends App.prototype */
		{
			changed: false,
			/**
			 * Initialize new application instance
			 */
			initialize: function () {
				// create empty comment collection
				var collection = new CommentCollection();
			
				// bind the NewButtonView to the already rendered 'newcomment' DOM element, we'll need to know the
				// collection to work with so FormView can insert the new comment properly
				new NewButtonView({collection: collection, el: this.$el.find('.newcomment')});
				
				// bind the RandomButtonView to the already rendered 'randomcomment' DOM element
				new RandomButtonView({collection: collection, el: this.$el.find('.randomcomment')});
				
				// I need to populate the collection with the pre-rendered comments
				$.each(this.$el.find('.commentlist > li.comment'), function(){
					collection.add(new CommentModel({
						text: $(this).html().split('<br>')[1],
						author: $(this).find('strong').text()
					}));
				});
				// create comment list view, assign our empty collection
				var listview = new CommentlistView({collection: collection, el: this.$el.find('.commentlist')});
				listview.render();
			}
		}
	);
	
	return App;
});


/**
 * Documentation related comments
 */
/**
 * @name Backbone
 * @class Backbone
 * Application is a Backbone based application
 * @link http://documentcloud.github.com/backbone/
 */


/**
 * @name Backbone.Model
 * @class Backbone.Model
 * Backbone model superclass
 * @link http://documentcloud.github.com/backbone/
 */

/**
 * @name Backbone.Collection
 * @class Backbone.Collection
 * Backbone collection superclass
 * @link http://documentcloud.github.com/backbone/
 */

/**
 * @name Backbone.View
 * @class Backbone.View
 * By default all views extend Backbone.View
 * @link http://documentcloud.github.com/backbone/
 */

 