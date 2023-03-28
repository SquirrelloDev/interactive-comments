import Comment from "./Comment";
import useFileData from "../../hooks/use-file-data";
import {useCallback, useEffect, useState} from "react";

const Comments = () => {
    const {fileData} = useFileData('./data.json');
    const [comments, setComments] = useState([]);
    const populateInitCommentData = useCallback(() => {
        if(!localStorage.getItem('comments')){
            localStorage.setItem('comments', JSON.stringify(fileData.comments))
        }
        else{
            console.warn("Comments already populated")
        }

    }, [fileData])
    useEffect(() =>{
        populateInitCommentData();
    }, [populateInitCommentData])
    return (
        <div>
            <Comment replies={[1]}/>
            <Comment replies={[1]}/>
        </div>

    )
}
export default Comments;