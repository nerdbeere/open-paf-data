# Open Paf Data

![Logo Pfaffenhofen](http://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Wappen_Landkreis_Pfaffenhofen_an_der_Ilm.svg/140px-Wappen_Landkreis_Pfaffenhofen_an_der_Ilm.svg.png)

An approach to gather and analyze data (news, search results, social behavior) about Pfaffenhofen a. d. Ilm.
The data should then be accessible via a generic JSON API.

## Why?

> If the mountain won't come to Muhammad, Muhammad must go to the mountain.

There is a lot of data out there regarding the county *Pfaffenhofen a. d. Ilm* but it's scattered and most of the data is not available in a machine-readable and/or generic format.

## Implemented Features

* Gather and generalize data from different sources
* Automatically gathers information in predefined intervals
* Persist data to `rethinkdb`
* Simple JSON API (with caching)
* Simple react-based frontend for displaying news

## Planned Features
* More sophisticated API
* Text Comparison for news (partly implemented)
* Trending topics
* Frontend (partly implemented)

## Implemented Adapters

### RSS
* Landkreis Pfaffenhofen (landkreis-pfaffenhofen.de)
* Paf und du (pafunddu.de)
* Pfaffenhofener Kurier Lokalnachrichten

### Search Engines
* google (with searchterm `pfaffenhofen ilm`)

### Social
* twitter (with searchterm `pfaffenhofen`)

### Sport
* Aktuelle GCR Abschlagszeiten

## Planned Adapters
* Weather data
* Events
* Business hours for Shops, restaurants, authorities
* Cinema data

## Installation

**Warning**: rethinkdb >= 2.0.0 is required!

* Install `nodejs` and `rethinkdb` on your machine.
* Create database `pafdata` with tables `news`, `search`, `social`, `pccaddie`
* Clone the repository
* Create config files by copying the example config files
* `npm install`

## Run the application

Use `npm start` to both start the crawler and the API. You can also start both processes independently.

### Crawler
The crawler is a process that perdiocally crawls different sources and saves new data to the database. Use `npm run start-crawler` to start the crawler.

### API
The API is a process that supplies JSON formatted data via http. Use `npm run start-api` to start the API Process.

## API
The API will be accessible via HTTP on `http://<HOSTNAME>:<PORT>`.
There are currently three endpoints available:

* **search_results**: `http://<HOSTNAME>:<PORT>/search_results`
* **social**: `http://<HOSTNAME>:<PORT>/social`
* **news**: `http://<HOSTNAME>:<PORT>/news`

### Example response

```json:
[
  {
    "adapter": "google",
    "created": 1428832121505,
    "id": "2f0e16a4-8570-4df6-ac3e-0d77b6aa1c9c",
    "identifier": "a080713d2c13a4e2b1435230666e7be83f6e7c7d",
    "link": "http://gvents.de/pfaffenhofen-an-der-ilm-onstage-im-frontstage-live/259039",
    "tags": [
      "google"
    ],
    "text": "vor 1 Tag ... April 25, 2015 @ JUZ Frontstage Pfaffenhofen a. d. Ilm in Pfaffenhofen an der Ilm. \nReggae! Einlass ab 19:30 Uhr – Konzertbeginn 20:30 Uhr.",
    "title": "Pfaffenhofen an der Ilm: ONSTAGE im Frontstage Live ...",
    "type": "search"
  }
]
```

## Contribution
Pull requests and ideas welcome

## License
The MIT License (MIT)

Copyright (c) 2015 Julian Hollmann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
