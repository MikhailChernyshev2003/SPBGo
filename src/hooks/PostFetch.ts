import {URLTypes} from "../types/MainTypes";

const PostFetch = async (url: URLTypes, data: {}) => {
    const response = await fetch(url, {
        // mode: "no-cors",
        method: 'POST',
        cache: 'no-cache',
        headers: {
            "Content-type": "application/json"
        },
        body: `${ JSON.stringify(data) }`
    })
    return await response.json();
}

export default PostFetch;