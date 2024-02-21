export default interface Image {
    id: number;
    attributes: {
      Title: string;
      description: string;
      email: string;
      user_name: string;
      picture: {
        data: [{
          attributes: {
              url: string;
              }
            }]
      }
    }
  }
  