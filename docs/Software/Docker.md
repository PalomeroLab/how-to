# Docker

Docker is a platform for developing, shipping, and running applications in
containers. It enables developers to package an application with all of its
dependencies into a standardized unit for software development. Docker
containers are lightweight and contain everything needed to run the application,
including code, runtime, system tools, system libraries, and settings.

There are two installations:

- Docker Desktop on Linux
- Docker Engine

Docker Desktop is the easiest way to get started with Docker on Linux.
[Source](https://docs.docker.com/desktop/install/linux/). 

## Installation

> [!CAUTION]
> Always check the [official Docker documentation](https://docs.docker.com/engine/install/ubuntu/) for the most
> up-to-date instructions. The following steps are for Ubuntu 22.04
<!-- > and the most recent version of macOS. -->

First, remove any old or unofficial versions of Docker.

```sh
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

### Ubuntu installation

First, [set up Docker's `apt` repository](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository).

[Then...](https://docs.docker.com/desktop/install/linux/ubuntu/#install-docker-desktop)

> [!NOTE]
> I had to enter the BIOS and enable virtualization to get Docker Desktop to work on my machine.


## Docker Engine Examples

### Build on local machine (amd64)

```sh
docker buildx create --use
docker buildx build --platform linux/amd64 -t rdn2108/cbmf:v1.0 .
```

### Push to Docker Hub

```sh
docker buildx build --platform linux/amd64 -t rdn2108/cbmf:v1.0 . --push
```
