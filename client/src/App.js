import {useState,useEffect} from 'react'
import './App.css';
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listFromDb, setListFromDb] = useState([]);
  
  const addFriend = () => {
     Axios.post("http://localhost:3001/addfriend", {
      name: name,
      age: age
    })
      
    setListFromDb([...listFromDb, { name: name, age: age }]); 
  };

  const updateList = (id) => {
    const newAge = prompt("enter the age:");

    Axios.put("http://localhost:3001/update", { newAge: newAge, id: id })
    
    setListFromDb(listFromDb.map((val) => {
      return  val._id === id ? { _id :id, name: val.name, age: newAge } : val;
    }));
  };

  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
    
    setListFromDb(
      listFromDb.filter((list) => {
        return list._id !== id;
      }));
    
};

  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((res) => { setListFromDb(res.data) }).catch(()=>{console.log("err");})
  }, []);

  return (
    <div className="App">
      <h1> Friends_app</h1>
      <div className="inputs">
        <input onChange={(e) => { setName(e.target.value) }} type="text" placeholder="name..." />
        <input onChange={(e) => { setAge(e.target.value) }} type="number" placeholder="age" />
        <button onClick={addFriend}>Add</button>
      </div>
      <div className='listofFriends' >
        {listFromDb.map((list, index) => {
          return (
            <div key={index} className='friendcontainer'>
              <div  className='friend'>
                <h3>Name: {list.name},</h3>
                <h3>Age: {list.age}</h3>
              </div>
              <button onClick={()=>{updateList(list._id)}}>update</button>
              <button onClick={()=>{deleteFriend(list._id)}}>delete</button>
            </div>
          )
        })}
      </div>
    </div>

  );
}

export default App;
