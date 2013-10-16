/**
 * Comment form controller and view
 *
 * @class FormView
 * @extends Backbone.View
 * @author Bodnar Istvan <istvan@gawker.com>
 */
define([
  'jquery',
  'mustache'
], function($, Mustache){
	
	// Event aggregator
	var tunnel = _.extend({}, Backbone.Events);
	
	// Changed flag
	var changed = false;
	
	/*global Mustache, CommentView, CommentModel */
	var FormView = Backbone.View.extend(
	/** @lends FormView.prototype */
		{
			/**
			 * Html tag name of the container element that'll be created when initializing new instance.
			 * This container is then accessible via the this.el (native DOM node) or this.$el (jQuery node)
			 * variables.
			 * @type String
			 */
			tagName: 'div',
			
			/**
			 * Determines whether the current element is allowed to render
			 * @type Boolean 
			 */
			allowRender: true,
		
			/**
			 * CSS class name of the container element
			 * @type String
			 */
			className: 'commentform',
			
			/**
			 * The map of delegated event handlers
			 * @type Object
			 */
			events: {
				'click .submit': 'submit',
				'click .cancel': 'cancel',
				'change .author, .text': 'change'
			},
			
			/**
			 * View init method, subscribing to model events
			 */
			initialize: function () {
				// Event aggregator
				_.bindAll(this);
				
				// If this or other view has changed, check if user wants to discard the changes
				if(changed){
					if(!confirm('You will lose your changes! Do you want to continue?')){
						// User doesn't want to lose changes, disallow rendering of new view
						// and stop initializing the current one.
						this.allowRender = false;
						return false;
					}	
				}
				
				// Close all views
				tunnel.trigger('remove');
				tunnel.bind('remove', this.remove);
				
				// Since this is a new view, no changes have been made
				changed = false;
				
				this.model.on('change', this.updateFields, this);
				this.model.on('destroy', this.remove, this);
			},
			
			/**
			 * Render form element from a template using Mustache
			 * @returns {FormView} Returns the view instance itself, to allow chaining view commands.
			 */
			render: function () {
				// Stop view from rendering if user didn't want to lose changes
				if(!this.allowRender) return false;
				var template = $('#form-template').text();
				var template_vars = {
					author: this.model.get('author'),
					text: this.model.get('text')
				};
				this.$el.html(Mustache.to_html(template, template_vars));
				return this;
			},
		
			/**
			 * Submit button click handler
			 * Sets new values from form on model, triggers a success event and cleans up the form
			 * @returns {Boolean} Returns false to stop propagation
			 */
			submit: function () {
				// set values from form on model
				this.model.set({
					author: this.$el.find('.author').val(),
					text: this.$el.find('.text').val()
				});
				
				// set an id if model was a new instance
				// note: this is usually done automatically when items are stored in an API
				if (this.model.isNew()) {
					this.model.id = Math.floor(Math.random() * 1000);
				}
				
				// trigger the 'success' event on form, with the returned model as the only parameter
				this.trigger('success', this.model);
				
				// Reset changed
				changed = false;
				
				// remove form view from DOM and memory
				this.remove();
				return false;
			},
			
			/**
			* Cancel button click handler. If changes had been made, it asks the user for confirmation
			* Cleans up form view from DOM
			* @returns {Boolean} Returns false to stop propagation
			*/
			cancel: function () {
				// Make sure user wants to cancel
				if(changed) if(!confirm('You will lose your changes! Do you want to continue?')) return false;
				changed = false;
				// clean up form
				this.remove();
				return false;
			},
			
			/**
			 * Detect changes in current view, updates the changed flag. 
			 */
			change: function(){
				changed = true;
			},
			
			/**
			 * Update view if the model changes, helps keep two edit forms for the same model in sync
			 * @returns {Boolean} Returns false to stop propagation
			 */
			updateFields: function () {
				this.$el.find('.author').val(this.model.get('author'));
				this.$el.find('.text').val(this.model.get('text'));
				return false;
			},
			
			/**
			 * Override the default view remove method with custom actions
			 */
			remove: function () {
				// unsubscribe from all model events with this context
				this.model.off(null, null, this);
				
				// delete container form DOM
				this.$el.remove();
				
				// call backbones default view remove method
				Backbone.View.prototype.remove.call(this);
				
				// Unbind the aggregated event
				tunnel.unbind('remove');
			}
		}
	);
	
	return FormView;
});