import nodemailer from "nodemailer";

export const sendUpdateEmail = async ({ reqBody }: any) => {
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

    const mailData = {
      from: `WBTPTA AMTA WEST <${mail}>`, // Fixed format
      replyTo: mail,
      to: mail,
      subject: `${reqBody?.tname} has Updated his Details: Mail no ${Math.floor(
        Math.random() * 1000 + 1
      )}`,
      text: `Hello Admin!`,
      html: `<h1 style="text-align:center; color:blue; ">Hello Dear Admin!</h1>
        <h2 style="text-align:center; color:blue;">${
          reqBody?.tname
        } has Updated his Details: ${JSON.stringify(reqBody)}</h2>`,
    };

    await new Promise((resolve, reject) => {
      transport.sendMail(mailData, (err: any, info: any) => {
        err ? reject(err) : resolve(info);
      });
    });

    return "Email sent successfully";
  } catch (error) {
    console.error(error);
    throw error; // Propagate error
  }
};
