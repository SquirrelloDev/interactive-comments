import React from "react";
export const initialUser = {
    username: "",
    image: {
        png: "",
        webp: ""
    }
}
const authContext = React.createContext(initialUser);
export default authContext;