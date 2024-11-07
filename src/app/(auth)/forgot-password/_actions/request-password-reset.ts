'use server'

import { prisma } from '@/services/database'
import { randomBytes } from 'crypto'
import { addHours } from 'date-fns'
import nodemailer from 'nodemailer';

export async function requestPasswordReset(email: string) {

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Email não encontrado.');
  }

  const token = randomBytes(8).toString('hex')

  const expiresAt = addHours(new Date(), 1)

  await prisma.passwordReset.create({
    data: {
      email,
      token,
      expiresAt,
    },
  })

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT as string, 10),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Redefinição de Senha - Sua Conta',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: #f9f9f9;
              border-radius: 8px;
              padding: 30px;
              border: 1px solid #eee;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #2563eb;
              color: white !important;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
              margin: 20px 0;
            }
            .token {
              background: #e5e7eb;
              padding: 12px;
              border-radius: 4px;
              font-family: monospace;
              font-size: 16px;
              margin: 10px 0;
            }
            .footer {
              margin-top: 30px;
              font-size: 14px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Olá!</h2>
            
            <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>
            
            <p>Para continuar com a redefinição de senha, clique no botão abaixo:</p>
            
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/new-password?token=${token}&email=${email}" class="button">
              Redefinir Minha Senha
            </a>
            
            <p>Caso o botão não funcione, você também pode usar o seguinte token:</p>
            
            <div class="token">
              ${token}
            </div>
            
            <p>Acesse: <a href="${process.env.NEXT_PUBLIC_APP_URL}/new-password">${process.env.NEXT_PUBLIC_APP_URL}/new-password</a></p>
            
            <div class="footer">
              <p>Este link é válido por 1 hora. Após esse período, será necessário solicitar um novo link de redefinição.</p>
              <p>Se você não solicitou a redefinição de senha, por favor ignore este email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  })

  return { message: 'Email de redefinição de senha enviado com sucesso.' }
} 