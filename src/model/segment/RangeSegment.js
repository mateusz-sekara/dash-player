Dash.model.RangeSegment = function (representation, baseUrl, initializationIndexRange, segmentBaseIndexRange, contentLength) {
    'use strict';

    var splitInitializationIndexRange = initializationIndexRange.split('-'),
        splitSegmentBaseIndexRange = segmentBaseIndexRange.split('-'),

        initializationStartIndex = parseInt(splitInitializationIndexRange[0], 10),
        initializationEndIndex = parseInt(splitInitializationIndexRange[1], 10),

        segmentBaseStartIndex = parseInt(splitSegmentBaseIndexRange[0], 10),
        segmentBaseEndIndex = parseInt(splitSegmentBaseIndexRange[1], 10);

    return {

        name: 'RangeSegment',

        getRepresentation: function () {
            return representation;
        },

        getHeaderURL: function () {
            return Dash.utils.CommonUtils.createURLWithRange(baseUrl, initializationStartIndex, segmentBaseEndIndex);
        },

        getSegmentURLs: function (header) {
            var sampleLengths = [],
                segmentBase = header.subarray(segmentBaseStartIndex, segmentBaseEndIndex + 1),

                segmentURLs = [],
                startIndex = segmentBaseEndIndex + 1,
                i;

            for (i = 32; i < segmentBase.length; i += 12) {
                sampleLengths.push(segmentBase[i] * 16777216 + segmentBase[i + 1] * 65536 + segmentBase[i + 2] * 256 + segmentBase[i + 3]);
            }

            for (i = 0; i < sampleLengths.length; i += 1) {
                segmentURLs.push(Dash.utils.CommonUtils.createURLWithRange(baseUrl, startIndex, startIndex + sampleLengths[i]));
                startIndex += sampleLengths[i] + 1;
            }

            return segmentURLs;
        },

        getBaseURL: function () {
            return baseUrl;
        },

        getHeaderStartIndex: function () {
            return initializationStartIndex;
        },

        getHeaderEndIndex: function () {
            return segmentBaseEndIndex;
        },

        getInitializationStartIndex: function () {
            return initializationStartIndex;
        },

        getInitializationEndIndex: function () {
            return initializationEndIndex;
        },

        getSegmentBaseStartIndex: function () {
            return segmentBaseStartIndex;
        },

        getSegmentBaseEndIndex: function () {
            return segmentBaseEndIndex;
        },

        //Only YouTube
        getContentLength: function () {
            return contentLength;
        }
    };
};