import nodemailer from "nodemailer";

const sendEmail = async ({ email, code, name, username }: any) => {
  try {
    const mail = process.env.WBTPTA_GMAIL_ID;
    const mailpassword = process.env.WBTPTA_GMAIL_PASSWORD;

    // Validate environment variables
    if (!mail || !mailpassword) {
      throw new Error("Email credentials are missing in environment variables");
    }

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
    });

    await new Promise((resolve, reject) => {
      transport.verify((error: any, success: any) => {
        error ? reject(error) : resolve(success);
      });
    });

    // Fixed mailData with guaranteed string values
    const mailData = {
      from: `WBTPTA AMTA WEST <${mail}>`, // Using string format instead of object
      replyTo: email,
      to: email,
      subject: `Reset your Password: Mail no ${Math.floor(
        Math.random() * 1000 + 1
      )}`,
      text: `Hello Dear ${name}!`,
      html: `<h1 style="text-align:center; color:blue; ">Hello Dear ${name} and Username is ${username}</h1>
        <h2 style="text-align:center; color:blue;">Your OTP is ${code}. Please use this OTP to reset your password.</h2>`,
    };

    await new Promise((resolve, reject) => {
      transport.sendMail(mailData, (err: any, info: any) => {
        err ? reject(err) : resolve(info);
      });
    });

    return "Email sent successfully";
  } catch (error) {
    console.error(error);
    throw error; // Propagate error to caller
  }
};

export default sendEmail;
