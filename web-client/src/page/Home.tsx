import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from '../Models/Model_image';
import { ImageRepository } from '../Repository/ImageRepository';
import conf from "../conf";
import { Navigate, useNavigate } from 'react-router-dom';

const getUser = () => {
  const User = localStorage.getItem("user") || "";
  if (User) {
    return JSON.parse(User);
  }
  return false;
};

const Home = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<string | null>(null);
  const userData = getUser();
  const navigate = useNavigate();

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

  if (!userData) {
    return <Navigate to="/mainLogin" />;

  } else {
      return (
        <div>
          <Navbar />
          {error && <div>{error}</div>}
          <ImageList sx={{ width: '40%', height: '40%' }} cols={3} gap={0}>
            {images.map((image) => {
              console.log("Image data:", image.attributes.picture.data[0].attributes.url);
              return (
                <ImageListItem key={image.id}>
                  <img
                    src={`${conf.apiPrefix}${image.attributes.picture.data[0].attributes.url}`}
                    alt={image.attributes.Title}
                    style={{ width: '80%', height: '80%' }}
                  />
                  <div>{image.attributes.Title}</div>
                </ImageListItem>
              );
            })}
          </ImageList>
        </div>
      );
  }
};

export default Home;
