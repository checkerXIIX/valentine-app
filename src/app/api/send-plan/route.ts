import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();

    console.log("SMTP_HOST", process.env.SMTP_HOST);
    console.log("SMTP_PORT", process.env.SMTP_PORT);
    console.log("SMTP_USER", process.env.SMTP_USER);
    console.log("SMTP_PASS", process.env.SMTP_PASS ? "*****" : "MISSING");

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    transporter.verify().then(console.log).catch(console.error);

    const mailOptions = {
      from: `"Valentine App" <${process.env.SMTP_USER}>`,
      to: process.env.MY_EMAIL,
      subject: "💌 New Valentine Plan Submitted",
      html: `
        <h2>Your Valentine Plan ❤️</h2>
        <p><strong>Dinner:</strong> ${plan.food.join(", ")}</p>
        <p><strong>Dessert:</strong> ${plan.dessert.join(", ")}</p>
        <p><strong>Activity:</strong> ${plan.activity.join(", ")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: err }),
      { status: 500 }
    );
  }
}
