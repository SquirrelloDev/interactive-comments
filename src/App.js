import {useState} from "react";
import Wrapper from "./components/UI/Wrapper";

function App() {
  const [loggedUser, setLoggedUser] = useState('julisomo');
  return (
    <>
      <Wrapper/>
    </>
  );
}

export default App;
