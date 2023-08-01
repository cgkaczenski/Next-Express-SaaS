import sgMail from "@sendgrid/mail";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
sgMail.setApiKey(SENDGRID_API_KEY);

export async function sendWelcomeEmail(name: string, toEmail: string) {
  const text = "Thanks for joining GoBerserk! I hope you enjoy it.";
  const html = `Welcome ${name},
    <p>
    Thanks for joining <a href="https://next-express-saa-s.vercel.app/" target="blank">GoBerserk</a>!
    </p>
    <p>
    I hope you enjoy it.
    </p>
    Chris Kaczenski, GoBerserk
  `;

  const msg = {
    to: toEmail,
    from: ADMIN_EMAIL,
    subject: "Welcome to GoBerserk!",
    text: text,
    html: html,
  };

  return await sgMail.send(msg);
}
