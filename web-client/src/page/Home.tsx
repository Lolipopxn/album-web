import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from '../Models/Model_image';
import { ImageRepository } from '../Repository/ImageRepository';
import conf from "../conf";

const Home: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageRepository = new ImageRepository();
        const fetchedImages = await imageRepository.getAll();
        setImages(fetchedImages || []);
      } catch (error) {
        setError("Error fetching images. Please try again.");
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <Navbar />
      {error && <div>{error}</div>}
      <ImageList sx={{ width: '60%', height: '60%' }} gap={0}>
        {images.map((image) => {
          console.log("Image data:", image.attributes.picture.data[0].attributes.url);
          return (
            <ImageListItem key={image.id}>
              <img
                src={`${conf.apiPrefix}${image.attributes.picture.data[0].attributes.url}`}
                alt={image.attributes.Title}
              />
              <div>{image.attributes.Title}</div>
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
};

export default Home;
