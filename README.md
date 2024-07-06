# personal budget API

A Node.js API using the Express framework in order to calculate the daily budget expenditure through the means of envelope budgeting. Users are able to create, read, update, and delete (CRUD) their personal portfolios.

## Running the application:

To locally run the application, Node.js needs to be installed.  Install the required dependencies through `npm install`, and then start the server through `npm run start`

After the server has been successfully initialized, the API may be accessed by typing in your browser address bar: `http://localhost:3000/`

## Using Swagger

Swagger testing and documentation are available at:

`http://localhost:3000/api-documents/`

Available Swagger tests:

* Get all envelopes: `GET /api/v1/envelopes`
* Get single envelope: `GET /api/v1/envelopes/{id}`
* Create an envelope: `POST /api/v1/envelopes`
* Update an envelope: `PUT /api/v1/envelope/{id}`
* Delete an envelope: `DELETE /api/v1/envelope/{id}`
* Transfer funds from one envelope to another: `POST /api/v1/envelope/{fromId}/transfer/{toId}`

## Possible extensions for the API:

- To bolster user security, add authentication and authorization
- Establish a new API endpoint where users can add a single balance that's shared across several envelopes
