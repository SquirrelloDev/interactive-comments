import React from "react";
const initalValue = {
    comments: [],
    modifyScore: (parentId, commentId, score) =>{}
}
const commentContext = React.createContext(initalValue);
export default commentContext;