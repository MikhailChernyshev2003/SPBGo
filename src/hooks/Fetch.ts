import {URLTypes} from "../types/MainTypes";

const Fetch = async (url: string, token: any) => {
    const response = await fetch(url, {
        // mode: "no-cors",
        method: 'GET',
        // cache: 'no-cache',
        headers: {
            "Content-type": "application/json",
            "Access-token": token
        },
        // body: `${ JSON.stringify(data) }`
    })
    return await response.json();
}

export default Fetch;