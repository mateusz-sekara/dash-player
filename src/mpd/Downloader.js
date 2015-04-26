Dash.mpd.Downloader = function (mpdFileUrl, isYouTubeVideo, downloadMpdFileOnSuccess) {
    'use strict';

    var youTubeDomain = 'http://www.youtube.com',
        getInfoMapping = '/get_video_info?html5=1&video_id=',
        videoIdPrefix = 'v=',
        mpdEntryPrefix = 'dashmpd=',
        asyncDownloader = Dash.utils.AsyncDownloader(),

        downloadMpdFileFromURL = function () {
            asyncDownloader.download(mpdFileUrl, downloadMpdFileOnSuccess);
        },

        getMpdUrlFromResponse = function (movieDetails) {
            var urlParameters = movieDetails.split('&');
            for (var i = 0; i < urlParameters.length; i += 1) {
                if (urlParameters[i].indexOf(mpdEntryPrefix) === 0) {
                    return decodeURIComponent(urlParameters[i].substring(mpdEntryPrefix.length));
                }
            }
            throw new Error('Dash file is not available for this video');
        },

        downloadYouTubeMpdFile = function () {
            var videoId = getYouTubeVideoId(mpdFileUrl),
                url = youTubeDomain + getInfoMapping + videoId;
            asyncDownloader.download(url, downloadYouTubeVideoDetailsOnSuccess);
        },

        downloadYouTubeVideoDetailsOnSuccess = function (request) {
            var mpdUrl = getMpdUrlFromResponse(request.responseText);
            asyncDownloader.download(mpdUrl, downloadMpdFileOnSuccess);
        },

        getYouTubeVideoId = function (videoUrl) {
            var urlParameters = videoUrl.split('?');
            for (var i = 0; i < urlParameters.length; i += 1) {
                if (urlParameters[i].indexOf(videoIdPrefix) === 0) {
                    return urlParameters[i].substring(videoIdPrefix.length)
                }
            }
        };


    return {
        downloadMpdFile: function () {
            if (isYouTubeVideo) {
                downloadYouTubeMpdFile();
            } else {
                downloadMpdFileFromURL();
            }
        }
    };
};