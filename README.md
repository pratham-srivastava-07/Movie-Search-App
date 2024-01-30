## Movie Search Application

This is a movie search application built using TypeScript. The application allows users to search for movies, view details about each movie, and see recommendations for a selected movie.

## Features

Movie Search: Users can search for movies using the search bar. The application fetches data from The Movie Database (TMDb) API to display relevant search results.

Movie Details: Clicking on a movie in the search results provides detailed information, including the movie's title, poster, average vote, and overview.

Recommendations: Users can view movie recommendations based on the selected movie. Recommendations are fetched from TMDb API.

## Technologies Used

TypeScript: The entire application is written in TypeScript, adding static typing and enhancing code maintainability.

TMDb API: The Movie Database API is used to fetch movie data, including search results and recommendations.

Fetch API: The fetch API is utilized to make asynchronous requests to the TMDb API.

## Project Structure

The project is organized as follows:

src/: Contains the TypeScript source code.
main.ts: Entry point of the application, responsible for handling user interactions and making API calls.
types.ts: Defines TypeScript interfaces and types for representing movie data structures.
index.html: The main HTML file for the application.
styles/: Contains stylesheets for styling the application.


## How to Use

Enter a movie title in the search bar and press Enter.

Click on a movie from the search results to view its details.

Explore recommendations by clicking the "View Recommendations" button after selecting a movie.
