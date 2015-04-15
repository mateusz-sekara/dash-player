var AsyncDownloader = function () {

    var sendHttpGetRequest = function (url, expectedStatusCode, requestOnSuccess, requestOnFailure, requestOnProgress, responseType) {
        var request = new XMLHttpRequest(),
            startTime,
            requestDuration;

        expectedStatusCode = (expectedStatusCode) ? expectedStatusCode : 200;

        if (responseType) {
            request.responseType = responseType;
        }

        if (requestOnProgress) {
            request.onprogress = requestOnProgress;
        }

        request.onload = function (event) {
            if (request.status === expectedStatusCode) {
                requestDuration = new Date() - startTime;
                requestOnSuccess(request.response, event.loaded, requestDuration);
            } else {
                requestOnFailure(request.response, request.status);
            }
        };

        startTime = new Date();
        request.open('GET', url, true);
        request.send();
    };


    return {
        downloadBinaryFilePart: function (url, requestOnSuccess, requestOnFailure, requestOnProgress) {
            sendHttpGetRequest(url, 206, requestOnSuccess, requestOnFailure, requestOnProgress, "arraybuffer");
        },

        downloadBinaryFile: function (url, requestOnSuccess, requestOnFailure, requestOnProgress) {
            sendHttpGetRequest(url, 200, requestOnSuccess, requestOnFailure, requestOnProgress, "arraybuffer");
        },

        download: function (url, requestOnSuccess, requestOnFailure, requestOnProgress) {
            sendHttpGetRequest(url, 200, requestOnSuccess, requestOnFailure, requestOnProgress);
        }
    };
};
