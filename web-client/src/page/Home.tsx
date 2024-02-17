import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Image from '../Models/Model_image';
import { ImageRepository } from '../Repository/ImageRepository';
import conf from "../conf";
import { Navigate, useNavigate } from 'react-router-dom';
import '../StyleCSS/Gallery.css';

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
          <div className='gallery'>
          {error && <div>{error}</div>}
            {images.map((image) => {
              return (
                <div className='class="card"' key={image.id}>
                  <img
                    src={`${conf.apiPrefix}${image.attributes.picture.data[0].attributes.url}`}
                    alt={image.attributes.Title}
                  />
                </div>
              );
            })}</div>
          </div>
      );
  }
};

export default Home;
