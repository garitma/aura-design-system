# With Docker

This example shows how to create pages using Next.js, Aura Design System and docker. It shows a normal page with all the configurations. Additionally, it contains instructions for deploying to Google Cloud Run and github actions.

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
          gcloud components install beta --quiet
          gcloud beta run deploy $REPO_NAME --image gcr.io/$CLOUD_RUN_PROJECT_ID/$REPO_NAME:$GITHUB_SHA \
            --project $CLOUD_RUN_PROJECT_ID \
            --platform managed \
            --region $CLOUD_RUN_REGION \
            --allow-unauthenticated \
            --quiet
```

In the github action secrets of the repository `PATH_TO_REPOSITORY/settings/secrets/actions` add the secrets of GCP. 

    1. CLOUD_RUN_PROJECT_NAME 
    2. CLOUD_RUN_SERVICE_ACCOUNT 
    3. CLOUD_RUN_SERVICE_ACCOUNT_EMAIL

Read more about service account [Creating and managing service accounts](https://cloud.google.com/iam/docs/creating-managing-service-accounts?hl=es-419)

## How to use

Execute create-next-app with [npm](https://docs.npmjs.com/cli/init), to bootstrap the example:

```bash
npx create-next-app next-base --use-npm --example "https://github.com/garitma/aura-design-system/tree/main/examples/with-docker"
```
