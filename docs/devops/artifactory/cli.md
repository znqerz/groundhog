# Jfrog CLI

## Setup jfrog cli config

```bash
# Jfrog server id is "Artifactory" alias/name
$ jfrog config add <SERVER_ID>

JFrog platform URL: <administration -> general -> settings -> general settings |- Custom Base URL >
JFrog access token (Leave blank for username and password/API key): <leave blank>
JFrog username: <your artifactory id>
JFrog password or API key: <edit profile -> generate 'API Key'>
Is the Artifactory reverse proxy configured to accept a client certificate? (y/n) [n]? y
Client certificate file path: <leave blank>
Client certificate key path: <leave blank>
```


``` bash
# Test connection
$ jfrog rt ping
# or
$ jfrog rt ping --server-id=<SERVER_ID>

#  if successfull then return 'OK'
```

## File upload
```bash
$ jfrog rt u "(*).tgz" <YOUR_TARGET_REPOSITORY_NAME> --server-id=<SERVER_ID>
```

[Jfrog Administrator Docs](https://www.jfrog.com/confluence/display/JFROG/Administration)

[Jfrog Cli Docs](https://www.jfrog.com/confluence/display/CLI/CLI+for+JFrog+Artifactory)