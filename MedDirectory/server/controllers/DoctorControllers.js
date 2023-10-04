import Doctors from '../model/doctorModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new doctor and return a token
const doctorRegister = async (req, res, next) => {
    try {
        const { name, email, password, specialization, experience} = req.body;
        console.log("inicio")
        const emailCheck = await Doctors.findOne({ email });
        if (emailCheck) {
            return res.json({ message: 'Email already exists', status: false });
        }
        console.log("emailCheck")
        const hashedPassword = await bcrypt.hash(password, 10);
        const doctor = await Doctors.create({
            name,
            email,
            password: hashedPassword,
            specialization,
            experience
        });
        console.log("doctor created")
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(201).json({ token });
    } catch (error) {
        next(error);
    };
}

// Login a registered doctor
const doctorLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctor.findOne({ email });
        if (!doctor) {
            return res.json({ message: 'Email does not exist', status: false });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.json({ message: 'Incorrect password', status: false });
        }
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ token });
    } catch (error) {
        next(error);
    };
}

const getAllDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctors.find().select([
            "name", "specialization", "experience", "avatarImage", "email",
        ]);
        return res.status(200).json(doctors);
    } catch (error) {
        next(error);
    };
}

const getDoctorbyName = async (req, res, next) => {
    try {
        const doctor = await Doctors.findOne({ name: req.params.name }).select([
            "name", "specialization", "experience", "avatarImage", "email"
        ]);
        return res.status(200).json(doctor);
    } catch (error) {
        next(error);
    };
}

const UpdateDoctorbyId = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const body = req.body;
        const doctor = await Doctors.findByIdAndUpdate(doctorId, body, { new: true });
        return res.status(200).json(doctor);
    } catch (error) {
        next(error);
    }
};

export { doctorRegister, doctorLogin, getAllDoctors, getDoctorbyName, UpdateDoctorbyId };