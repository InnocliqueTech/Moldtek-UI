

const apiMap = {
  development: {
    '5173': 'http://183.82.55.190:8880',
    '5174': 'http://10.10.25.5:8880',
    '5175': 'http://183.82.55.190:8880',
    default: 'http://183.82.55.190:8880',
  },
  staging: {
    '5173': 'http://183.82.55.190:8880',
    '5174': 'http://10.10.25.5:8880',
    '5175': 'http://10.10.25.5:8880',
    default: 'http://10.10.25.5:8880',
  },
  production: {
    '5173': 'http://183.82.55.190:8880',
    '5174': 'http://10.10.25.5:8880',
    '5175': 'http://10.10.25.5:8880',
    default: 'http://10.10.25.5:8880',
  }
} as const;

type Env = keyof typeof apiMap;

function getBaseApiUrl(): string {
  const env = import.meta.env.MODE as Env;
  const port = window.location.port;

  const envApiUrls = apiMap[env] ?? apiMap.production;

  return envApiUrls[port as keyof typeof envApiUrls] ?? envApiUrls.default;
}

  
  export const BASE_API_URL = getBaseApiUrl();
  