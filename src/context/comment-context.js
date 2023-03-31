import React from "react";
const initalValue = {
    comments: [],
    modifyScore: (parentId, commentId, score) =>{},
    addComment: (type = 'new', replyId = null, commentMetaData) => {}
}
const commentContext = React.createContext(initalValue);
export default commentContext;