## Description of the project 

Web interface for a homemade astronomical observatory. The service is designed to inform about the operation of the telescope and equipment. The interface displays a calendar of the telescope, a list of footage by groups, allows you to control the parameters of temperature, voltages of the main units and control the power supply. 

An example of her work is here: https://observatory.miksoft.pro/

The service interacts with the API: https://github.com/miksrv/api-backend

![General view of the interface](./../documentation/ui-screen-1.png)

## Application launch

The application is written in ReactJS + Redux. To run the application for the first time, you need to install all dependencies (modules) using NPM. To do this, you need to run the command: 

### `npm install`

To run the application 

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run build`