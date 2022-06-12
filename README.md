<div align="center">
 <img src="https://i.imgur.com/b2njbOe.png" />

# Shift Scheduler

### Shift Scheduler is a web app project created for easy shift scheduling & employee absence requests management.

### [See it in action](https://www.youtube.com/watch?v=lFqBvDmx3RM), or deploy your own w/ Docker

</div>

## Features

**Employees (regular users):**

Every user registered has the following abilities.

- See the current schedule: Each user can see the current week's schedule. If a manager did not create a schedule for the week, no schedule would show.
- Report absence/Block certain dates: Each user can request when NOT to work, with the ability to write a reason. Every date is a separate request shown in the admin control panel.
- Requests management: Each user can manage their requests, if a user requested not to work on a date, and the request was not approved by the manager, the user can remove that request as if it never happened.

**Managers (administrators):**

If you're an admin, you have an extra button on the top right for extra functions.

- Manage requests: Every admin can see every request ever made by any user. If the date of the request is relevant (meaning not before the current date), the admin can either approve or deny the request.
- Generate a shift: Every admin can generate a randomized shift, every day is on its own, and it is completely randomized each click. For this to work properly, you would have to have at least 4 regular users registered.

  Now, this is personal preference, every day the majority works on the morning shift, two work middle shifts and other two work the evening shifts. On Fridays, it picks only 1 user randomly.

  The admin has the ability to easily re-order the users to his liking by simply drag and dropping the users.

  When ready, the “publish shift” button calculates if there are any users who have more than 2 “bad shifts”. For example, if the user works more than 2 evening shifts (or middle shifts) and warns the admin before publishing it.

- Shift history management: Each admin can see every shift published, and who worked when. It gives you useful information such as when was the shift made, for what date, by whom, and whether it is published.
- Lastly, user management: Each admin can create and edit users & reset their passwords.

## Usage

First, clone the project.

Then, remove all the `.prod` file extensions so that Docker would recognize these files.

Then, simply use this command:

```
$ docker compose up
```

Shift Scheduler uses MongoDB, you would have to connect to port `27018` with your favorite database management app to set up the first user (the port is purposely not 27017).
Only administrators can create users for protection.

Insert this first user document under the `users` collection:

```
{
    "_id" : ObjectId("6276688e8ac0526064fb3ade"),
    "username" : "admin",
    "hash" : "864bcf999790114b894299fbc5899cd5c998b3166e1deacc69096fb10b8eda84d2ff1c36637ad4679621b1c17ab3ee2260f6ef4f40c722a0528d645afaeeecce",
    "salt" : "1322927e381826e0f7a6fa6ccf4ea81660301f4956ef889eef60e43a2c32065b",
    "admin" : true,
    "blockedDates" : [],
    "__v" : 0
}
```

**username:** `admin`

**password:** `admin`

After running `docker compose up`, Docker should create a permanent volume on the host where all the data will be saved.

## To-do list

To-dos can be found [here](https://projects.ofekasido.xyz/shift-scheduler)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
