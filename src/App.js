import *as axios from 'axios'
import logo from './logo.svg';
import './App.css';
import React , {useState, useEffect, useLayoutEffect,useCallback} from "react"
import { Form, Button } from 'react-bootstrap';
import ModalWindow from './Modal/Modal';
import Paginator from './Pagination/Pagination';

function App() {

  const [books , setBooks] = useState('');
  const [apiKey , setApiKey] = useState('AIzaSyB6oWthkmh9kIhwr8EW6_XE_vJgIa5VsvA')
  const [result , setResult] = useState([])
  const [modal , setModal] = useState(false)  
  const [img , setImg] = useState(<img src=" "/>)  
  const [title , setTitle] = useState('')  
  const [description , setDescription] = useState(false)  
  const [text , setText] = useState('')  
  const [startIndex , setStartIndex] = useState(1) 
  const [maxResults , setMaxResults] = useState(10)
  const [items , setItems] = useState([])  
  const [loading , setLoading] = useState(false)
  const [button , setButton] = useState(false)
  

  useEffect((p) => {
 if(startIndex != p  && button == true  ){
    const fetchBooks = async () =>{
      // setButton(true)
      setLoading(true);
  if(books != '' ) handleSubmit()

  setLoading(false)


 }
 fetchBooks()
  }});

//   useEffect((p) => {
//  if( books != books && button == true   ){
//     const fetchBooks = async () =>{
//   setLoading(true);
//   if(books != ''  ) handleSubmit()
  
//   setLoading(false)
//   // setButton(false)

//  }
//  fetchBooks()
//   }})
  
    
  function handleSubmit (event,p) {
    //  event.preventDefault()
    
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${books}&maxResults=${maxResults}&startIndex=${startIndex || 1}&${apiKey}`)
    .then(data => {
      setResult( data.data.items)
      
      setItems( data.data.totalItems)
      paginate(p)

    })
  }
  function eventChange(event) {
    const books = event.target.value
    setBooks(books)
    console.log(books)
  }
   const paginate = (p) => {
  
    setStartIndex(p)
    console.log(startIndex)
    // handleSubmit()
  }

  return (
    <div className="wrapper">
      <ModalWindow isOpened={modal}
      onModalClose={ ()=> setModal(false)}
      title={title}
      info={img}
      onModalDescription={()=> setDescription(true)}
      onModalDescriptionClose={ ()=> setDescription(false)}
      isDescription={description}
      descriptionText={text}
      />

    <div className="container">

      <form onSubmit={handleSubmit}  >
      <div className="form-group">
      <Form.Group controlId="formBasicEmail">
    <Form.Label>Search books</Form.Label>
    <Form.Control type="text" placeholder="Enter books" onChange={eventChange}/>
    <Form.Text className="text-muted">
      Введите в данное поле название или автора интересующего Вас издания.
    </Form.Text>
  </Form.Group>
      
      </div>
      </form>
      <button onSubmit={handleSubmit} onClick={()=>{setButton(true); console.log(button)}} variant="primary"  className='btns'>
      Search
      </button>

      {result.map(b=> ( 
        <div className="block" onClick={ () => <ModalWindow  isOpened={setModal(true)} 
        info={setImg(<a href={b.volumeInfo.previewLink}> <img  src={!b.volumeInfo.imageLinks.thumbnail ?
           {logo} : b.volumeInfo.imageLinks.thumbnail}/> </a>)} 
           title={setTitle(b.volumeInfo.title)} onModalDescription={()=> setDescription(true)} onModalDescriptionClose={ ()=> setDescription(false)} 
           descriptionText={setText(!b.volumeInfo.description ? 'Описание отсутствует' : b.volumeInfo.description)} /> } key={b.id} ><b style={{cursor:"pointer"}}>  {!b.volumeInfo.authors ? 'Информация об авторе отсутствует' : b.volumeInfo.authors  } </b>: {b.volumeInfo.title} <hr/>  </div>
         
      ))}
      
      <div className = 'one'>
        <Paginator maxResult={maxResults} totalPage={items} startIndex={startIndex}  paginate={paginate} />
        </div>

    </div>
    </div>
  );
}

export default App;
