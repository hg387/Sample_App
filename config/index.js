const prod = process.env.NEXT_CHECK_ENV === "production"

//export const server = prod ? 'https://sample-app-pvphvjlix-hg387.vercel.app' : 'http://localhost:3000'

export const server = process.env.NEXT_PUBLIC_VERCEL_URL