import Comment from "./Comment";
import useFileData from "../../hooks/use-file-data";

const Comments = () => {
    const {fileData} = useFileData('./data.json');
    const populateInitData = () => {

    }
    return (
        <div>
            <Comment replies={[1]}/>
            <Comment replies={[1]}/>
        </div>

    )
}
export default Comments;