 # Front-End-Capstone-Madal

Drag and drop retail home page with stars. Did we mention stars? This thing has stars

### Table of Contents

* [Description](#Description)
* [Installation](#Installation)
* [Team Members](#Team-Members)
* [Roadmap](#Roadmap)



Description

**Description of Related Items Widget** - Tim Moses

http://recordit.co/YdtdeMfNVh

The Related Items widget consists of two main React components. These two components are similar visually, but have completely different functionalities. The components are the Related Items carousel and the Outfit carousel.

The Related Items carousel consists of individual slides of products that are related to the parent product. These relationships are established internally by the business' API and do not have any user input. Each slide can be clicked to navigate to that slide product detail, and it then becomes the parent product re-rendering the Related Items slide. On these slides is product information taken from another API endpoint, as well as photographs taken from yet another API endpoint. The product information includes the category, product name, price (with further CSS styling for a sale price) and a star component that renders the reviews/ratings of each product based on other user's inputs. On these slides there also is a button that allows the user to open up a modal window that compares the parent product's features to the related item's features.

The Outfit carousel consists of a single slide at the beginning of the carousel. This slide acts a button that allows the user to 'create an outfit'. When this button is clicked, it adds the parent product to a list of products the user is storing to create an outfit. When the button is clicked, it adds a slide consisting of the product image and the product details to the Outfit carousel. The user can add as many products to this carousel as they like. Within these outfit slides, there is a button that allows the user to remove the item from their outfit list.

The functionality of each carousel is similar. There is a wrapper for each, and the slides are rendered within these wrappers. If the carousels fill up or 'overflow', buttons and a scroll bar appear on either side allowing the user to scroll through the image slides.


Description of the Question and Answer Widget:  by Tom Ho

The Question and Answer Widget displays a list of questions and answers with respect to a given product.  By default it displays a list of 4 questions, each with up to two answers with respect to each given question.  Buttons appear to load more questions, or more answers with respect to a question if the user so desires.  If there are no more questions or answers to load, the load more button disappears.  

Next to each question is an add answer link, which opens a modal window to allow a user to answer a particular question.  Basic input checking is performed, preventing blank entries.  A user may additionally upload up to 5 images for a particular question.

At the bottom of the widget is a link to open a modal window allowing the user to add a new question to the question and answer section.  Basic input checking is again performed.  

At the top of the widget is a search bar which filters results.  No filtering is done for 3 or fewer characters.  Upon entering three or more characters filtering is performed which automatically lengthens or shortens the list of questions. 

Installation - How can another developer get your project up and running on their own? What dependencies are required? Are there environmental requirements? Be specific, and outline steps to take in order to get the project running.

This is an example of how the question and answer widget should operate visually:
[Link](https://recordit.co/92swj9lVMo)


Installation
===========================================================
If you have npm installed:
1.  Git clone https://github.com/FEC-madal/hr-rpp28-front-end-capstone.git

2.  Install all necessary dependencies
npm i

3.  Transpiles the jsx files into bundle.js
npm run react-dev  

4.  Runs node server to serve up files
npm run server-dev

5.  Goto: http://localhost:3000 in your browser
Project runs at http://localhost:3000/

Package.json already includes all dependencies.  Environment requires node package managed which can be installed via npm install -g npm


For developers using the testing suite:
Environmental dependencies include 

1. jest
   "jest": "^27.0.3",
   "jest-dom": "^4.0.0",
   "babel-polyfill": "^6.26.0"

   the project uses jest to test the code.  Because we are testing react components, jest-dom is required as a dependency to allow jest to mount objects to the DOM
   finally, a babel-polyfill is required in order to allow for proper transpilation of the .jsx files to allow jest to mount and execute code for testing.
 
 
2.  react testing library:
   "@testing-library/jest-dom": "^5.12.0",
   "@testing-library/react": "^11.2.7",
   "axios-mock-adapter": "^1.19.0",

   The testing library used is the react testing library, which is now "@testing-library/react"
   The react testing library, in contrast to enzyme (a common testing tool) seeks to test from the perpsective of a user experience.  Accordingly basic functionality that allows one to "reach inside" a particular tested react component is not available.  find out more at [Link](https://testing-library.com/docs/)

   mock axios data can be rendered throgh the axios-mock-adapter library.  Details on how to use the library can be found here: [Link](https://www.npmjs.com/package/axios-mock-adapter)






Usage - Further details on how the project is meant to be used may be helpful. For a library or framework, this section would outline how to use the library within another project (see socket.io  ). For a service that is meant to be used within a larger project architecture, instructions on how to integrate may be necessary (see node-statsD  ).


Team Members - Add the names of your team members. Describe roles on the team such as "Product Owner", "Scrum Master" and more.


Roadmap - What future enhancements are planned? What is the current status of the project? Is it being actively maintained?
