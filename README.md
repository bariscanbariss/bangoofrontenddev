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

## Connect to the Bangoo Medusa backend

Set the values below so the storefront talks to the production backend running on the VPS. These values come directly from the Medusa dashboard and follow the configuration flow in the Medusa docs (https://docs.medusajs.com/v2/resources/storefront-development/connect-storefront).

| Variable | Value | Notes |
| --- | --- | --- |
| `MEDUSA_BACKEND_URL` | `https://admin.bangoocyp.com` | Public URL of the backend exposed by nginx. |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | `pk_4d527f0a965d71c3494a007f05dc1d4abc2f6c3376b8a7ff2144a12445232e00` | The “Webshop” publishable key from the admin (`Settings → Publishable API keys`). |
| `NEXT_PUBLIC_DEFAULT_REGION` | `tr` | Matches the only configured region (Turkey). Required for middleware redirects. |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:8000` (dev) / your Vercel domain (prod) | Used for metadata and sitemap URLs. |

You can confirm the backend connection with:

```bash
curl -H "x-publishable-api-key: $NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY" \
  "$MEDUSA_BACKEND_URL/store/products?limit=1"
```

If the command returns products, the storefront is ready to consume live data.

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

## Deploying to Vercel

1. Push this project to GitHub/GitLab and import it into Vercel.
2. In the Vercel Dashboard → Project Settings → Environment Variables, add the variables from the table above (plus `NEXT_PUBLIC_STRIPE_KEY` if Stripe is enabled). For `NEXT_PUBLIC_BASE_URL`, use your production storefront domain such as `https://bangoo.vercel.app`.
3. Redeploy. During build Vercel will run `next build`, which now validates `MEDUSA_BACKEND_URL` + `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` before compiling.
4. When using Preview deployments, keep the same Medusa variables but change `NEXT_PUBLIC_BASE_URL` to the preview URL if you need canonical URLs to match the preview.
5. After the first deploy run `vercel env pull .env.local` locally to stay in sync with production values.

Remember to whitelist your Vercel domain under `store_cors` in the Medusa backend config so API calls aren’t blocked.

# Resources

## Learn more about the Store Platform

- Custom ecommerce solution
- Modern architecture
- API-first approach

## Learn more about Next.js

- [Website](https://nextjs.org/)
- [GitHub](https://github.com/vercel/next.js)
- [Documentation](https://nextjs.org/docs)
