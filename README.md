# Great Reads 

Great reads is free open source social cataloging website that allows people to search its database of books and comments. Users can register books, leave likes and comments and find the perfect book for their next weak.

The application is separated into two folders cliend and server. The client side stores the GUI/UI of the application while the server allows ...

Available scripts(the whole list of scripts is available in the package-lock of the client/server folder)  

Note: The following scripts must be performed from the appropriate directory of the application
client
 - start - runs the UI side of the application, the port on which the application is available is specified in the required .env file 
 - test - runs defined tests for the client side code (visit Jest docs for more information)

server
 - start - build the server side of the application and runs it in production mode(uses the appropriate .env configuration for production)
 - dev - runs the server side of the applciation in development mode( uses the appropiate .env configuration for development)
 - test - runs defined tests for the server side code (visit Jest docs for more information)
 - lint - 
 - seed - run the defined seeds from knex and seed the information into the database (configuration available in knexfile.ts)
 - migrate - run newly added migrations and updates the database (configuration available in knexfile.ts)
 - rollback - rollbacks last migration executed on the database (configuration available in knexfile.ts)
 - make-seeder - creates empty seed file 
 - make-migration - creates empty migration file with two stages (up/down side used by migration/rollback commands)
 
