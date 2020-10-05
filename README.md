# Source Repo for ServiceNow CI/CD Docker Image for Gitlab CI pipelines

## Contents

- [Intro](#intro)
- [Docker](#Docker)
- [Usage](#usage)
- [API Docs](#api-docs)
- [List of tasks](#tasks)

---

## Intro

This Docker image provides build steps for configuring CI/CD pipelines with Now Platform application development. 

The build steps are API wrappers for the  [CI/CD APIs](https://developer.servicenow.com/dev.do#!/reference/api/paris/rest/cicd-api) first released with Orlando. They will currently work with the Orlando and Paris releases. 

This is intended to be used with a pipeline .yml file, such as the example provided at our [GitLab repo](https://gitlab.com/ServiceNow-DevX/sncicd-gitlab-pipeline/-/blob/master/.gitlab-ci.yml).

## Docker

Before pushing the image onto Docker Hub, please make sure to link to your Docker account: `docker login` 

```shell script
docker build . -t "servicenowdevx/sncicd-gitlab-docker"
docker push servicenowdevx/sncicd-gitlab-docker:latest
```

## Usage

This project contains [.gitlab-ci.yml](.gitlab-ci.yml) file - it is just a example of pipeline made out of this image. Every task should be ran as `task.sh`. Parameters should be passed as a environment variables. Task itself must be passed in `task` variable, this one is only variable name in lowercase, all other must be UPPER_CASE.

## API docs

All the API calls are made corresponding with ServiceNow [REST API documentation](https://developer.servicenow.com/dev.do#!/reference/api/orlando/rest/cicd-api). Extension covers all the endpoints mentioned there. Some of endpoints have no separate task in extension's because of helper nature of these endpoint i.e. progress API.

## Tasks

### Required parameters

Every task must have defined env variables `SNOWAUTH` and `SNOWINSTANCE` - auth in form of login:password and ServiceNow instance domain.

In order to keep sensitive data like password safe, use protected variables (see `K8_SECRET_*` for GitLab) and pass them in pipeline without copy and paste passwords itself.

- Apply SourceControl Changes
> Apply changes from a remote source control to a specified local application
> Parameters:
> - task=SCAppy
> - APP_SCOPE
> - APP_SYS_ID
> - BRANCH

- Publish Application
> Installs the specified application from the application repository onto the local instance
> Parameters:
> - task=AppPublish
> - SCOPE
> - SYS_ID
> - DEV_NOTES
> - VERSIONFORMAT=(exact|autodetect)
> - VERSION

- Install Application
> Installs the specified application from the application repository onto the local instance
> Parameters:
> - task=AppInstall
> - SCOPE 
> - SYS_ID
> - VERSION

- Rollback App
> Initiate a rollback of a specified application to a specified version.
> Parameters:
> - task=AppRollback
> - SCOPE 
> - SYS_ID
> - VERSION

- Add a plugin
> Activate a desired plugin on ServiceNow instance
> Parameters:
> - task=PluginActivate
> - PLUGINID

- Rollback a plugin
> Rollback a desired plugin on ServiceNow instance
> Parameters:
> - task=PluginRolback
> - PLUGINID

- Start Test Suite
> Start a specified automated test suite. 
> Parameters:
> - task=TestRun
> - BROWSER_NAME
> - BROWSER_VERSION
> - OS_NAME
> - OS_VERSION
> - TEST_SUITE_SYS_ID
> - TEST_SUITE_NAME

