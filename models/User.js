const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "You shoud specify an user"],
        validate: {
            message: "This email is already in use",
            validator: async (email) => {
                const items = await mongoose.model("User").countDocuments({ email });
                return items === 0;
            }
        }
    },
    password: {
        type: String,
        required: [true, "A password must be defined"]
    },
    name: {
        type: String,
        required: [true, "A name for the user is required"]
    },
    lastName: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema);