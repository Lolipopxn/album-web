import React from "react";
import { useState, useEffect, useRef } from "react";
import conf from "../conf";
import { Button, TextField } from "@mui/material";
import User from "../Models/Model_User";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Grid } from '@mui/material';
import NavbarLeft from "../components/NavbarLeft";

const Add = () => {
  const [user, setUser] = useState<User | null>(null);
  const MySwal = withReactContent(Swal);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [Title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedImage = files[0];
      setImage(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const droppedImage = files[0];
      setImage(droppedImage);
      setImageUrl(URL.createObjectURL(droppedImage));
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!user) {
      alert("You are not authorized to create an activity.");
      return;
    }

    if (!image) {
        MySwal.fire({
          title: 'Missing Image',
          icon: 'error',
          text: 'Please select an image before submitting.',
        });
        return;
      }

    const formData = new FormData();

    formData.append("data", JSON.stringify({
      Title,
      description,
      email: user.email,
    }));

    formData.append("files.picture", image!);

    try {
      const response = await fetch(`${conf.apiPrefix}/api/images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
        body: formData,
      });
      if (response.ok) {
        MySwal.fire({
          title: 'Complete!',
          icon: 'success',
          text: 'Add complete',
        }).then(() => {
          window.location.reload();
        });
        
      } else {
        console.error(`Failed to add image. Status code: ${response.status}`);
        MySwal.fire({
          title: 'Error!',
          icon: 'error',
          text: 'not complete',
        });
      }
    } catch (error) {
      console.error(error);
      MySwal.fire({
        title: 'Error!',
        icon: 'error',
        text: 'error',
      });
    }
  };


  return (
    
    <div>
      <NavbarLeft />
      <form onSubmit={handleSubmit}>
        <div
          style={{
            border: "2px dashed #ccc",
            padding: "10px",
            maxWidth: "500px",
            minHeight: "200px",
            marginTop: "50px",
            marginLeft: "510px",
            cursor: "pointer",
          }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={handleFileClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="picture/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {imageUrl && <img src={imageUrl} alt="Selected or dropped image" style={{ maxWidth: "500px",}} />}
          {!imageUrl && <p
            style={{
                marginTop: "100px",
                marginLeft: "100px",
            }}
          >
            drop a file here, or click to select a file.
         </p>}
        </div>
        
        <Grid container justifyContent="center">
      <Grid >
        <label>
            <center>
                <h4>Add Picture</h4>
            </center>
        </label>
        <label>Title</label>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            value={Title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label>Description</label>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </form>
      </Grid>
    </Grid>
    <Button type="submit" variant="contained" color="primary" sx={{ position: 'fixed' ,left: 1300,bottom:600, ml: 10, mt: 2,
            '&:hover': {
            background: 'rgb(18, 187, 41)',color: 'white'
            }}}>
            Save
          </Button>
      </form>
    </div>
  );
}

export default Add;
