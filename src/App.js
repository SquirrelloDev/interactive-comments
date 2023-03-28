import {useEffect, useState} from "react";
import Wrapper from "./components/UI/Wrapper";
import useFileData from "./hooks/use-file-data";

function App() {
  const {fileData} = useFileData('./data.json')
  const [loggedUser, setLoggedUser] = useState('julisomo');
  useEffect(() => {
      if(!localStorage.getItem('currentUser')){
          localStorage.setItem('currentUser', JSON.stringify(fileData.currentUser))
      }
      else{
          console.warn("User populated");
      }
  })
  return (
    <>
      <Wrapper/>
    </>
  );
}

export default App;
