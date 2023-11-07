import Doctors from '../models/doctorModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new doctor and return a token
const doctorRegister = async (req, res, next) => {
    try {
        const { name, email, password, specialization, experience} = req.body;
        const emailCheck = await Doctors.findOne({ email });
        if (emailCheck) {
            return res.json({ message: 'Email already exists', status: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const doctor = await Doctors.create({
            name,
            email,
            password: hashedPassword,
            specialization,
            experience
        });
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

export { doctorRegister, doctorLogin };