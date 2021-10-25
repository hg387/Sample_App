const prod = process.env.NEXT_ENV === "production"

export const server = prod ? 'https://sample-app-tau.vercel.app' : 'http://localhost:3000'