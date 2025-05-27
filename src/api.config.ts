

const getBaseUrl = () => {
    const env = import.meta.env.MODE;
console.log(env,"ENVIRONMENT")
  
    switch (env) {
      case 'development':
        return 'http://10.10.25.5:8880/MOLD-TEK/api';
      case 'staging':
        return 'http://10.10.25.5:8880/MOLD-TEK/api';
      case 'production':
        return 'http://10.10.25.5:8880/MOLD-TEK/api';
      default:
        return 'http://10.10.25.5:8880/MOLD-TEK/api';
    }
  };
  
  export const BASE_API_URL = getBaseUrl();
  