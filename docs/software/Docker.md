# Docker

Docker is a platform for developing, shipping, and running applications in containers. It enables developers to package an application with all of its dependencies into a standardized unit for software development. Docker containers are lightweight and contain everything needed to run the application, including code, runtime, system tools, system libraries, and settings.

## Docker Installations

There are two main Docker installations:

1. Docker Desktop for Linux
2. Docker Engine

Docker Desktop is recommended for beginners as it provides a user-friendly interface and additional features. [Source](https://docs.docker.com/desktop/install/linux/)

## Installation

> [!CAUTION]
> Always check the [official Docker documentation](https://docs.docker.com/engine/install/ubuntu/) for the most up-to-date instructions. The following steps are for Ubuntu 22.04.

### Preparing for Installation

First, remove any old or unofficial versions of Docker:

```sh
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

### Ubuntu Installation

1. Set up Docker's `apt` repository:
   Follow the instructions in the [official guide](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository).

2. Install Docker Desktop:
   Follow the steps outlined [here](https://docs.docker.com/desktop/install/linux/ubuntu/#install-docker-desktop).

> [!NOTE]
> You may need to enable virtualization in your system's BIOS settings for Docker Desktop to work properly.

### Setting up `pass` for Credential Storage

Docker uses `pass` to store credentials securely. Initialize it with:

```sh
gpg --generate-key
pass init "Your GPG ID or email"
```

## Installing RStudio Server via Docker

To run RStudio Server in a Docker container:

1. Pull the RStudio Server image:

   ```sh
   docker pull rocker/rstudio
   ```

2. Run the container:

   ```sh
   docker run -d -p 8787:8787 -e PASSWORD=yourpassword --name rstudio rocker/rstudio
   ```

   This command:

   - Runs the container in detached mode (`-d`)
   - Maps port 8787 on the host to port 8787 in the container (`-p 8787:8787`)
   - Sets a password for the RStudio user (`-e PASSWORD=yourpassword`)
   - Names the container "rstudio" (`--name rstudio`)

3. Access RStudio Server by navigating to `http://localhost:8787` in your web browser.

## Docker Engine Examples

### Building Multi-Architecture Images

To build images for different architectures:

1. Set up buildx:

   ```sh
   docker buildx create --use
   ```

2. Build and push an amd64 image:
   ```sh
   docker buildx build --platform linux/amd64 -t yourusername/imagename:tag . --push
   ```

This process allows you to create images that can run on different CPU architectures, improving portability across various systems.

## Best Practices

1. Use official base images when possible.
2. Minimize the number of layers in your Dockerfile.
3. Use multi-stage builds to reduce final image size.
4. Regularly update your Docker images to include security patches.
5. Use Docker Compose for managing multi-container applications.

For more advanced usage and best practices, refer to the [Docker documentation](https://docs.docker.com/).
