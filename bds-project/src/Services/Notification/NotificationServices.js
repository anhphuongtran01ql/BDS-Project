import axios from "axios";
import Global from "../../global";
import {authHeader} from "../../Helper/AuthHeader";

const updateNotification = async (data) => {
    const response = await axios.put(
        `${Global.BASE_API_PATH}/api/v1/notification/`, // change to edit comment api
        data,
        authHeader()
    );
    return response?.data;
}

const fetchNotifications = async (userId) => {
    const {data} = await axios.get(
        `${Global.BASE_API_PATH}/api/v1/notifications/list/${userId}`,authHeader()
    );

    return data;
}

export {updateNotification, fetchNotifications}