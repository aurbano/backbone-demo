== Changes ==
This file describes the changes done in the source code to implement the requirements.

=== Task 1 ===
I had to add a little confirmation when a user cancelled the form submission. So the event to intercept was the cancel event.
It's located in js/view/formview.js, I decided on a simple JS confirm() since I tried to maintain it as simple as possible.

=== Task 2 ===
Add Require.js file to the lib folder, decided on this vs cdn just in case you will test it offline.

