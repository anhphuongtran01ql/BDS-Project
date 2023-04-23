import {useEffect, useState} from "react";
import axios from "axios";
import Global from "../global";
import {authHeader} from "../Helper/AuthHeader";

const useFetchNotifications = (userId) => {
    const [notifications, setNotifications] = useState([]);
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refetch, setRefetch] = useState(true)
    const fetchNotification = async () => {
        await axios.get(
            `${Global.BASE_API_PATH}/api/v1/notification/receiver?receiverId=${userId}`, authHeader()
        ).then((response) => {
            setNotifications(response.data)
            setTotal(response.data.filter((item) => item.read === false).length);
        }).catch((error) => setError('unable to get Notifications')
        );
        setLoading(false);
    }

    const handleClickOpenNotification = () => {
        setRefetch(!refetch)
        if(!refetch === true) {
            refetchApi();
        }
    }
    // console.log('handleClick', refetch)
    const invalidateQuery = () => {
        refetchApi();
        setRefetch(!refetch);
    }

    const refetchApi = () => {
        const refetchNotification = async () => await fetchNotification();
        refetchNotification();
    }

    useEffect(() => {
        if (notifications.length <= 0) {
            const fetchFirstTime = async () => await fetchNotification();
            fetchFirstTime();
        }
            const interval = setInterval(async () => {
                console.log('fetch interrval', refetch)
                if (refetch === true) {
                    await fetchNotification();
                }
            }, 5000, refetch);
        return () => clearInterval(interval);
    }, [refetch]);

    return {notifications, total, loading, error, invalidateQuery, handleClickOpenNotification}
}

export default useFetchNotifications;