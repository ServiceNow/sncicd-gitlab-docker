# ServiceNow CI/CD plugin for Gitlab CI pipelines

## Contents

- [Intro](#intro)
- [Docker](#Docker)
- [Usage](#usage)
- [API Docs](#api-docs)
- [List of tasks](#tasks)

---

## Intro

Here you can find the sourcecode of ServiceNow's extension for the Gitlab CI pipelines.
This extension covers only CI/CD subset of ServiceNow REST API and it aims to help people integrate both Continues Integration and Continues Delivery into Gitlab pipelines infrastructure.

## Docker

Before pushing the image onto Docker hub make sure you have done the login command to link it with your Docker hub account: `docker login` 

```shell script
export DOCKER_IMAGE_NAME=[your docker image name here]
docker build -t  $DOCKER_IMAGE_NAME.
docker push $DOCKER_IMAGE_NAME:latest
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

