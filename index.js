var getSubtitles = require('youtube-captions-scraper').getSubtitles;

var express = require('express');
var url = require('url');
var app = express();

app.get('', function (request, response) {
    query = url.parse(request.url, true).query;

    if (query.videoID != undefined){

        if (query.lang != undefined){
            var lang = query.lang;
        }else{
            lang = 'ru';
        }

        getSubtitles({
          videoID: query.videoID,
          lang: lang
        }).then(function(captions) {
            var result = '';
            captions.forEach(function(element) {
                result += element.text + ' ';
            });

          response.send(result);
        });
    }else{
        response.send('');
    }
});

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});