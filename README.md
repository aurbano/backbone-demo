Gawker technical assignment
===========

By Alejandro U. Álvarez
http://urbanoalvarez.es

## Changes
This file describes the changes done in the source code in order to meet the requirements.

### Task 1
The event to intercept was the cancel event on the formview.
It's located in js/view/formview.js, I decided on a JS confirm() since I tried to maintain it as simple as possible.

In Task 3 I changed a bit how this worked, so it would actually require confirmation when losing changes always, including when a user tried to open a new comment box.

It now uses a flag declared on the view scope, that is changed when a change in the data is detected, when the close method is called, it checks that flag to determine if it should close directly or ask for confirmation.

### Task 2
Add Require.js file to the lib folder, decided on this vs cdn just in case you will test it offline.
Add appropriate shim configuration for the libraries that require it
Convert all files to modules, and done

### Task 3
I wanted to keep views independent from each other, and implement a good method for keeping only one comment box open at a time. I had already done something similar in the past using an event aggregator to communicate the different instances of the views.

It uses the flag I mentioned in Task 1, plus an event aggregator to trigger the remove method on all open instances if necessary. The workflow is as follows:

1. Check the changed flag before initializing. If true, ask for confirmation.
	- User accepts, reset global flag and trigger the remove event.
	- User declines, stop initialization and disallow rendering on current instance.
2. If there are changes, update the global flag.
3. If this instance is closed, either canceling or submitting, reset the flag.
4. Back to 1.

### Task 4
I pre-render some comments directly in index.html, in a real world scenario this would probably be done for search engine optimization purposes.
It's not specified in the assignment really but I'm trying to introduce as few modifications as possible.
Since collection.add() takes the text and author as parameters, I could have added them somewhere in the comments as html data- attributes, but that implies more changes.
I decided to parse the comments and extract the author and text. I wouldn't really like this method on a real world application since it relies on the comments content, but for this example with known content it will be fine.
The parsed data is then added to the commentlist which gets re-rendered when everything loads.

Why is the render method not practical?
Precisely because of the last statement, the comments get re-rendered every time a comment is added! Although this seems to work fine, and many people would just leave it as is, a real comment system with media embeds for example would suffer from it.
A better implementation wouldn't render the whole list when a new comment is added. In js/view/listview.js I have added the method "add", which does just that.

This can be probably improved in many ways, but I don't think the goal of this assignment is to find the perfect implementation of the idea behind it, so I have just outlined some of my thoughts on it.

I tried to document everything thoroughly, the docs folder has been recreated, although with a different template.
