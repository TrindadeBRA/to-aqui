export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        priceId: 'price_1QEdTsCf4P8riaebtk5Z6mgA',
        quota: {
          TASKS: 5,
        },
      },
      pro: {
        priceId: 'price_1QEdVQCf4P8riaebxSG5dK7s',
        quota: {
          TASKS: 100,
        },
      },
    },
  },
}
