This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started
Clone the project

Run `npm install`

Run `npm start`

## Project Structure
This project is created with React Hooks and is set up with redux. It is the best practice to have redux as it has a central store for the entire application and thus we get a consistent data. In addition to that, it avoids race condition to update data in store as only reducer can update the store. It might be an over kill for this application to have store and redux but it is a good practice to have that in place.

## Application flow
- When the application loads, we make a `get` request to the API to get the data
- That request is passed to `Thunk Middleware` that will handle any side-effects and gets the data
- The data is then passed to an action creator with the payload as data
- The action creator then passes the action type and payload to the reducer which takes action according to the action type
- In reducer, when we pass the data, it massages it a format where all the enteries are grouped by listId's and only valid names are stored. At the end it updates the store with the data
- The component gets the new data as soon as the store is updated and then we display the data in UI
- The UI provides the user with the capability to select "Increasing" or "Decreasing" order for sorting by name, by default the selecting on "Increasing"
- When user makes the selection, the value is passed down to the reducer that updates the store and returns the info in updated order
- There is a CSS file in the components folder that handles the styling of the component


