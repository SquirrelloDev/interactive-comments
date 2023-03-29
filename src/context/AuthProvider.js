import authContext, {initialUser} from "./auth-context";
import {useEffect, useState} from "react";
import useFileData from "../hooks/use-file-data";
const AuthProvider = ({children}) => {
    const {getFileData} = useFileData()
    const [user, setUser] = useState(initialUser);
    const populateUser = async () => {
        const data = await getFileData('./data.json');
        setUser(data.currentUser);
    }
    useEffect(() => {
        populateUser();
    }, [populateUser])
    const authValue = user;
  return (
      <authContext.Provider value={authValue}>{children}</authContext.Provider>
  )
}
export default AuthProvider;