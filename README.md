Gawker technical assignment
===========

By Alejandro U. Álvarez
http://urbanoalvarez.es

## Changes
This file describes the changes done in the source code in order to meet the requirements.

### Task 1
The event to intercept was the cancel event on the formview.
It's located in js/view/formview.js, I decided on a JS confirm() since I tried to maintain it as simple as possible.

### Task 2
Add Require.js file to the lib folder, decided on this vs cdn just in case you will test it offline.
Add appropriate shim configuration for the libraries that require it
Convert all files to modules, and done

### Task 3
I believe that a Backbone view shouldn't know about other views. So this makes it a little tricky. The idea here is to ensure that all views are removed before rendering a new FormView view.
After some consideration I have decided for an Event aggregator. Combining underscore's bindAll with a Backbone events element I can bind an event to all instances of Formview and call remove() on all of them when a new one is instantiated.
This contradicts the requirement of Question #1, although in Question #3 it doesn't state that it should ask for confirmation so I will leave it this way.
The correct implementation from my point of view would be to wait for the user to change the fields in the form, and ask for confirmation in that case only.
That would require us to monitor the form for changes, and binding another method that asks for confirmation if there are changes, before calling remove.

### Task 4
I pre-render some html comments directly in index.html, in a real world scenario this would probably be done for search engines.
It's not specified in the assingment really but I'm trying to introduce as few modifications as possible.
Since collection.add() takes the text and author as parameters, I could have added them somewhere in the comments as html data- attributes, but that imples a bigger change from my point of view.
I decided to parse the comments and extract the author and text. I wouldn't really like this method on a real world application since it relies on the comments content, but for this example with known content it will work.
The parsed data is then added to the commentlist which gets re-rendered when everything loads.

Why is the render method not practical?
Precisely because of the last statement, the comments get re-rendered every time a comment is added! Although this seems to work fine, and many people would just leave it as is, a real commenting system with media embeds for example would suffer from it.
A better implementation wouldn't render the whole list when a new comment is added. In js/view/listview.js I have added the method "add", which does just that.

This can be probably improved in many ways, but I don't think the goal of this assingment is to find the perfect implementation of the idea behind it, so I have just outlined some of my thoughts on it.
