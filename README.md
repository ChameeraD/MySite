# Blazor WebAssembly DevOps Demo

This project demonstrates a complete CI/CD pipeline for Blazor WebAssembly applications using GitHub Actions and Azure Static Web Apps.

## Features

- **Automated Build & Test**: Every commit triggers build and unit tests
- **Azure Deployment**: Automatic deployment to Azure Static Web Apps
- **E2E Testing**: Playwright smoke tests validate the live site
- **Security Scanning**: CodeQL analysis for vulnerability detection
- **Monitoring**: Application Insights integration for runtime error detection
- **Dependency Management**: Dependabot for automatic dependency updates

## Prerequisites

Before setting up the pipeline, ensure you have:

- GitHub account and repository
- Azure subscription with permission to create Static Web Apps
- .NET 8 SDK installed locally
- Azure CLI installed (optional, for local testing)

## Setup Instructions

### 1. Azure Static Web App Setup

1. Create a new Static Web App in Azure Portal
2. Go to Settings → Secrets → Generate Token
3. Copy the deployment token

### 2. GitHub Secrets Configuration

Add the following secrets to your GitHub repository (Settings → Secrets → Actions):

- `AZURE_STATIC_WEB_APPS_API_TOKEN`: Your Azure Static Web Apps deployment token
- `AZURE_CLIENT_ID`: Azure service principal client ID (for OIDC)
- `AZURE_TENANT_ID`: Azure tenant ID (for OIDC)
- `APPINSIGHTS_CONNECTIONSTRING`: Application Insights connection string (optional)

### 3. Application Insights Setup

1. In Azure Portal, open your Static Web App
2. Go to Settings → Application Insights and turn it On
3. Copy the connection string
4. Update `staticwebapp.config.json` with your instrumentation key

### 4. Local Development

```bash
# Restore dependencies
dotnet restore

# Build the project
dotnet build

# Run tests
dotnet test

# Run locally
dotnet run
```

### 5. E2E Testing Locally

```bash
# Install Playwright dependencies
cd tests/e2e
npm install

# Run tests
npm test
```

## Pipeline Overview

The CI/CD pipeline consists of four jobs:

1. **Build Job**: Compiles, tests, and publishes the application
2. **Deploy Job**: Deploys to Azure Static Web Apps
3. **E2E Job**: Runs Playwright smoke tests and checks Application Insights
4. **Security Job**: Runs CodeQL analysis for security vulnerabilities

## Troubleshooting

### Common Issues

**"deployment_token was not provided"**
- Verify the secret name is exactly `AZURE_STATIC_WEB_APPS_API_TOKEN`

**"404 Static Web App not found"**
- Ensure the token is from the correct Static Web App resource

**"No projects found during dotnet build"**
- Check that the solution file includes all projects

**"Playwright can't connect"**
- Verify the `SITE_URL` environment variable is set correctly

### Performance Optimization

- NuGet cache is enabled for faster builds
- Artifacts are uploaded to avoid rebuilding in deploy job
- Playwright uses headless mode for faster execution

## Security Features

- CodeQL analysis for C# vulnerabilities
- Secret scanning (enable in GitHub repository settings)
- Dependabot for automatic dependency updates
- OIDC authentication with Azure (recommended over tokens)

## Monitoring

The pipeline includes:
- Unit test coverage collection
- E2E test validation
- Application Insights error detection
- Automated rollback on failure detection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push to your branch
5. Create a Pull Request

The pipeline will automatically test and deploy your changes to a preview environment.

## License

This project is licensed under the MIT License. 