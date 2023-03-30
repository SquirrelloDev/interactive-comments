import commentContext from "./comment-context";
import useFileData from "../hooks/use-file-data";
import {useCallback, useEffect, useState} from "react";
const CommentProvider = ({children}) => {
    const {getFileData} = useFileData();
    const [comments, setComments] = useState([]);
    const populateComments = useCallback(async () => {
        const commentsData = await getFileData('./data.json');
        setComments(commentsData.comments);
    }, [getFileData]) 
    useEffect(() => {
        populateComments();
    }, [populateComments])
    const value = {
        comments
    }
  return <commentContext.Provider value={value}>{children}</commentContext.Provider>
}
export default CommentProvider;