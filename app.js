const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const targetURL = 'https://www.nintendo.com/es-mx/store/games/nintendo-switch-games/#sort=df/';

const getGames = ($) => {
  // Get all list items from the unodered list with a class name of 'products'
  const games = $('div.difXoz > div');
  const gameData = [];
  // The 'each()' method loops over all game list items
  games.each((index, el) => {
    // Get the image, name, and price of each game and create an object
    const game = {};

    // Selector to get the image 'src' value of a game
    game.img = 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.0/c_scale,w_300/ncom/software/switch/70010000053336/e933b48650b33b355e9cf2583da5c94b77180e40fb02d050041083dd62f4df39';//$(el).find('div.bjkjEP > div > img.gUGinS').attr('src');
    game.name = $(el).find('h2.bKKnvO').text(); // Selector to get the name of a game
    game.price = $(el).find('span.dexgmS').text(); // Selector to get the price of a game
    game.platform = $(el).find('div.dttZIF > div > span').text(); // Selector to get the price of a game
    game.release = $(el).find('div.YnCBi').text(); // Selector to get the price of a game
    game.link = $(el).find('a.cjBJsu').text(); // Selector to get the price of a game
    game.id = new Date().getTime();
    gameData.push(game);
  });

  // Create a 'game.json' file in the root directory with the scraped gameData
  fs.writeFile('games.json', JSON.stringify(gameData, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Data written to file successfully!');
  });
};

// axios function to fetch HTML Markup from target URL
axios.get(targetURL).then((response) => {
  const body = response.data;
  const $ = cheerio.load(body); // Load HTML data and initialize cheerio
  getGames($);
});

// <img alt="" loading="lazy" fetchpriority="low" class="Imagestyles__CloudinaryImage-sc-1244ond-1 gUGinS" src="https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.0/c_scale,w_300/ncom/software/switch/70010000053966/849c234de8df7265201d26d9d72f88eed3f32438d3dca12fc135beb4c3befc85">