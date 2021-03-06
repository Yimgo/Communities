# PIE

## Goal
PIE is a collaborative workshop for document edition. You can create a document, edit it using Markdown, assign a section to a collaborator (she will be responsible for it) and export to ODT and PDF. You can discuss each section independently to help improve the document. The goal of the project was to follow the natural team behavior of document writing. So our tool provide a strong task assignement process where each person is responsible for the avancement of his task ( close discussion, validate work step by step, get real time notifications...)

## Installation

PIE is bundled in three components: the front-end (website), the back-end (nodejs server and CouchDB database) and the md2pdf converter.

### Requirements

You'll need:

* NodeJS
* AbiWord (the converter uses it)
* GCC
* CouchDb
* Python

... and PIE's sources: `$ git clone https://github.com/PieEditor/PIE.git`

### Front-end

```
# npm install -g grunt-cli bower
$ cd src/front
$ npm install
$ bower install
```

### Back-end
```
$ cd src/back
$ npm install
```

Launch CouchDb and initialize the database:

```
$ node init-db.js
$ node update-db.js
```

### md2pdf converter
```
$ cd src/md2pdf
$ make
```

## Run

### Front-end

```
$ cd src/front
```

To run the test server: `$ grunt server`.

To compile the web application, use `$ grunt build`. The website will be compiled in `/front/dist/` and this foldershould be deployed to the root of your webserver.

### Back-end
```
$ cd src/back
$ npm start
```

### md2pdf
```
$ cd src/md2pdf
$ node convert.js
```

## Deploy
We built the `deploy.sh` script to help you deploy easily PIE to any server. SSH into your server, create a new user named `pie` and git clone the repository into its folder `~/PIE/` :

```
$ cd
$ git clone https://github.com/PieEditor/PIE.git
```

Everytime you want to deploy the application, run from your computer  `$ ./deploy.sh my.server.com` to automagically get the latest sources from GitHub and deploy the application on your server.

### Serve PIE

Here are sample configurations, which will serve PIE's compiled sources.

#### Apache

```
<VirtualHost pie.example.org>
        ServerName pie.example.org
        DocumentRoot /home/pie/PIE/src/front/dist/
</VirtualHost>
```

#### lighttpd

```
$HTTP["host"] == "pie.example.com" {
	server.document-root = "/home/pie/PIE/src/front/dist"
}
```
