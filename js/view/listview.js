/**
 * Comment list controller and view
 * Subscribes to comment collection events and renders a list of comments according
 *
 * @class CommentlistView
 * @extends Backbone.View
 * @author Bodnar Istvan <istvan@gawker.com>
 */

define([
  'jquery',
  'commentview'
], function($, CommentView){
	/*global CommentView */
	var CommentlistView = Backbone.View.extend(
	/** @lends CommentlistView.prototype */
		{
			/**
			 * Subscribe to collection 'reset' and 'add' events
			 */
			initialize: function () {
				//this.collection.on('add', this.add, this);
				this.collection.on('add reset', this.render, this);
			},
			
			/**
			 * If we uncomment the first event on initialize, and remove it from the second event,
			 * this function will be called when new elements are added. Which will render them without
			 * re-rendering the whole list. 
			 */
			add: function(element){
				//this.$el.append(element.render());
				var commentview = new CommentView({
					model: element
				});
				this.$el.append(commentview.render().$el);
				return this;
			},
			
			/**
			 * Render comments using CommentView instances for each model in the collection.
			 * @returns {CommentlistView} Returns the view instance itself, to allow chaining view commands.
			 */
			render: function () {
				// first clean up the container
				this.$el.empty();
				
				// iterate over models in collection and render comments using the CommentView view class
				this.collection.each(function (item) {
					// create new CommentView instance
					var commentview = new CommentView({
						model: item
					});
					
					// append rendered CommentView instance to CommentlistViews container
					this.$el.append(commentview.render().$el);
				}, this);
				
				return this;
			}
		}
	);
	
	return CommentlistView;
});		