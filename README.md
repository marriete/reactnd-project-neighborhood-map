# Neighborhood Map Project

This code is for a project from [Udacity's Front-End Developer nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001).

The goal of the project was to use React, the Google Maps API, plus data from a third-party API (in this case Yelp Fusion API), to create a web application from scratch. The app should display both a filterable list of results and a map view of those results, and a list view of filtered items.

## How to run

1. Download or clone [this](https://github.com/marriete/reactnd-project-neighborhood-map) repository
2. Install all project dependencies with `npm install`
3. Start the development server with `npm start`
4. Create a production build with `npm run build`, which can then be run by running `serve -s build` and opening in the browser.

Note that the offline functionality of the app is only available in Production Mode. This caches the app boilerplate using the service worker provided with Create React App. The API data and map data are only shown when there is a network connection, to avoid violating any terms of service.

## Additional resources used
- [react-google-maps](https://tomchentw.github.io/react-google-maps/)
- [Yelp Fusion API](https://www.yelp.com/fusion)