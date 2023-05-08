# ArgentinaProgramaFrontendPortfolio

This is the frontend portion of my first professional portfolio developed for the course Argentina Programa #YoProgramo.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2. It uses HTML, CSS and TypeScript. For styles, Bootstrap’s frontend toolkit was explored.

## Getting started 

Clone the repo: 
git clone https://github.com/CarolinaCampi/ArgentinaPrograma-FrontEndPortfolio.git

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Architecture

The general architecture of the project follows the MVC architecture. The UI aspect of the project is contained in the repo. 
It contains different components for each section. As for services, there are three:
- the authentication service for login
- the interceptor service to add the JWT to requests
- the portfolio service to fetch information from the database

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## License

GNU General Public License v3.0

