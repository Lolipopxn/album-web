export default interface Role {
    id: number;
    username: string;
    role: {
      id: number;
      name: string;
      type: string;
    };
  }