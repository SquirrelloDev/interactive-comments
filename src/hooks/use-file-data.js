const useFileData = () => {
    const getFileData = async (path) =>{
        const res = await fetch(path);
        const data = await res.json();
        return data;
    }
    return{
        getFileData
    }
}
export default useFileData;