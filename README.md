This application was built without the usage of any external libraries nor frameworks. 

Using only the native libraries from NODE, to build a server from scratch.

with this app you can manage your tasks, creating, deleting, updating, and marking one task as completed or not.


use the insomnia.json file to try the following routes:

- `POST - /tasks`
- `GET - /tasks`
- `PUT - /tasks/:id`
- `DELETE - /tasks/:id`
- `PATCH - /tasks/:id/complete`


And the other side of this project is that it's capable to upload tasks from a CSV file to populate the data base, making them also easy to handle. but to achieve this I needed to use the external library csv-parse.
to see the importation for CSV file in action uncomment the last line on server.js
