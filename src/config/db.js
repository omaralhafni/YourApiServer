import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    console.log(
      "MongoDB connected: ",
      connection.connection.host
    );
  } catch (error) {
    console.error(`Error : ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
