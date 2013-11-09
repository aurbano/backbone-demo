Backbone, Mustache and Underscore demo
===========
This demo features a commenting system based on Backbone, Mustache and Underscore. It could easily be extended to load and save comments from a real datastore or API.

It was done as a requirement for a job application, the app structure and some initial coding were provided.

Demo: http://github.urbanoalvarez.es/backbone-demo/

###Features
* There are initially some comments that are preloaded in the HTML, the backbone collection loads these prerendered comments on initialization.
* You can add new comments using the form or generating blocks of random comments.
* Comments can be edited, reversed and deleted.
* Only one form can be open at any time.
* Uses RequireJS to manage dependencies.
* Whenever you trigger an event that would make you lose your changes there is a confirmation dialog shown.


####Confirmation upon losing changes
It uses a global flag, plus an event aggregator to trigger the remove method on all open instances if necessary. The workflow is as follows:

1. Check the changed flag before initializing. If true, ask for confirmation.
	- User accepts, reset global flag and trigger the remove event.
	- User declines, stop initialization and disallow rendering on current instance.
2. If there are changes, update the global flag.
3. If this instance is closed, either canceling or submitting, reset the flag.
4. Back to 1.


###Meta
Based on https://github.com/bodnaristvan/backbone-demo

Alejandro U. Álvarez - http://urbanoalvarez.es
