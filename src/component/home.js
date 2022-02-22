import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./home.css";
import { Stack, Pagination } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

const currentYear = new Date().getFullYear();

function Home() {

  const [categoryId, setCategoryId] = useState([11]);
  const [suggestion, setSuggestion] = useState([])
  const [page, setPage] = useState([]);
  const [size, setSize] = useState([10]);
  const [book, setBook] = useState([])
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const handleChange = (event , value) => {
    event.preventDefault();
    setPage(value)
  }

  const handleChangeSize = e => {
    const {value} = e.target
    setSize(value)
  }

  const handleChangeCategory = e => {
    const {value1} = e.target
    setCategoryId(value1)
  }

  useEffect(() => {
    axios
      .get(`/fee-assessment-books?categoryId=${categoryId}&page=${page}&size=${size}`)
      .then((response) => {
        setBook(response.data)
      });
  }, [page,size,categoryId]);

  useEffect(() => {
    axios
      .get(`/fee-assessment-categories`)
      .then((response) => {
        setSuggestion (response.data)
      });
  }, []);

  console.log(handleChangeCategory,"category")


  return (
    <div className="wrapperHome">
      <div className="fillterPage">
        <div className="btn-filter">
        
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleClick}>Filter Size</Button>
          </Stack>

          {show ?

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
              <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group">
              <FormControlLabel onChange={ handleChangeSize } value="5" control={<Radio />} label="5" />
              <FormControlLabel onChange={ handleChangeSize } value="10" control={<Radio />} label="10" />
              <FormControlLabel onChange={ handleChangeSize } value="15" control={<Radio />} label="15" />
            </RadioGroup>
          </FormControl>

          :

          null

          }
        </div>
      
      </div>
      <div className="text-center">
          <h1 className="title">
            Booku {currentYear}!
          </h1>
      </div>

      <div className="wrapper-btn-suggest">
        <p>Categories Book</p>
        <div className="btn-flex">
        {suggestion.map((suggest) => (
          <div className="btn-suggest">
            <Stack direction="row" spacing={2} >
              <Button 
              variant="contained"
              value1="1"
              onChange={handleChangeCategory}
              >{suggest.name}</Button>
            </Stack>
          </div>
        ))}

        </div>
      </div>
      <div className="displayCard">

        {book.map ((buku) => (
          <div className="card">
            <a key={buku} href="#">
              <div className="cardBook">
                <img className="thumbnail" src={buku.cover_url} alt="gambar" />
              </div>

              <div className="cardBody">
                <p className="bookTittle">{book.title}</p>
              </div>
            </a>
          </div>
        ))}
      </div>

      <div className="pagination">
          <Stack spacing={2}>
            <Pagination count={9}
              onChange={handleChange}
              color="primary"
              size="large"
            />
          </Stack>
        </div>
    </div>


  )
}

export default Home