$(document).ready(() => {
  $('#get-images-btn').click(() => {
      const subredditNames = $('#subreddit-input').val()?.toString().split(',') ?? [];
      $('#image-container').empty();
      subredditNames.forEach((subredditName: string) => {
          $.getJSON(`https://www.reddit.com/r/${subredditName}/.json?limit=100`, (response) => {
              if (response?.data) {
                  const children = response.data.children;
                  const numImages = 9;
                  const imageUrls: string[] = [];

                  children.forEach((child: any) => {
                      if (child.data.post_hint === 'image') {
                          const imageUrl: string = child.data.url;
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
