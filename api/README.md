# tasky-api - types shared between tasky-server, and  tasky-ui

tasky-api is a shared dependency of tasky-server, and tasky-ui, configured in both projects as a git submodule in the subdirectory `api`. In the parent project, the right version of tasky-api is committed as a specific commit sha of tasky-api.

If you need to make updates to tasky-api, this should be done from tasky-server, and the following workflow is suggested.

## Workflow

In your feature branch of tasky-server, make sure that tasky-api is up-to-date for the branch by using

```
git submodule update [--init]
```