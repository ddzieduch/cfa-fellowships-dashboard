# Code for Australia Fellowships Dashboard

The project allows to:
* group the list of fellows per fellowship and display their name and age,
* display the average age of each group of fellows per fellowship,
* show the information related to the oldest and youngest fellow in the dataset including the fellowship that they belong to,
* it contains a form to add new fellows as well.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See develpment for notes on how to develop the project.

### Prerequisites

Before you start you need to have:

* [Docker](https://www.docker.com)
* [Git](https://git-scm.com)

### Installing

Follow this steps

```
$ git clone https://github.com/ddzieduch/cfa-fellowships-dashboard.git
$ cd cfa-fellowships-dashboard
$ docker-compose up
```

### First time setup
Open http://localhost:8080/import, select `fellows_dataset.json` file and click submit button

## Development

If you make changes to the Dockerfile that the image is based on and want the image to have them, you can just run:

```
$ docker-compose up --build
```

## Built With

* [Docker](https://www.docker.com) - Docker container technology
* [Node.js](https://nodejs.org/) - JavaScript server
* [MongoDB](https://www.mongodb.com/) - Document-oriented database

## Versioning

Use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ddzieduch/cfa-fellowships-dashboard/tags).

## Authors

**Damian Dzieduch** - [ddzieduch](https://github.com/ddzieduch)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
