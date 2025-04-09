import { Users } from "../models/UserModal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = (req, res) => {
    const { name, email, password } = req.body;

    Users.findOne({ email })
        .then((existingUser) => {
            if (existingUser) {
                return res.status(400).json({ message: "Email already registered" });
            }

            // If user doesn't exist, generate salt & hash password
            bcrypt.genSalt(10)
                .then((salt) => {
                    return bcrypt.hash(password, salt);
                })
                .then((hashedPassword) => {
                    const newUser = new Users({
                        name,
                        email,
                        password: hashedPassword
                    });

                    return newUser.save();
                })
                .then((savedUser) => {
                    savedUser.password = ""; // Hide password in response
                    const token = jwt.sign({ email }, process.env.JWT_SECRET);

                    res.status(200).json({
                        success: true,
                        message: "Signup successful",
                        user: savedUser,
                        token
                    });
                })
                .catch((err) => {
                    res.status(500).json({ success: false, message: "Failed to process signup", err });
                });

        })
        .catch((err) => {
            res.status(500).json({ success: false, message: "Error checking existing user", err });
        });


};

export const login = (req ,res) => {
    const {email , password} = req.body;

    Users.findOne({email}).then((user) => {
        if(!user) {
            return res.status(404).json({message:"User Not registered!!"})
        }
      bcrypt.compare(password , user.password).then((data) => {
        if(!data){
            return res.status(400).json({ success:false , message:"password incorrect!!"})
        }
        user.password = '';
        const token = jwt.sign({email} , process.env.JWT_SECRET)

        res.status(200).json({
            success:true,
            message:"Successfully logedIn",
            user,
            token
            

        })
        
      }).catch((err) => {
        res.status(500).json({ success: false, message: "Error comparing passwords", err });

    })
    }).catch((err) => {
        res.status(500).json({ success: false, message: "Error finding user", err });
    });
}

export const getuserController = (req, res) => {
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    Users.findOne({ email: decoded.email })
        .populate({ path: 'channel' })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            // Remove password before sending response
            const { password, ...userWithoutPassword } = user._doc;

            res.status(200).json({
                success: true,
                message: "User fetched successfully",
                user: userWithoutPassword
            });
        })
        .catch((err) => {
            res.status(500).json({ success: false, message: "Error fetching user", error: err.message });
        });
};