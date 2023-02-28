"use strict";
$(document).ready(() => {
    $('#get-images-btn').click(() => {
        var _a, _b;
        const subredditNames = (_b = (_a = $('#subreddit-input').val()) === null || _a === void 0 ? void 0 : _a.toString().split(',')) !== null && _b !== void 0 ? _b : [];
        $('#image-container').empty();
        subredditNames.forEach((subredditName) => {
            $.getJSON(`https://www.reddit.com/r/${subredditName}/.json?limit=100`, (response) => {
                if (response === null || response === void 0 ? void 0 : response.data) {
                    const children = response.data.children;
                    const numImages = 9;
                    const imageUrls = [];
                    children.forEach((child) => {
                        if (child.data.post_hint === 'image') {
                            const imageUrl = child.data.url;
                            if (!imageUrl.includes('imgur.com')) {
                                imageUrls.push(imageUrl);
                            }
                        }
                    });
                    if (imageUrls.length > 0) {
                        for (let i = 0; i < numImages; i++) {
                            const randomIndex = Math.floor(Math.random() * imageUrls.length);
                            const imageUrl = imageUrls[randomIndex];
                            $('#image-container').append(`<img src="${imageUrl}">`);
                            imageUrls.splice(randomIndex, 1);
                        }
                    }
                }
            });
        });
    });
});
