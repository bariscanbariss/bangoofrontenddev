<h1 align="center">
  Store Next.js Starter Template
</h1>

<p align="center">
Modern ecommerce storefront built with Next.js 15 for optimal performance and user experience.</p>

<p align="center">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  <img src="https://img.shields.io/badge/Built%20with-Next.js%2015-000000.svg" alt="Built with Next.js 15" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue.svg" alt="TypeScript Ready" />
</p>

### Prerequisites

To use this Next.js Starter Template, you should have your store backend API running locally.
For a quick setup, ensure your backend is accessible and properly configured.

# Overview

The Store Next.js Starter is built with:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- Modern Store Backend

Features include:

- Full ecommerce support:
  - Product Detail Page
  - Product Overview Page
  - Product Collections
  - Cart
  - Checkout with Stripe
  - User Accounts
  - Order Details
- Full Next.js 15 support:
  - App Router
  - Next fetching/caching
  - Server Components
  - Server Actions
  - Streaming
  - Static Pre-Rendering

# Quickstart

### Setting up the environment variables

Navigate into your projects directory and get your environment variables ready:

```shell
cd store-storefront/
mv .env.template .env.local
```

### Install dependencies

Use Yarn to install all dependencies.

```shell
yarn
```

### Start developing

You are now ready to start up your project.

```shell
yarn dev
```

### Open the code and start customizing

Your site is now running at http://localhost:8000!

# Payment integrations

By default this starter supports the following payment integrations

- [Stripe](https://stripe.com/)

To enable the integrations you need to add the following to your `.env.local` file:

```shell
NEXT_PUBLIC_STRIPE_KEY=<your-stripe-public-key>
```

You'll also need to setup the integrations in your store backend server. Configure your payment provider accordingly.

# Resources

## Learn more about the Store Platform

- Custom ecommerce solution
- Modern architecture
- API-first approach

## Learn more about Next.js

- [Website](https://nextjs.org/)
- [GitHub](https://github.com/vercel/next.js)
- [Documentation](https://nextjs.org/docs)
