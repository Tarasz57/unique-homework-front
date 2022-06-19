import { useState } from 'react'
import axios from 'axios';
import './App.css';

function App() {

  const [state, setState] = useState({ selectedFile: null, results: null })

  const onFileChange = event => { 
    // Update the state 
    setState({ selectedFile: event.target.files[0] }); 
  }; 

  const onFileUpload = () => { 
    // Create an object of formData 
    const formData = new FormData(); 
   
    // Update the formData object 
    formData.append( 
      "file", 
      state.selectedFile, 
      state.selectedFile.name 
    ); 
   
    formData.append(
      "algorithm",
      "bubble"
    )

    // Details of the uploaded file 
    console.log(state.selectedFile); 
   
    // Request made to the backend api 
    // Send formData object 

    axios.post("http://localhost:8080/api/v1/sorted-students", formData).then((response) => {
      // handle success
      setState({ results: response.data })
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    }); 
  }; 

  const generateTable = (results) => {
    const { sortedStudents, entriesProcessed, sortingTime, parsingTime } = results;
    console.log(sortedStudents);
    sortedStudents.map((val, key) => {
      return (
        <tr key={key}>
          <td>{val.name}</td>
        </tr>
      )
    })
  }

  return (
    <div>
      <div> 
          <input type="file" onChange={onFileChange} /> 
          <button onClick={onFileUpload}> 
            Upload! 
          </button> 
      </div> 
      <table>
        <tr>
      <th>Name</th>
          <th>Grade</th>
        </tr>
    {state.results && generateTable(state.results)}
    </table>
  </div> 
  );
}

export default App;
