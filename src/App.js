import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const URL = 'http://localhost/ostoslista/header.php';
const URL2 = 'http://localhost/ostoslista/functions.php';

function App() {

  const [item, setItem] = useState([]);
  const [desc, setDesc] = useState('')

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item})
    axios.post(URL2, json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setItem(item => [...item,response.data]);
      setDesc('');
    }).catch (error => {
      alert(error.response.data.error)
    });
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL2,json, {
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
      <h1>Shopping list</h1>
      <form onSubmit={save}>
        
          <label>New item</label>
          <input value={desc} onChange={e => setDesc(e.target.value)}></input>
          
          <button>Add</button>
        
      </form>
      <ul>
        {item?.map(item => (
          <li key={item.id}>{item.description} kpl {item.amount} <a href="#" className='delete' onClick={() => remove(item.id)}>Delete</a></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
