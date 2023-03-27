import {useEffect, useState} from "react";

const useFileData = (filePath) => {
    const [fileData, setFileData] = useState([]);
    const getFileData = async (path) =>{
        const res = await fetch(path);
        const data = await res.json();
        setFileData(data);
    }
    useEffect(() => {
        getFileData(filePath)
    }, [filePath])
    return{
        fileData
    }
}
export default useFileData;