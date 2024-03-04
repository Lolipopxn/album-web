interface ProviderOptions {
    bucketName: string;
    basePath: string;
    publicFiles: boolean;
    uniform: boolean;
  }
  
  interface Config {
    provider: string;
    providerOptions: ProviderOptions;
  }
  
  interface Environment {
    (key: string): string;
  }
  
  interface EnvObject {
    env: Environment;
  }
  
  interface ExportFunction {
    (env: EnvObject): {
      upload: {
        config: Config;
      };
    };
  }
  
  const exportFunction: ExportFunction = ({ env }) => ({
    upload: {
      config: {
        provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
        providerOptions: {
          bucketName: env('GCS_BUCKET_NAME'),
          basePath: env('GCS_BASE_PATH'),
          publicFiles: true,
          uniform: false,
        },
      },
    },
  });
  
  export default exportFunction;
  