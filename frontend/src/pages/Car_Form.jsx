import React, { useState, useRef, useEffect } from 'react'

const Car_Form = () => {
  const [model, setModel] = useState('');
  const [price, setPrice] = useState(0);
  const [phone, setPhone] = useState('');
  const [maxPics, setMaxPics] = useState(0);
  const [urls, setURLs] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploaded, setUploaded] = useState(false);
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
  };

  const uploadPost = async () => {
    try {

      const postData = {
        "model": model,
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
      fileInputRef.current.value = null;
    }
    catch (error) {
      console.error('Error submitting post:', error.message);
      alert('Error submitting post: ' + error.message);
    }
  };

  return (
    <div>
      <form action="">
        <label htmlFor="">
          Car Model
          <input
            type="text"
            placeholder='Enter make and model'
            value={model}
            onChange={(e) => { setModel(e.target.value) }}
          />
        </label>
        <label htmlFor="">
          Price
          <input
            type="number"
            placeholder='Enter selling price'
            value={price}
            onChange={priceHandler}
          />
        </label>
        <label htmlFor="">
          Phone number
          <input
            type="text"
            placeholder='Enter your phone number'
            value={phone}
            onChange={(e) => { setPhone(e.target.value) }}
          />
        </label>
        <label htmlFor="">
          Maximum Number of Pictures
          <input
            type="number"
            placeholder='Enter between 1-10 (inclusive)'
            value={maxPics}
            onChange={maxPicsHandler}
          />
        </label>
        <label htmlFor="">
          Pictures
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={fileHandler}
            ref={fileInputRef}
          />
        </label>
      </form>

      <button onClick={async () => {
        await uploadImages();
      }}>
        Upload
      </button>
      <button onClick={async () => {
        await uploadPost();
      }}>
        Submit
      </button>
        {uploaded ? (
          <div>
            {
              urls.map((url, index)=>{
                return(
                  <img key={index} src={url}/>
                )
              })

            }
          </div>
        ) : null}

      </div>
  )
}

export default Car_Form;
