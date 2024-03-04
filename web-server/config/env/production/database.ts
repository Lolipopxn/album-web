interface ConnectionConfig {
    client: string;
    connection: {
      host: string;
      database: string;
      user: string;
      password: string;
    };
  }
  
  interface Environment {
    (key: string): string;
  }
  
  interface EnvObject {
    env: Environment;
  }
  
  interface ExportFunction {
    (env: EnvObject): {
      connection: ConnectionConfig;
    };
  }
  
  const exportFunction: ExportFunction = ({ env }) => ({
    connection: {
      client: "postgres",
      connection: {
        host: `/cloudsql/${env("INSTANCE_CONNECTION_NAME")}`,
        database: env("DATABASE_NAME"),
        user: env("DATABASE_USER"),
        password: env("DATABASE_PASSWORD"),
      },
    },
  });
  
  export default exportFunction;
  