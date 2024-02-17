import { userData } from "../../src/helper";
import Image from "../Models/Model_image";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import conf from '../conf';
import Swal from 'sweetalert2';
import repository from '../Repository';
import { Grid, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import NavBarLeft from '../components/NavbarLeft';

const user = userData();

export default function UserPrivate() {
    const navigate = useNavigate();
    const [IMG, setIMG] = useState<Image[]>([]);

    const fetchImg = async () => {
        const result = await repository.userResult.getAll();
        if (result) {
            setIMG(result);
        }
    };

    async function handleDeleteClick(id: string) {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "If you confirm, you cannot go back.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'confirm',
            cancelButtonText: 'cancel'
        })

        if (result.isConfirmed) {
            try {
                const resp = await fetch(`${conf.apiPrefix}/api/images/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.jwt}`
                    }
                });
                const data = await resp.json();
                console.log(data);
                fetchImg();
            } catch (err) {
                console.error(err);
            }
        }
    }

    useEffect(() => {
        fetchImg();
    }, []);

    return (
      <div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <NavBarLeft />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={2} sx={{ ml: 10, mt: 5 }}>
                {IMG.map((img, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Box sx={{ p: 1 }}>
                            <Card sx={{ maxWidth: 300, width: "100%" }}>
                                <CardMedia
                                    sx={{ height: 200 }}
                                    image={`${conf.apiPrefix}${img.attributes.picture.data[0].attributes.url}`}
                                />
                                <CardContent>
                                    <Typography gutterBottom component="div">
                                        <h3>{img.attributes.Title}</h3>
                                    </Typography>

                                    <CardActions>
                                        <Button
                                            sx={{
                                                '&:hover': {
                                                    background: 'rgb(253, 44, 44)',
                                                    color: 'white'
                                                },
                                                ml: 9
                                            }}
                                            variant="contained"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDeleteClick(img.id.toString())}
                                        >
                                            Delete
                                        </Button>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </div>
    </div>

    );
}
