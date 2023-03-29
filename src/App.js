import {useEffect, useState} from "react";
import Wrapper from "./components/UI/Wrapper";
import useFileData from "./hooks/use-file-data";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Wrapper/>
    </AuthProvider>
  );
}

export default App;
