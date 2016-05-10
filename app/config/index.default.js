const envMode = 'EDIT_ENV_MODE';
const localServerDomain = 'EDIT_LOCAL_SERVER_DOMAIN';
let config = {};

const defaultConfig = {};

// --------------- dev mode -------------
if (envMode === 'development') {
  config = {
    ...defaultConfig,
    envMode,
    serverDomain: `http://${localServerDomain}:1337`,
    socketDomain: `${localServerDomain}:1337`,
  };
}

// --------------- qa mode -------------
if (envMode === 'qa') {
  config = {
    ...defaultConfig,
    envMode,
    serverDomain: 'http://qa.trademuch.co.uk',
    socketDomain: 'qa.trademuch.co.uk:1337',
  };
}

// --------------- prod mode -------------
if (envMode === 'prod') {
  config = {
    ...defaultConfig,
    envMode,
    serverDomain: 'http://www.trademuch.co.uk',
    socketDomain: 'www.trademuch.co.uk:1337',
  };
}



export default config;
