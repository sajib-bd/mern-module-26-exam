import mongoose from "mongoose";

const LoginSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Login = mongoose.model("login", LoginSchema);
export default Login;
