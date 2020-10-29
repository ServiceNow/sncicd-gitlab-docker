# ServiceNow CI/CD Docker Image for Gitlab CI/CD

## Contents

- [Intro](#intro)
- [Docker](#Docker)
- [Usage](#usage)
- [API Docs](#api-docs)
- [List of tasks](#tasks)

---

## Intro

This Docker image provides build steps for configuring CI/CD pipelines with Now Platform application development. **Click on the below screenshot to see a video for how you can use this extension to get started faster.**

[![Get Started with GitLab in 10 Minutes](https://gitlab.com/ServiceNow-DevX/sncicd-gitlab-pipeline/-/raw/master/README_images/youtube_link_GitLab.png)](https://www.youtube.com/watch?v=B_LSwYKE11s "Get Started with GitLab in 10 Minutes")

The build steps are API wrappers for the  [CI/CD APIs](https://developer.servicenow.com/dev.do#!/reference/api/paris/rest/cicd-api) first released with Orlando. They will currently work with the Orlando and Paris releases. 

This is intended to be used with a pipeline .yml file, such as the example provided at our [GitLab repo](https://gitlab.com/ServiceNow-DevX/sncicd-gitlab-pipeline/-/blob/master/.gitlab-ci.yml).

## Docker

Before pushing the image onto Docker Hub, please make sure to link to your Docker account: `docker login` 

```shell script
docker build . -t "servicenowdevx/sncicd-gitlab-docker"
docker push servicenowdevx/sncicd-gitlab-docker:latest
```

## Usage

1. [Link to Source Control](https://developer.servicenow.com/dev.do#!/learn/learning-plans/paris/new_to_servicenow/app_store_learnv2_devenvironment_paris_linking_an_application_to_source_control) for an application that has been created on your instance. 
2. Add a new file named **.gitlab-ci.yml** in the root directory of the Git repo. This will be your pipeline in GitLab. 
3. Copy and paste the contents of a pipeline template. We provide an example in this repo with the [.gitlab-ci.yml](.gitlab-ci.yml) file. 
4. Configure your CICD variables by defining keys such as **SN_AUTH_DEV** and values in the format **username:password**.

![CICD variables](https://gitlab.com/ServiceNow-DevX/sncicd-gitlab-pipeline/-/raw/master/README_images/cicdvariables.png)

5. Depending on how you have your triggers for the pipeline setup, you can now run a build on every commit, PR, etc. 

**Other Notes**

Build steps are not independently named, and can be run as `task.sh` throughout your pipeline. To choose which build step to run, specify the `task` variable as a part of the variables section. Please note that the `task` variable must be in lowercase, while all other variables must be in UPPER_CASE. 

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

## Support Model

ServiceNow built this integration with the intent to help customers get started faster in adopting CI/CD APIs for DevOps workflows, but __will not be providing formal support__. This integration is therefore considered "use at your own risk", and will rely on the open-source community to help drive fixes and feature enhancements via Issues. Occasionally, ServiceNow may choose to contribute to the open-source project to help address the highest priority Issues, and will do our best to keep the integrations updated with the latest API changes shipped with family releases. This is a good opportunity for our customers and community developers to step up and help drive iteration and improvement on these open-source integrations for everyone's benefit. 

## Governance Model

Initially, ServiceNow product management and engineering representatives will own governance of these integrations to ensure consistency with roadmap direction. In the longer term, we hope that contributors from customers and our community developers will help to guide prioritization and maintenance of these integrations. At that point, this governance model can be updated to reflect a broader pool of contributors and maintainers. 
