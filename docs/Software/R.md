# R, RStudio, and RStudio Server

## Overview

- **R**: A programming language and environment for statistical computing and graphics.
- **RStudio**: An integrated development environment (IDE) for R, providing a console, syntax-highlighting editor, and tools for plotting, debugging, and workspace management.
- **RStudio Server**: A version of RStudio that runs on a remote server and is accessed through a web browser, ideal for cloud-based or shared computing environments.

## Installation

### RStudio Server on AWS EC2

To install RStudio Server on an AWS EC2 instance, you can use the following script:

```sh
sudo bash <(curl -L https://raw.githubusercontent.com/rdnajac/cbmf/main/scripts/install_RStudioServer)
```

> [!NOTE]
> The `<(curl -L "$URL")` syntax is a bash process substitution that creates a temporary file descriptor for the downloaded content.

#### Remote Installation

To install RStudio Server on a remote EC2 instance from your local machine:

```sh
ssh -i /path/to/private-key.pem ubuntu@ec2-public-ip 'bash -s' < /path/to/install_RStudioServer
```

## Connecting to RStudio Server

1. Find your EC2 instance's public IP address in the AWS console.
2. Ensure that inbound traffic on port 8787 is allowed in the EC2 security group settings.
3. Access RStudio Server by navigating to `http://ec2-public-ip:8787` in your web browser.

## RStudio Server Login

RStudio Server uses the underlying Linux system's user accounts. The default `ubuntu` user doesn't have a password set, so you'll need to create one:

```sh
sudo passwd ubuntu
```

> [!TIP]
> The RStudio Server console has elevated privileges, allowing you to run commands like `passwd` or `adduser` directly.

## Package Management

### Installing Packages

For system-wide package installation, ensure you have the necessary build tools:

```sh
sudo apt update && sudo apt install build-essential
```

To install specific versions of R packages:

```r
install.packages("remotes")
remotes::install_version("Seurat", version = "4.4.1")
```

### renv: R Environment Management

renv is a package management tool for R that creates project-specific libraries, ensuring reproducibility across different environments.

#### Setting up renv

1. Install renv:

   ```r
   install.packages("renv")
   ```

2. Initialize renv in your project:
   ```r
   renv::init()
   ```

#### Using renv

1. Install packages as usual. renv will track them in the project library:

   ```r
   install.packages("dplyr")
   ```

2. Snapshot your project's state:

   ```r
   renv::snapshot()
   ```

3. Restore your project's state on another machine:
   ```r
   renv::restore()
   ```

#### Best Practices with renv

- Commit `renv.lock` to version control.
- Use `renv::status()` to check for unsaved changes in your project's package list.
- Regularly update your snapshot with `renv::snapshot()`.

### RStudio Integration

- RStudio provides visual cues for renv usage in the "Packages" pane.
- Access common renv functions through the "renv" menu in RStudio.

### Troubleshooting

1. If `renv::restore()` fails:

   - Check for package conflicts.
   - Ensure necessary system libraries are installed.

2. If `sessionInfo()` shows unexpected packages:
   - Check your `.Rprofile` for auto-loaded packages.
   - Verify you're in the correct project environment.

## Advanced Topics

- Configuring RStudio Server for multiple users
- Setting up RStudio Server with SSL for secure connections
- Integrating RStudio Server with version control systems (e.g., Git)

For more information, refer to the [official RStudio documentation](https://docs.rstudio.com/) and [renv documentation](https://rstudio.github.io/renv/).
