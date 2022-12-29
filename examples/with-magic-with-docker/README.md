# Example app using Next JS

This example shows how to create pages using Next.js and Aura Design System. It shows a normal page with all the configurations.

## Deploy your own

Create workflow yml

```bash
mkdir .github && mkdir .github/workflows && touch .github/workflows/cloud-run.yml
```

Add deploy configurations

```yaml
name: next-with-docker

on:
  push:
    branches:
      - main

env:
  CLOUD_RUN_PROJECT_ID: ${{ secrets.CLOUD_RUN_PROJECT_NAME }}
  CLOUD_RUN_REGION: us-central1
  # project-name but it can be anything you want
  REPO_NAME: next-with-docker

jobs:
  build-and-deploy:
    name: Setup, Build, and Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      # This step is where our service account will be authenticated
      - uses: google-github-actions/setup-gcloud@v0.2.0
        with:
          project_id: ${{ secrets.CLOUD_RUN_PROJECT_NAME }}
          service_account_key: ${{ secrets.CLOUD_RUN_SERVICE_ACCOUNT }}
          service_account_email: ${{ secrets.CLOUD_RUN_SERVICE_ACCOUNT_EMAIL }}

      - name: Enable the necessary APIs and enable docker auth
        run: |-
          gcloud services enable containerregistry.googleapis.com
          gcloud services enable run.googleapis.com
          gcloud --quiet auth configure-docker
      - name: Build and tag image
        run: |-
          docker build . --tag "gcr.io/$CLOUD_RUN_PROJECT_ID/$REPO_NAME:$GITHUB_SHA"
      - name: Push image to GCR
        run: |-
          docker push gcr.io/$CLOUD_RUN_PROJECT_ID/$REPO_NAME:$GITHUB_SHA
      - name: Deploy
        run: |-
          gcloud run deploy $REPO_NAME --image gcr.io/$CLOUD_RUN_PROJECT_ID/$REPO_NAME:$GITHUB_SHA \
            --project $CLOUD_RUN_PROJECT_ID \
            --platform managed \
            --region $CLOUD_RUN_REGION \
            --allow-unauthenticated \
            --quiet
```

how to install [CLI gcloud](https://cloud.google.com/sdk/docs/install?hl=es-419)

Create service:

```bash
gcloud iam service-accounts create SA_NAME \
    --description="DESCRIPTION" \
    --display-name="DISPLAY_NAME"
```

Add roles service:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SA_NAME@PROJECT_ID.iam.gserviceaccount.com" --role="roles/editor"
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SA_NAME@PROJECT_ID.iam.gserviceaccount.com" --role="roles/run.admin"
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SA_NAME@PROJECT_ID.iam.gserviceaccount.com" --role="roles/storage.admin"
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SA_NAME@PROJECT_ID.iam.gserviceaccount.com" --role="roles/iam.serviceAccountUser"
```

Create and download service account key:

```bash
gcloud iam service-accounts keys create ~/Downloads/sa-private-key.json \
    --iam-account="SA_NAME@PROJECT_ID.iam.gserviceaccount.com"
```

Base64 key:

```bash
base64 ~/Downloads/sa-private-key.json
```

how to install [CLI Github](https://cli.github.com)

Add the github action secrets of the repository

    1. CLOUD_RUN_PROJECT_NAME
    2. CLOUD_RUN_SERVICE_ACCOUNT
    3. CLOUD_RUN_SERVICE_ACCOUNT_EMAIL

```bash
gh secret set CLOUD_RUN_PROJECT_NAME -b "PROJECT_ID" -r "REPOSITORY"
```

```bash
gh secret set CLOUD_RUN_PROJECT_NAME -b "BASE64_SA_NAME_KEY" -r "REPOSITORY"
```

```bash
gh secret set CLOUD_RUN_PROJECT_NAME -b "SA_NAME@PROJECT_ID.iam.gserviceaccount.com" -r "REPOSITORY"
```

## How to use

Execute create-next-app with [npm](https://docs.npmjs.com/cli/init), to bootstrap the example:

```bash
npx create-next-app next-base --use-npm --example "https://github.com/garitma/aura-design-system/tree/main/examples/next-base"
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
