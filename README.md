 # Front-End-Capstone-Madal

Drag and drop retail home page with stars. Did we mention stars? This thing has stars

### Table of Contents

* [Description](#Description)
* [Installation](#Installation)
* [Team Members](#Team-Members)
* [Roadmap](#Roadmap)



Description

Description of Related Items Widget - Tim Moses

http://recordit.co/YdtdeMfNVh

The Related Items widget consists of two main React components. These two components are similar visually, but have completely different functionalities. The components are the Related Items carousel and the Outfit carousel.

The Related Items carousel consists of individual slides of products that are related to the parent product. These relationships are established internally by the business' API and do not have any user input. Each slide can be clicked to navigate to that slide product detail, and it then becomes the parent product, re-rendering the Related Items slide. On these slide is product information taken from another API endpoint, as well as photographs taken from yet another API endpoint. The product information includes the category, product name, price (with further CSS styling for a sale price) and a star component that renders the reviews/ratings of each product based on other user's inputs. On these slides there also is a button that allows the user to open up a modal window that compares the parent product's features to the related item's features.

The Outfit carousel consists of a single slide at the beginning of the carousel. This slide acts a button that allows the user to 'create an outfit'. When this button is clicked, it adds the parent product to a list of products the user is storing to create an outfit. When the button is clicked, it adds a slide consisting of the product image and the product details to the Outfit carousel. The user can add as many products to this carousel as they like. Within these outfit slides, there is a button that allows the user to remove the item from their outfit list.

The functionality of each carousel is similar. There is a wrapper for each, and the slides are rendered within these wrappers. If the carousels fill up or 'overflow', buttons and a scroll bar appear on either side allowing the user to scroll through the image slides.

Installation - How can another developer get your project up and running on their own? What dependencies are required? Are there environmental requirements? Be specific, and outline steps to take in order to get the project running. - tom

Usage - Further details on how the project is meant to be used may be helpful. For a library or framework, this section would outline how to use the library within another project (see socket.io  ). For a service that is meant to be used within a larger project architecture, instructions on how to integrate may be necessary (see node-statsD  ).


Team Members - Add the names of your team members. Describe roles on the team such as "Product Owner", "Scrum Master" and more.


Roadmap - What future enhancements are planned? What is the current status of the project? Is it being actively maintained?
