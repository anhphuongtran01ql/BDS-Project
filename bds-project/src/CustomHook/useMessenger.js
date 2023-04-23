import {useEffect, useMemo, useState} from "react";
import {debounce} from "@mui/material";

const handleListMessage = () => {
    let results = [];
    const LIST_MESSAGE = [
        {
            userId: 1,
            message: 'message 1'
        },
        {
            userId: 1,
            message: 'message 2'
        },
        {
            userId: 2,
            message: 'message 3'
        },
        {
            userId: 1,
            message: 'message 2'
        },
        {
            userId: 2,
            message: 'message 3'
        },
        {
            userId: 2,
            message: 'message 4'
        },
        {
            userId: 2,
            message: 'message 4'
        },
        {
            userId: 2,
            message: 'message 4'
        },
        {
            userId: 2,
            message: 'message 4'
        },
        {
            userId: 1,
            message: 'message 5'
        },
    ] //change to useAPI here
    LIST_MESSAGE.map((item, index) => {
        const length = results.length;
        if (results.length === 0) {
            results = [...results, item]
        } else if (results[length - 1]?.userId === item.userId) {
            if (!results[length - 1].hasOwnProperty('messages')) {
                results[length - 1].messages = [results[length - 1].message];
                results[length - 1].multiple = true;
            }
            results[length - 1].messages.push(item.message)
        } else {
            results = [...results, item]
        }
    })

    return results;
}

const useMessenger = (listMessage) => {
    const [messages, setMessages] = useState([])
    useEffect(() =>{ setMessages(handleListMessage())},[])
    return [messages]
}

export default useMessenger;