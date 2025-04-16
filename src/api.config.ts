

const getBaseUrl = () => {
    const env = import.meta.env.MODE;

  
    switch (env) {
      case 'development':
        return 'http://localhost:8880/MOLD-TEK/api';
      case 'staging':
        return 'https://staging-api.example.com';
      case 'production':
        return 'https://api.example.com';
      default:
        return 'http://localhost:8880/MOLD-TEK/api';
    }
  };
  
  export const BASE_API_URL = getBaseUrl();
  