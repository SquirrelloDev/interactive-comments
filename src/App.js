import {useEffect, useState} from "react";
import Wrapper from "./components/UI/Wrapper";
import useFileData from "./hooks/use-file-data";
import AuthProvider from "./context/AuthProvider";
import CommentProvider from "./context/CommentProvider";

function App() {
  return (
    <AuthProvider>
        <CommentProvider>
            <Wrapper/>
        </CommentProvider>
    </AuthProvider>
  );
}

export default App;
