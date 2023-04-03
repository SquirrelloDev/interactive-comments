import React from "react";
const initalValue = {
    comments: [],
    modifyScore: (parentId, commentId, score) =>{},
    addComment: (type = 'new', replyId = null, childId = null, commentMetaData) => {},
    editComment: (parentId, commentId, text) => {},
    deleteComment: (parentId, commentId) => {}
}
const commentContext = React.createContext(initalValue);
export default commentContext;