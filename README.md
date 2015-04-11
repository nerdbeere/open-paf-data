# Open Paf Data

![Logo Pfaffenhofen](http://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Wappen_Landkreis_Pfaffenhofen_an_der_Ilm.svg/140px-Wappen_Landkreis_Pfaffenhofen_an_der_Ilm.svg.png)

An approach to gather and analyze data (news, search results, social behavior) about Pfaffenhofen a. d. Ilm.
The data should then be accessible via a generic json api (not implemented yet).

## Why?

> If the mountain won't come to Muhammad, Muhammad must go to the mountain.

There is a lot of data out there regarding the county *Pfaffenhofen a. d. Ilm* but it's scattered and most of the are data is not available in a generic format.

## Implemented Features

* Gather and generalize data from different sources
* Automatically gathers information in predefined intervals
* Persist data to `rethinkdb`

## Planned Features
* JSON API
* Text Comparison for news (partly implemented)
* Trending topics
* Frontend 

## Implemented Adapters

### RSS
* Landkreis Pfaffenhofen (landkreis-pfaffenhofen.de)
* Paf und du (pafunddu.de)
* Pfaffenhofener Kurier Lokalnachrichten

### Search Engines
* google (with searchterm `pfaffenhofen ilm`)

### Social
* twitter (with searchterm `pfaffenhofen`)

## Planned Adapters
* Weather data
* Events
* Business hours for Shops, restaurants, authorities
* Cinema data

## Installation
* Install `nodejs` and `rethinkdb` on your machine.
* Create database `pafdata` with tables `news`, `search`, `social`
* Clone the repository
* Create config files by copying the example config files
* `npm install`
* `npm run start-crawler`

## Contribution
Pull requests and ideas welcome

## License
The MIT License (MIT)

Copyright (c) 2015 Julian Hollmann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
