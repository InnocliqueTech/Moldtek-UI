

const getBaseUrl = () => {
    const env = import.meta.env.MODE;

  
    switch (env) {
      case 'development':
        return 'https://dev-api.example.com';
      case 'staging':
        return 'https://staging-api.example.com';
      case 'production':
        return 'https://api.example.com';
      default:
        return 'http://localhost:3000';
    }
  };
  
  export const BASE_API_URL = getBaseUrl();
  