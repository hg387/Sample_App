const prod = process.env.NODE_ENV === "production"

export const server = prod ? 'https://sample-app-tau.vercel.app' : 'http://localhost:3000'