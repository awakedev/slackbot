const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-499018554422-497450782820-bOy5vNVoZxoPXNizIeC3dePW', 
    name: 'jokebot'
});

// start handler

bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    };

    bot.postMessageToChannel('general',
     'Get Ready To Laugh With @JokeBot!',
      params);
});

// Error handler
bot.on('error', (err) => console.log(err));

// Msg handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
});

// Respond to Data
function handleMessage(message) {
    if(message.includes(' chucknorris')) {
        chuckJoke();

    } else if(message.includes(' yomamma')) {
        yoMamaJoke();
    }
}

// Tell a chuck norris joke

function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random')
    .then(res =>{
      const joke = res.data.value.joke;
      const params = {
        icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('general',
     `Chuck Norris: ${joke}`,
     params);
    });
}

// Tell yo mamma joke
function yoMamaJoke() {
    axios.get('https://icanhazdadjoke.com/')
    .then(res =>{
      const joke = res.data.joke;
      const params = {
        icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('general',
     `Your Da: ${joke}`,
     params);
    });
}