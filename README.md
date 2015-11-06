# rsvpTree
RSVP tracking and family or network tree creator for optimal wedding organization and prep 


This is an express application built with oauth, bootstrap, font awesome, google fonts, sequelize, and node js. 

The purpose of it is to host rsvp tracking for wedding planning specifically. It details all the necessary items with which to then plan a wedding. Often times these things are not all together, and so one spends much more time putting the details all together than should really be necessary. My idea is to combine it and put it all together. In addition to streamlined and simplified RSVP functionality for guests, you also have a portal for the administrator of each wedding signed up to see all RSVPs, track them, delete, add guests as well as create a family tree or network tree out of the rsvps so that you not only know who is coming, but who they are and how they are connected. Because often with big events like weddings, you don't know a good half of the people attending given the nature of the event - who knows their future spouse's second cousin, really? This allows the administrators (intended to be bridal party) to get to know the connections a bit better before the big day, going that 'extra mile' for the guests - and to know your future family a bit better before day one. 

To do this, the main functionality comes from the database which stores various information. There are models for users, log in, guests, trees, event settings, and various tables connecting them. Pages are rendered with specific account information all based off of the attribute of portalCode - an 8 character text that tracks everything by connecting to necessary tables. This renders unique portals and tracks RSVPs. It relies on RESTful routes within its base CRUD nature. 

There's quite a few things left to add currently - the biggest piece being the tree functionality. I plan on using jsplumb (https://jsplumbtoolkit.com/community/demo/flowchart/index.html) to render the tree diagrams and populate with drop down based on RSVPs. 

the route index/portal/addGuest is unfinished, there is an issue connecting the tables properly, the same is true of the delete button on the RSVP page. 

Eventually, I would like to add sort and filter functionality to the rsvplist page within the portal and use cloudinary to upload images for sites rather than just urls. 
