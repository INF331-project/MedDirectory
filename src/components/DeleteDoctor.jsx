import axios from "axios";
import { host } from '../utils/APIRoutes';

export const deleteDoctorById = async (doctorId) => {
  try {
    const response = await axios.delete(
      `${host}/DeleteDoctorbyId/${doctorId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default deleteDoctorById;