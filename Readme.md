<p align="center">
  <img src="image/TanamIn.png" alt="Konva logo" height="180" />
</p>

<h1 align="center">Tanamin Web Service</h1>

<div align="center">

[![CC Member](https://img.shields.io/github/contributors/Bangkit-Capstone-Project/Cloud_computing?color=blue)](#cc-member)
[![Dependency](https://img.shields.io/node/v/@hapi/hapi)](#dependency)
[![Issue](https://img.shields.io/github/issues/Bangkit-Capstone-Project/Cloud_computing)](https://github.com/Bangkit-Capstone-Project/Cloud_computing/issues)
[![Pull Request](https://img.shields.io/github/issues-pr/Bangkit-Capstone-Project/Cloud_computing)](https://github.com/Bangkit-Capstone-Project/Cloud_computing/pulls)
[![License](https://img.shields.io/github/license/Bangkit-Capstone-Project/Cloud_computing?color=blue)](https://github.com/Bangkit-Capstone-Project/Cloud_computing/blob/master/LICENSE)

</div>

Tanamin Web Service is a web service that allows you to predict the disease of plant by uploading image of plant leaf. This service is under development and will be updated soon. First three features are available is Cassava leaves disease prediction, Rice leaves disease prediction and Vegetable types classification.

The first thing you need to know is that this service is using authentication to access each service. You need to login to access the service. The login is using username and password. You can register on the registration service. Please don't spam the registration service because it will make the registration service slow. If you have some idea to secure this service, please contact me.

> Base url of this service is: http://localhost:5000/

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
  <pre>POST /predictions/tomato</pre>

- History
  <pre>GET  /predict/historys/</pre>
  <pre>GET  /predict/historys/{historyId}</pre>
  <pre>GET  /predict/historys/plant/{plantId}/</pre>
  <pre>GET  /predict/historys/plant/{plantId}/disease/{diseaseId}</pre>
  <pre>POST /histories</pre>
  <pre>DEL  /histories/{historyId}</pre>

- Classifications
  <pre>POST /classifications/vegetable</pre>

- Plant
  <pre>GET   /plants</pre>
  <pre>POST  /plants</pre>
  <pre>PUT   /plants/{plantId}</pre>
  <pre>GET   /plants/{plantId}</pre>
  <pre>DEL   /plants/{plantId}</pre> 

- Diseases
  <pre>GET   /diseases</pre>
  <pre>POST  /diseases</pre>
  <pre>PUT   /diseases/{diseaseId}</pre>
  <pre>GET   /diseases/{diseaseId}</pre>
  <pre>DEL   /diseases/{diseaseId}</pre>

- Vegetables
  <pre>GET   /vegetables</pre>
  <pre>POST  /vegetables</pre>
  <pre>PUT   /vegetables/{vegetableId}</pre>
  <pre>GET   /vegetables/{vegetableId}</pre>
  <pre>DEL   /vegetables/{vegetableId}</pre>

# Quick Look

## Architecture

<p align="center">
  <img src="image/cloud architecture.png" alt="Konva logo" />
</p>

# Authentications

This service is using token for authentication. You should have an account to access this service. First if you don't have an account, create a new account. Then, create a token for authentication. It's like login, you need to authenticate yourself with username and password. If the autentication is valid, you will get a token. You can use this token to access the service. If dont, you will get a error message. 

The token given is accessToken and refreshToken. The refreshToken is used to refresh the token. The accessToken is valid for 30 minutes. If you want to refresh the token, you need to send the refreshToken to the service. If the refreshToken is valid, you will get a new accessToken. If the refreshToken is not valid, you will get a error message.

# Instructions

## Predictions Service
The predictions service is using imgUrl and endpoint id to retrieve predictions. The endpoint id is used to define what model to be used. So you should know what endpoint id you want to use. The endpoint id is:
- cassava leaf : 4257194673539383296
- rice leaf : 2528938316535955456
- tomato leaf : 9197643464764817408

For the imgUrl, it is image url that publicly accessible. The image should be in image format like (jpg, png, jpeg, etc.). The image url can be obtained when you upload your image to upload picture service, or search on google.

If the prediction is successful, you will get a json object. The json object contains the prediction result. The prediction result contains the highest probability and the predicted class, with some additional information related to the class. The result will be stored as a history object.

## Classifications service
This service is like predictions service withoud storing the result as a history object. The result will be lost imedietely after the process.
The endpoint id is: 
- vegetables : 5666821356906348544

# Environment

In order to run this project, you need to configure the following environment variables:

```bash
#development
HOST= {your application host, localhost if development}
NODE_ENV = {your environment server}

PORT= {your server port}

# node-postgres configuration
PGUSER= {your database username}
PGHOST= {your database host}
PGPASSWORD= {your database password}
PGDATABASE= {your database name}
PGPORT= {your database port}
PGURI= {your database uri if available}

# JWT Token Key
ACCESS_TOKEN_KEY= {define your own token key}
REFRESH_TOKEN_KEY= {define your own refresh token}
ACCESS_TOKEN_AGE = {define how long the access token is valid}

# AI platform
PROJECT_ID={your project id}

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

This Web service uses Postman to test.

- You can download the Postman documentation [here](https://documenter.getpostman.com/view/12239151/Uz5DrdGT).

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