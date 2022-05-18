<p align="center">
  <img src="image/TanamIn.png" alt="Konva logo" height="180" />
</p>

<h1 align="center">Tanamin Web Service</h1>

[![CC Member](https://img.shields.io/badge/CC%20Member-1-green)](https://opencollective.com/konva)
[![npm version](https://badge.fury.io/js/konva.svg)](http://badge.fury.io/js/konva)
[![Build Status](https://github.com/konvajs/konva/actions/workflows/test-browser.yml/badge.svg)](https://github.com/konvajs/konva/actions/workflows/test-browser.ym)
[![Build Status](https://github.com/konvajs/konva/actions/workflows/test-node.yml/badge.svg)](https://github.com/konvajs/konva/actions/workflows/test-node.ym)[![CDNJS version](https://img.shields.io/cdnjs/v/konva.svg)](https://cdnjs.com/libraries/konva)

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

# Testing

This Web service uses Katalon Studio and Postman to test.

- You can download the Postman documentation [here](https://www.getpostman.com/docs/).

If you want to contribute to this project, please contact me.

# Pull Requests

I'd be happy to review any pull requests that may better the TanamIn project, in particular if you have a bug fix, enhancement, or a new idea, you can contact us.

## Contributors

### CC Member

#### Individuals

<a href="https://github.com/Bangkit-Capstone-Project/Cloud_computing/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Bangkit-Capstone-Project/Cloud_computing" />
</a>

<p>Shazi Awaludin</p>
