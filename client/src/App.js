import Axios from 'axios'
import {useState} from 'react'

function App() {



const [name,setName] = useState("");
const [age,setAge] = useState(0);
const [country,setCountry] = useState("");
const [position,setPosition] = useState("");
const [wage,setWage] = useState(0);

const [newWage,setNewWage] = useState(0);

const [employeeList , setEmployeeList] = useState([]);



const getEmployee = () => {
  Axios.get('http://localhost:3001/employee').then((response) => {
    setEmployeeList(response.data);
  });
}




const addEmployee = () => {
  Axios.post('http://localhost:3001/create', {
    name:name,
    age:age,
    country:country,
    position:position,
    wage:wage
  }).then(() => {
    setEmployeeList([
      ...employeeList,
      {
        name:name,
        age:age,
        country:country,
        position:position,
        wage:wage
      }
  ])
  })
}

const updateEmployeeWage = (id) => {
  Axios.put('http://localhost:3001/update', {wage: newWage , id: id}).then((response) => {
    setEmployeeList(
      employeeList.map((val) => {
        return val.id == id ?{
          id: val.id,
          name: val.name,
          country: val.country,
          age: val.age,
          position: val.position,
          wage: newWage
        } : val;
      })
    )
  })
}

const deleteEmployee = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
    setEmployeeList(
      employeeList.filter((val) => {
        return val.id != id;
      })
    )
  })
}

  return (
    <div className="App container">
      <h1>Employee Information</h1>
      <div className="information">
        <form action>
          <div className="mb-3">
            <label htmlFor="name" className="from-label">Name:</label>
            <br/>
            <input type="text" className="from-control" placeholder="Enter name" 
            onChange={(event) => {
              setName(event.target.value);
            }}/>

          </div>
          <div className="mb-3">
            <label htmlFor="age" className="from-label">Age:</label>
            <br/>
            <input type="number" className="from-control" placeholder="Enter age" 
            onChange={(event) => {
              setAge(event.target.value);
            }}/>
            
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="from-label">Country:</label>
            <br/>
            <input type="text" className="from-control" placeholder="Enter country" 
            onChange={(event) => {
              setCountry(event.target.value);
            }}/>
            
          </div>
          <div className="mb-3">
            <label htmlFor="position" className="from-label">Position:</label>
            <br/>
            <input type="text" className="from-control" placeholder="Enter position" 
            onChange={(event) => {
              setPosition(event.target.value);
            }}/>
            
          </div>
          <div className="mb-3">
            <label htmlFor="wage" className="from-label">Wage:</label>
            <br/>
            <input type="number" className="from-control" placeholder="Enter wage" 
            onChange={(event) => {
              setWage(event.target.value);
            }}/>
            
          </div>
          <button className="btn btn-success" onClick={addEmployee}>Add Employee</button>
        </form>
      </div>
      <hr/>
      <div className="employee">
        <button className="btn btn-primary" onClick={getEmployee}>Show employee</button>
        <br/><br/>
        {employeeList.map((val, key) => {
          return (
            <div className = "emplyee card">
              <div className = "card-body text-left">
                <p className = "card-text">Name: {val.name}</p>
                <p className = "card-text">Age: {val.age}</p>
                <p className = "card-text">Country: {val.country}</p>
                <p className = "card-text">Position: {val.position}</p>
                <p className = "card-text">wage: {val.wage}</p>
                <div className = "d-flex">
                  <input type="text" 
                    style={{width: "300px"}}
                    type="number"
                    placeholder="15000..."
                    className="form-control"
                    onChange={(event) => {
                        setNewWage(event.target.value)
                    }}
                  />
                  <button className ="btn btn-warning" onClick={() => { updateEmployeeWage(val.id)}}>Update</button>
                  <button className ="btn btn-danger" onClick={() => { deleteEmployee(val.id)}}>Delete</button>
                </div>
              </div>
            </div>
          )
        })}
      
      </div>

    </div>
  );
}

function Login(){

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const [logState,setLogState] = useState("");

  const checkLogin = () => {
    Axios.get('http://localhost:3001/login', {
      username:username,
      password:password
    }).then((response) => {
      App;
      if(response.data.message){
        setLogState("response.data.message")
      }else{
        setLogState("response.data[0].username")
      }
    })
  }

  return (

      <div className="text-center">
        <h1>Login</h1>
        <form action>
        <div className="mb-3">
            <label htmlFor="Username" className="from-label">Username:</label>
            
            <input type="text" className="from-control" placeholder="Enter Username" 
            onChange={(event) => {
              setUsername(event.target.value)
            }}/>
            
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="from-label">Password:</label>
            
            <input type="password" className="from-control" placeholder="Enter Password" 
            onChange={(event) => {
              setPassword(event.target.value)
            }}/>
            
        </div>
        <div className="mb-3">
            <button type="submit" className="btn btn-primary" onClick={checkLogin}>
              Login
            </button>
        </div>

        <div className="mb-3">
          <h1>{logState}</h1>
        </div>
        </form>
        
      </div>
  );
}

export default App;
