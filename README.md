# React Native & Expo CI/CD Action

GitHub Action to generate custom CI/CD workflows for React Native and Expo applications.

## Features

- 💰 **Free Alternative to EAS Build Plans**: Skip the $15-100/month EAS build plans
- 🔄 **Complete CI/CD Pipeline**: Automated testing, building, and deployment
- 📱 **Multiple Build Formats**: Development builds, production APKs, and AABs
- 🌐 **Multiple Storage Options**: GitHub Releases, Google Drive, Zoho Drive, or custom
- 🍎 **iOS Support**: Build for iOS devices on macOS runners
- 🚀 **App Store Publishing**: Publish directly to Google Play and App Store
- 🔔 **Build Notifications**: Get notified via Slack, Discord, or email

## Usage

```yaml
name: Generate React Native CI/CD Workflow

on:
  push:
    branches:
      - main
    paths:
      - 'app/**'
      - 'package.json'

jobs:
  setup-workflow:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Generate React Native CI/CD Workflow
        uses: yourusername/react-native-expo-cicd-action@v1
        with:
          storage-type: 'github-release'
          build-types: 'dev,prod-apk'
          tests: 'typescript,eslint'
          triggers: 'push-main,manual'
          ios-support: 'false'
          notifications: 'true'
Inputs
InputDescriptionDefaultstorage-typeStorage type for build artifactsgithub-releasebuild-typesBuild types to generatedev,prod-apktestsTests to runtypescripttriggersWorkflow triggerspush-main,manualios-supportEnable iOS build supportfalsepublish-to-expoEnable publishing to Expofalsepublish-to-storesEnable publishing to app storesfalsejest-testsEnable Jest testsfalserntl-testsEnable React Native Testing Library testsfalserender-hook-testsEnable renderHook testsfalsecachingEnable build cachingtruenotificationsEnable build notificationsfalseoutput-filePath where to output the generated workflow file.github/workflows/react-native-cicd.yml
Storage Options
GitHub Release
This is the default storage option. It creates a GitHub Release for each build, attaching the build artifacts.
Zoho Drive
To use Zoho Drive, you need to set up the following secrets:

RCLONE_CONFIG_ZOHODRIVE_TYPE: Set to zoho
RCLONE_CONFIG_ZOHODRIVE_TOKEN: OAuth token for Zoho Drive
RCLONE_CONFIG_ZOHODRIVE_DRIVE_ID: ID of the Zoho Drive folder

Google Drive
To use Google Drive, you need to set up the following secrets:

RCLONE_CONFIG_GDRIVE_TYPE: Set to drive
RCLONE_CONFIG_GDRIVE_TOKEN: OAuth token for Google Drive
RCLONE_CONFIG_GDRIVE_ROOT_FOLDER_ID: ID of the Google Drive folder

Custom Storage
You can configure a custom storage provider by setting up the following secrets:

CLOUD_STORAGE_TYPE: Type of storage (e.g., s3, b2, etc.)
CLOUD_STORAGE_TOKEN: Authentication token or credentials
CLOUD_STORAGE_ROOT_ID: Root folder ID or path
```
