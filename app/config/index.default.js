
let envMode = '';
let config = {};

const defaultConfig = {};

// --------------- dev mode -------------
envMode = 'dev';

config = {
  ...defaultConfig,
  envMode,
  serverDomain: 'http://localhost:1337',
  socketDomain: 'localhost:1337',
};

// --------------- prod mode -------------

// envMode = 'production';
if (envMode === 'production') {
  config = {
    ...defaultConfig,
    envMode,
    serverDomain: 'http://qa.trademuch.co.uk',
    socketDomain: 'qa.trademuch.co.uk:1337',
  };
}

export default config;
