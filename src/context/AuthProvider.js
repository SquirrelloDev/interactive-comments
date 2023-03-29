import authContext, {initialUser} from "./auth-context";
import {useEffect, useState} from "react";
import useFileData from "../hooks/use-file-data";
const AuthProvider = ({children}) => {
    const {fileData} = useFileData('./data.json')
    const [user, setUser] = useState(initialUser);
    useEffect(() => {
        setUser(fileData.currentUser);
    }, [fileData])
    const authValue = user;
  return (
      <authContext.Provider value={authValue}>{children}</authContext.Provider>
  )
}
export default AuthProvider;