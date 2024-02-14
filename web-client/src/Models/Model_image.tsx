export default interface Image {
    id: number;
    attributes: {
      Title: string;
      description: string;
      picture: {
        data: [{
          attributes: {
              url: string;
              }
            }]
      }
    }
  }
  