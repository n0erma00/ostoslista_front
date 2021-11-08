import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const URL = 'http://localhost/ostoslista/header.php';
const URL2 = 'http://localhost/ostoslista/functions.php';
const URL3 = 'http://localhost/ostoslista/delete.php';

function App() {

  const [item, setItem] = useState([]);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  function save(e) {                //lisää funktio
    e.preventDefault();     
    const json = JSON.stringify({description:desc})
    axios.post(URL2, json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setItem(item => [...item,response.data]);
      setDesc('');
      setAmount('');
    }).catch (error => {
      alert(error.response.data.error)
    });
  }

  function remove(id) {             //poista funktio
    const json = JSON.stringify({id:id})
    axios.post(URL3,json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      const newListWithoutRemoved = item.filter((item) => item.id !== id);
      setItem(newListWithoutRemoved);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    })
  }

  useEffect(() => {
    axios.get(URL)
    .then((response) => {
      console.log(response.data);
      setItem(response.data);
    }).catch(error => {
      alert(error);
    })
  }, [])


  return (
    <div className="container">
      <h3>Shopping list</h3>
      <form onSubmit={save}>        
          <label>New item</label>
          <input value={desc} onChange={e => setDesc(e.target.value)}></input>
          <input value={amount} onChange={e => setAmount(e.target.value)}></input>
          <button>Add</button>   
      </form>
      <ul>
        {item?.map(item => (
          <li key={item.id}>{item.description} kpl {item.amount}&nbsp;
          <a href="#" className='delete' onClick={() => remove(item.id)}>Delete</a></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
