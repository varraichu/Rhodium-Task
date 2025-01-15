import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Grid2, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

const View_listings = () => {
    const { userId } = useParams();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchListings = async () => {
        try {
            const response = await fetch('https://rhodium-car-platform-9ac4bda6dfd7.herokuapp.com/cars/get-cars');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            const result = await response.json();
            console.log("Listings fetched", result);
            setListings(result);
        }
        catch (error) {
            console.error('Error fetching listings:', error.message);
            alert('Error fetching listings: ' + error.message);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchListings().then(() => setLoading(false));
    }, [])

    return (
        <>
            {loading ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: '50vh',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', py: '10' }}>
                        <Button sx={{
                            ":hover": { bgcolor: 'lightskyblue' }
                        }}
                            variant="outlined"
                            onClick={() => { navigate(`/carform/${userId}`); }}>Create New Listing</Button>
                    </Box>
                    <Box>
                        <Grid2 container spacing={2}>
                            {listings.map((listing) => (
                                <Grid2 item xs={12} sm={6} md={4} key={listing._id}>
                                    <Card
                                        key={listing._id}
                                        sx={{ width: { xs: '100%', md: '400px', lg: '350px' }, height: { xs: '360px', sm: '450px', md: '410px' } }}>
                                        <CardActionArea>
                                            <Box sx={{ width: '100%', height: { xs: '200px', sm: '280px', md: '230px' } }}>
                                                <Swiper
                                                    slidesPerView={1}
                                                    navigation={true}
                                                    pagination={{ clickable: true }}
                                                    loop={true}
                                                    modules={[Navigation, Pagination]}
                                                    style={{
                                                        height: '100%',
                                                    }}
                                                >
                                                    {listing.pictures.map((image, index) => (
                                                        <SwiperSlide key={index}>
                                                            <img
                                                                src={image}
                                                                alt={`Slide ${index + 1}`}
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            </Box>

                                            <CardContent>
                                                <Typography gutterBottom
                                                    sx={{ fontSize: { xs: '1.3rem', sm: '1.6rem', md: '1.5rem' }, fontWeight: 'bold' }}
                                                    component="div"
                                                >
                                                    {listing.model}
                                                </Typography>
                                                <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '1rem', md: '1rem' } }}>
                                                    Price: ${listing.price}
                                                </Typography>
                                                <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '1rem', md: '1rem' } }}>
                                                    Posted by: {listing.postedBy}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="primary"
                                                sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' } }}
                                                component="a"
                                                href={`tel:${listing.phone_number}`}
                                            >
                                                Contact
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default View_listings
