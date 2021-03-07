# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### Additional Questions
Please include your answers as part of your email submission or in a separate file in your
repository

## 1. How would we be able to add a new type of column, like a menuColumn, while still having it behave the same as a column?

Col is a component with `size` as props. We can add another props as `type` in Col component.


## 2. How would we be able to support multiple types of content inside a column, besides text? Such as images, video’s, etc.

We can do it by adding data for images, videos ets in each item of an column array which is used for rendering the number of columns


## 3. If the grid size (12) is not fixed but instead is different for each grid created, what would need to change to support that? How can we ensure that columns added do not appear smaller on one grid (12 width) from the other grid (24 width) when we add them?


We can set up this setting in gridSize state. Css flex is used to render and display the columns where it will auto adjust the column based on the row size (if its 12 or 24). So column-size will set the below width 
col width = (row width / number of cols) * (column-size)

For example, columnsize 6 will set
col-6 = (row width / 24) * 6