export const host = import.meta.env.VITE_API_URL;
export const getAllDoctorsRoute = `${host}/getAllDoctors`;
export const updateDoctor = `${host}/UpdateDoctorbyId`;
export const getDoctorByIdRoute = `${host}/getDoctorbyId`;