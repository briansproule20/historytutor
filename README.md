# HistoryTutor

Explore historical context, varying perspectives, and how the world around us was shaped.

This is a [Next.js](https://nextjs.org) project with Echo SDK integration for AI-powered historical education.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Echo SDK Integration

This project uses the Echo SDK for authentication and AI functionality:

- **Authentication**: Users can sign in using the Echo authentication system
- **AI Integration**: Ready for AI-powered historical education features
- **App ID**: `d1852822-2ac3-4ed6-b9c1-ab28c075bcae`

## Project Structure

- `src/echo.ts` - Echo SDK configuration
- `src/app/api/echo/[...echo]/route.ts` - API handlers for Echo
- `src/components/SignInButton.tsx` - Authentication component
- `src/app/page.tsx` - Main application page

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
