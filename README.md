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
After some consideration I have decided for the Event aggregator. Combining underscore's bindAll with a Backbone events element I can bind an event to all instances of Formview and call remove() on all of them when a new one is instantiated.
This contradicts the requirement of Question #1, although in Question #3 it doesn't state that it should ask for confirmation so I will leave it this way.
One would have to find the balance between better UX and a good implementation, it might be interesting to hide the current form view instead of removing it, so that the changes made are still there in case the user goes back to editing that one.
Also if you write a new comment, and then try to edit another one, the new one gets closed without confirmation.

### Task 4
I pre-render some html comments directly in index.html, in a real world scenario this would probably be done for search engines.
It's not specified in the assingment really, but I'm trying to introduce as few modifications as possible, so I'm maintaining the current collection.add method.
Since it takes the text and author as parameters, I could have added those parameters somewhere in the comments as html data- attributes, but that changes too much I think.
So I decided to parse the comments and extract the author and text. I wouldn't really like this method on a real world application since it relies on the comments content, but for this example it works.
The parsed data is then added to the commentlist which gets re-rendered when everything loads.

Why is the render method not practical?
Precisely because of the last statement, the comments get re-rendered every time the render function is called! Although this seems to work fine, and many people would just leave it as is, a real commenting system with media embeds for example would suffer from it.
A better implementation wouldn't render the whole list when a new comment is added or removed.