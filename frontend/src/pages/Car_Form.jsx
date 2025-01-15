import { Container, Box, Typography, TextField, Button, Card, CardMedia, Grid2, IconButton, Alert, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useRef, useEffect } from 'react';
import aws_logo from '../assets/aws_logo.png';
import { useParams, useNavigate } from 'react-router-dom';

const Car_Form = () => {
  const [model, setModel] = useState('');
  const [price, setPrice] = useState(0);
  const [phone, setPhone] = useState('');
  const [maxPics, setMaxPics] = useState(0);
  const [urls, setURLs] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const {userId} = useParams();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const priceHandler = (e) => {
    const value = e.target.value;
    setPrice(value === '' ? '' : parseInt(value))
  };

  const maxPicsHandler = (e) => {
    const value = e.target.value;
    setMaxPics(value === '' ? '' : parseInt(value))
  };

  const fileHandler = (e) => {
    const value = Array.from(e.target.files);
    if (value.length > maxPics) {

      alert("Please pick the same amount of files as max pictures");
      setFiles([]);
      fileInputRef.current.value = null;
    }
    else {
      setFiles(value);
    }
  };

  const uploadImages = async () => {
    setLoading(true);
    try {

      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const { url } = await fetch("http://localhost:3000/s3Url").then(res => res.json());
          console.log(url);
          await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            body: file
          })
          const imageUrl = url.split('?')[0];
          console.log("image:", imageUrl);
          return imageUrl;
        })
      );
      setURLs(uploadedUrls);
      console.log("Uploaded image URLs:", uploadedUrls);
      setUploaded(true);
    }
    catch (error) {

    } finally {
      setLoading(false);
    }
  };

  const uploadPost = async () => {
    try {

      const postData = {
        "model": model,
        "postedBy": userId,
        "price": price,
        "phone_number": phone,
        "max_pictures": maxPics,
        "pictures": urls
      }

      const response = await fetch('http://localhost:3000/cars/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const result = await response.json();
      alert("Post submitted successfully");
      console.log("Post submitted successfully", result);
      setModel('');
      setPrice(0);
      setPhone('');
      setMaxPics(0);
      setURLs([]);
      setFiles([]);
      setUploaded(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // Reset the file input
      }
      navigate(`/view-listings/${result.id}`);
    }
    catch (error) {
      console.error('Error submitting post:', error.message);
      alert('Error submitting post: ' + error.message);
    }
  };

  const discard = () => {
    setModel('');
    setPrice(0);
    setPhone('');
    setMaxPics(0);
    setURLs([]);
    setFiles([]);
    setUploaded(false)
    setLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the file input
    }
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'stretch',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          textAlign: 'center',
          py: '5%',
          gap: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            height: '100%',
            width: { lg: '60%' },
            textAlign: 'center',
            gap: '20px',

          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'stretch',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              gap: '20px',
            }}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: {
                xs: '100%',
                md: '60vh',
              }
            }}>
              <Typography sx={{ textAlign: 'left', width: '100%' }}>
                Car Model
              </Typography>
              <TextField
                id="model"
                label="Enter make and model"
                type="text"
                variant="outlined"
                fullWidth
                value={model}
                onChange={(e) => { setModel(e.target.value) }}
                margin="normal"
              />
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: {
                xs: '100%',
                md: '30vh',
              }
            }}>
              <Typography sx={{ textAlign: 'left', width: '100%' }}>
                Price
              </Typography>
              <TextField
                id="price"
                label="Enter selling price"
                type="number"
                variant="outlined"
                fullWidth
                value={price}
                onChange={priceHandler}
                margin="normal"
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'stretch',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              gap: '20px',
            }}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: {
                xs: '100%',
                md: '60vh',
              },
            }}>
              <Typography sx={{ textAlign: 'left', width: '100%' }}>
                Phone number
              </Typography>
              <TextField
                id="phone"
                label="Enter phone number"
                type="text"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => { setPhone(e.target.value) }}
                margin="normal"
              />
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: {
                xs: '100%',
                md: '30vh',
              }
            }}>
              <Typography sx={{ textAlign: 'left', width: '100%' }}>
                Number of Pictures
              </Typography>
              <TextField
                id="max-pics"
                label="Enter between 1-10 (inclusive)"
                type="number"
                variant="outlined"
                fullWidth
                value={maxPics}
                onChange={maxPicsHandler}
                margin="normal"
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          px: '10px',
          py: '10px',
          position: 'relative',
        }}>
          {
            uploaded ? (
              <div>
                <Grid2 container spacing={1} sx={{ px: '10%', py: '10%' }}>
                  {urls.map((url, index) => (
                    <Grid2 item size={2.2} key={index}>
                      <Card sx={{ maxWidth: '100px', maxHeight: '100px', margin: 'auto' }}>
                        <CardMedia
                          component="img"
                          alt={`Uploaded image ${index + 1}`}
                          height="100"
                          image={url}
                        />
                      </Card>
                    </Grid2>
                  ))}
                </Grid2>
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                  }}
                  variant="outlined"
                  onClick={discard}
                >
                  <DeleteIcon />
                </IconButton>
                <Box
                    sx={{
                      height: 'auto',
                      width: '100px',
                      position: 'absolute',
                      top: {xs:'280px',sm:'310px',md:'350px',lg:'280px'},
                      right: '20px'
                    }}
                  >
                    <img
                      src={aws_logo}
                      alt=""
                      style={{
                        width: '100%',
                        height: 'auto'
                      }}
                    />
                  </Box>
              </div>
            ) : (
              <div>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  px: '10px',
                }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}>
                    <Typography sx={{ textAlign: 'left', width: '100%', marginBottom: '10px' }}>
                      Pictures
                    </Typography>
                    <input
                      id="pics"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={fileHandler}
                      ref={fileInputRef}
                      style={{
                        display: 'block',
                        width: '93%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                      }}
                    />
                  </Box>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                    }}
                    variant="outlined"
                    onClick={discard}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                < Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={async () => {
                        await uploadImages();
                      }}
                      sx={{
                        mt: 'auto',
                        alignSelf: 'center',
                        mb: 2
                      }}
                    >
                      Upload
                    </Button>
                  )}
                  <Box
                    sx={{
                      height: 'auto',
                      width: '100px',
                      position: 'absolute',
                      top: {xs:'30px',lg:'100px'},
                      right: '10px'
                    }}
                  >
                    <img
                      src={aws_logo}
                      alt=""
                      style={{
                        width: '100%',
                        height: 'auto'
                      }}
                    />
                  </Box>
                </Box>
              </div>
            )
          }
        </Box>
      </Box>


      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
      }}>
        <Button
          sx={{
            ":hover": { bgcolor: 'lightskyblue' }
          }}
          variant="contained"
          onClick={async () => {
            await uploadPost();
          }}
        >
          Submit
        </Button>

        {/* <IconButton sx={{
          width:'50px',
          height:'50px',
          borderRadius: '8px',
          bgcolor: 'red',
            ":hover": { bgcolor: 'red' }
          }}
          variant="outlined"
          onClick={discard}>
          <DeleteIcon/>
        </IconButton> */}


      </Box>
    </Container >
  )
}

export default Car_Form;
