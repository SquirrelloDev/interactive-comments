import authContext, {initialUser} from "./auth-context";
import {useCallback, useEffect, useState} from "react";
import useFileData from "../hooks/use-file-data";
const AuthProvider = ({children}) => {
    const {getFileData} = useFileData()
    const [user, setUser] = useState(initialUser);
    const populateUser = useCallback(async () => {
        const data = await getFileData('./data.json');
        setUser(data.currentUser);
    }, [getFileData]) 
    useEffect(() => {
        populateUser();
    }, [populateUser])
    const authValue = user;
  return (
      <authContext.Provider value={authValue}>{children}</authContext.Provider>
  )
}
export default AuthProvider;