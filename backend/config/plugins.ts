export default ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.hostinger.com'),
        port: env.int('SMTP_PORT', 465),
        secure: env.bool('SMTP_SECURE', true),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        logger: true,
        debug: true,
      },
      settings: {
        defaultFrom: env('SMTP_DEFAULT_FROM', 'administracion@sarescol.com'),
        defaultReplyTo: env('SMTP_DEFAULT_REPLY_TO', 'administracion@sarescol.com'),
        testAddress: env('SMTP_TEST_ADDRESS', 'administracion@sarescol.com'),
      },
    },
  },
});
