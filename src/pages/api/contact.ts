import type {NextApiRequest, NextApiResponse} from 'next';
import nodemailer from 'nodemailer';

type ContactRequestBody = {
  email?: string;
  message?: string;
  name?: string;
};

type ApiResponse = {
  error?: string;
  ok: boolean;
};

const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

const getEnv = (key: string) => process.env[key]?.trim();

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({error: 'Method not allowed', ok: false});
  }

  const body = (req.body ?? {}) as ContactRequestBody;
  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const message = body.message?.trim() ?? '';

  if (!name || !email || !message) {
    return res.status(400).json({error: 'Please provide name, email, and message.', ok: false});
  }

  if (!validateEmail(email)) {
    return res.status(400).json({error: 'Please enter a valid email address.', ok: false});
  }

  const smtpHost = getEnv('SMTP_HOST');
  const smtpPortRaw = getEnv('SMTP_PORT') ?? '587';
  const smtpPort = Number(smtpPortRaw);
  const smtpUser = getEnv('SMTP_USER');
  const smtpPass = getEnv('SMTP_PASS');
  const contactTo = getEnv('CONTACT_TO_EMAIL');
  const contactFrom = getEnv('CONTACT_FROM_EMAIL') ?? smtpUser;

  const missingConfig: string[] = [];

  if (!smtpHost) {
    missingConfig.push('SMTP_HOST');
  }
  if (!smtpPortRaw || Number.isNaN(smtpPort)) {
    missingConfig.push('SMTP_PORT');
  }
  if (!smtpUser) {
    missingConfig.push('SMTP_USER');
  }
  if (!smtpPass) {
    missingConfig.push('SMTP_PASS');
  }
  if (!contactTo) {
    missingConfig.push('CONTACT_TO_EMAIL');
  }
  if (!contactFrom) {
    missingConfig.push('CONTACT_FROM_EMAIL');
  }

  if (missingConfig.length > 0) {
    const detail =
      process.env.NODE_ENV === 'development' ? ` Missing: ${missingConfig.join(', ')}.` : '';

    return res.status(500).json({error: `Email service is not configured correctly.${detail}`, ok: false});
  }

  try {
    const transporter = nodemailer.createTransport({
      auth: {
        pass: smtpPass,
        user: smtpUser,
      },
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
    });

    await transporter.sendMail({
      from: contactFrom,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, '', message].join('\n'),
      to: contactTo,
    });

    return res.status(200).json({ok: true});
  } catch {
    return res.status(500).json({error: 'Failed to send message. Please try again later.', ok: false});
  }
}