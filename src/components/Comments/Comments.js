import Comment from "./Comment";
import useFileData from "../../hooks/use-file-data";
import {useEffect} from "react";

const Comments = () => {
    const {fileData} = useFileData('./data.json');
    const populateInitData = () => {
        if(!localStorage.getItem('currentUser') || !localStorage.getItem('comments')){
            localStorage.setItem('currentUser', JSON.stringify(fileData.currentUser))
            localStorage.setItem('comments', JSON.stringify(fileData.comments))
        }
        else{
            console.warn("Data already pupulated")
        }

    }
    useEffect(() =>{
        populateInitData();
    }, [populateInitData])
    return (
        <div>
            <Comment replies={[1]}/>
            <Comment replies={[1]}/>
        </div>

    )
}
export default Comments;