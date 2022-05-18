<p align="center">
  <img src="image/TanamIn.png" alt="Konva logo" height="180" />
</p>

<h1 align="center">Tanamin Web Service</h1>

<center>

[![CC Member](https://img.shields.io/github/contributors/Bangkit-Capstone-Project/Cloud_computing?color=blue)](#cc-member)
[![Dependency](https://img.shields.io/node/v/@hapi/hapi)](#dependency)
[![Issue](https://img.shields.io/github/issues/Bangkit-Capstone-Project/Cloud_computing)](https://github.com/Bangkit-Capstone-Project/Cloud_computing/issues)
[![Pull Request](https://img.shields.io/github/issues-pr/Bangkit-Capstone-Project/Cloud_computing)](https://github.com/Bangkit-Capstone-Project/Cloud_computing/pulls)
[![License](https://img.shields.io/github/license/Bangkit-Capstone-Project/Cloud_computing?color=blue)](https://github.com/Bangkit-Capstone-Project/Cloud_computing/blob/master/LICENSE)

</center>

Tanamin Web Service is a web service that allows you to predict the disease of plant by uploading image of plant leaf. This service is under development and will be updated soon. First three features are available is Cassava leaves disease prediction, Rice leaves disease prediction and Vegetable types classification.

The first thing you need to know is that this service is using authentication to access each service. You need to login to access the service. The login is using username and password. You can register on the registration service. Please don't spam the registration service because it will make the registration service slow. If you have some idea to secure this service, please contact me.

> Base url of this service is: http://localhost:8080/

The service available:

- Authentications
  <pre>POST /authentications</pre>
  <pre>PUT  /authentications</pre>
  <pre>DEL  /authentications</pre>

- Users
  <pre>GET  /users/{userId}</pre>
  <pre>POST /users</pre>
  <pre>PUT  /users/{userId}</pre>
  <pre>DEL is not avalable now</pre>

- Predictions
  <pre>POST /predictions/cassava</pre>
  <pre>POST /predictions/rice</pre>

- History
  <pre>GET  /histories</pre>
  <pre>GET  /histories/{historyId}</pre>
  <pre>POST /histories</pre>
  <pre>DEL  /histories/{historyId}</pre>

- Classifications
  <pre>POST /classifications/vegetable</pre>

# Quick Look

#### Built With

# Authentications

# Instructions

## X Service

## Y service

# Environment

In order to run this project, you need to configure the following environment variables:

```bash
A={YourA}
B={YourB}
C={YourC}

```

Then you can use the following image to create your own database:

<a href="">
  <img src="image/Tanamin%20Diagram-ERD.drawio.png" />
</a>

<p align="center">Databases ERD</p>


### Dependency

* [Hapi Server](https://www.npmjs.com/package/@hapi/hapi)
* [JWT](https://www.npmjs.com/package/@hapi/jwt)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [DotEnv](https://www.npmjs.com/package/dotenv)
* [Joi](https://www.npmjs.com/package/joi)
* [Nanoid](https://www.npmjs.com/package/nanoid)
* [node-pg-migrate](https://www.npmjs.com/package/node-pg-migrate)
* [pg](https://www.npmjs.com/package/pg)

# Testing

This Web service uses Katalon Studio and Postman to test.

- You can download the Postman documentation [here](https://www.getpostman.com/docs/).

If you want to contribute to this project, please contact me.

# Pull Requests

I'd be happy to review any pull requests that may better the TanamIn project, in particular if you have a bug fix, enhancement, or a new idea, you can contact us.

## Contributors

### CC Member (Master Contributor)

#### Individuals

<a href="https://github.com/Bangkit-Capstone-Project/Cloud_computing/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Bangkit-Capstone-Project/Cloud_computing" />
</a>

<p>Shazi Awaludin</p>

### ML Member
#### Individuals
<a href="https://github.com/Bangkit-Capstone-Project/ML_Structuring_Model/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Bangkit-Capstone-Project/ML_Structuring_Model" />
</a>
<p>ML Member is who are contribute to create prediction and classification model that used in this web service. Without them, this service is nothing.</p>

### MD Member
#### Individuals
<a href="https://github.com/Bangkit-Capstone-Project/MobileDev_AppsProject/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Bangkit-Capstone-Project/MobileDev_AppsProject" />
</a>
<p>MD member is who are responsible to serve mobile applications based on Android and use this service as data source and more.</p>