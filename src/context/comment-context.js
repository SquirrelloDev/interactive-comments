import React from "react";
const initalValue = {
    comments: [],
    modifyScore: (mode='', parentId, commentId, score, text) =>{},
    addComment: (type = 'new', replyId = null, childId = null, commentMetaData) => {}
}
const commentContext = React.createContext(initalValue);
export default commentContext;