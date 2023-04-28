import axios from "axios";
import Global from "../../global";
import { authHeader } from "../../Helper/AuthHeader";

const fetchAllTypeApartments = async () => {
  const { data } = await axios.get(
    `${Global.BASE_API_PATH}/api/v1/apartment-type/list`,
    authHeader()
  );
  return data;
};

const fetchTypeApartmentById = async (id) => {
  const response = await axios.get(
    `${Global.BASE_API_PATH}/api/v1/apartment-type/${id}`,
    authHeader()
  );
  return response?.data;
};

const createNewTypeApartment = async (data) => {
  const response = await axios.post(
    `${Global.BASE_API_PATH}/api/v1/apartment-type/new`,
    data,
    authHeader()
  );
  return response?.data;
};

const editTypeApartment = async (data) => {
  const response = await axios.put(
    `${Global.BASE_API_PATH}/api/v1/apartment-type/update`,
    data,
    authHeader()
  );
  return response?.data;
};

export {
  fetchAllTypeApartments,
  fetchTypeApartmentById,
  createNewTypeApartment,
  editTypeApartment,
};
