# With Prismic

This example shows how to create pages using Next.js, Aura Design System, Prismic io and docker. It shows a normal page with all the configurations. Additionally, it contains instructions for deploying to Google Cloud Run and github actions.

# Configuration

## Step 1. Create an account and repository on Prismic

First, create a Prismic account and repository with the following command:

```bash
npx @slicemachine/init
```

This command will:

1. Ask you to log in to Prismic or create an account.
2. Create a new Prismic repository with premade Author and Post content models.
3. Connect the Prismic repository to your app.

**Optional**: To see the premade content models, start the [Slice Machine](https://prismic.io/docs/technologies/slice-machine) app.

```bash
npm run slicemachine
```

Slice Machine should be available on <http://localhost:9999> once started.

## How to use

Execute create-next-app with [npm](https://docs.npmjs.com/cli/init) to bootstrap the example:

```bash
npx create-next-app next-base --use-pnpm --example "https://github.com/garitma/aura-design-system/tree/canary/examples/cms-prismic-with-docker"
```
