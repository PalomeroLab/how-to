# Docker

## Build on local machine (amd64)

```sh
docker buildx create --use
docker buildx build --platform linux/amd64 -t rdn2108/cbmf:v1.0 .
```

## Push to Docker Hub

```sh
docker buildx build --platform linux/amd64 -t rdn2108/cbmf:v1.0 . --push
```
