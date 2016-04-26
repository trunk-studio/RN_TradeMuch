let envMode = 'development';
const localServerDomain = '10.0.1.22';
let config = {};

const defaultConfig = {};

// --------------- dev mode -------------
envMode = 'dev';

config = {
  ...defaultConfig,
  envMode,
  serverDomain: `http://${localServerDomain}:1337`,
  socketDomain: `${localServerDomain}:1337`,
};

// --------------- prod mode -------------

// envMode = 'production';
if (envMode === 'qa') {
  config = {
    ...defaultConfig,
    envMode,
    serverDomain: 'http://qa.trademuch.co.uk',
    socketDomain: 'qa.trademuch.co.uk:1337',
  };
}

if (envMode === 'production') {
  config = {
    ...defaultConfig,
    envMode,
    serverDomain: 'http://qa.trademuch.co.uk',
    socketDomain: 'qa.trademuch.co.uk:1337',
  };
}



export default config;
