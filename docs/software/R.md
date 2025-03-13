# R, RStudio, and RStudio Server

## Overview

R is a programming language and environment for statistical graphics.

RStudio is an integrated development environment (IDE) for R, providing a
console, syntax-highlighting editor, and tools for plotting, debugging, and
workspace management.

RStudio Server is a version of RStudio that runs on a remote server and is
accessed through a web browser, ideal for cloud-based or shared computing
environments.

## Installation

Use the docker image `rocker/rstudio` to run RStudio Server in a containerized
environment. You can pull the image from Docker Hub and run it with the
following command:

```sh
docker run -d -p 8787:8787 -e PASSWORD=yourpasswordhere rocker/rstudio
```

## Docker containers for Bioconductor

Alternatively, you can use Bioconductor's Docker images,

```sh
docker run \
 -e PASSWORD=bioc \
 -p 8787:8787 \
 bioconductor/bioconductor_docker:devel

```

Read the [docs](https://bioconductor.org/help/docker/) for more information.

### Bioconductor bioc-run script

For your convenience, you can use the `bioc-run` script to run Bioconductor
without having to remember the docker command. Download and install it with:

```sh
mkdir -p ~/.local/bin
curl https://raw.githubusercontent.com/Bioconductor/bioc-run/refs/heads/devel/bioc-run > ~/.local/bin/bioc-run
chmod +x ~/.local/bin/bioc-run
echo 'export PATH=$PATH:~/.local/bin' >> ~/.bashrc
exec "$SHELL"
```

> [!NOTE]
> Prerequisites: `bash` and `jq`
>
> If you use another shell like `zsh`, replace `~/.bashrc` with `~/.zshrc`, or
> another appropriate configuration file for your shell.

## Connecting to RStudio Server

Find your EC2 instance's public IP address in the AWS console. Ensure that
inbound traffic on port 8787 is allowed in the EC2 security group settings.
Access RStudio Server by navigating to `http://ec2-public-ip:8787` in your web
browser.

> [!NOTE]
> RStudio Server uses the underlying Linux system's user accounts.
> If not using a docker conntainer, the default `ubuntu` user doesn't have a
> password set, so create one frist with `sudo passwd ubuntu`.

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

Setting up renv:

```r
install.packages("renv")
renv::init()
```

Using renv:

```r
install.packages("dplyr")  # Install packages as usual
renv::snapshot()  # Snapshot your project's state
renv::restore()  # Restore your project's state on another machine
```

Best practices with renv:

- Commit `renv.lock` to version control.
- Use `renv::status()` to check for unsaved changes in your project's package list.
- Regularly update your snapshot with `renv::snapshot()`.

RStudio provides visual cues for renv usage in the "Packages" pane and access to common renv functions through the "renv" menu.

### Troubleshooting

If `renv::restore()` fails, check for package conflicts and ensure necessary
system libraries are installed. If `sessionInfo()` shows unexpected packages,
check your `.Rprofile` for auto-loaded packages and verify you're in the correct
project environment.

## Interesting Facts and Advanced Topics

1. R's origins: R was created by Ross Ihaka and Robert Gentleman at the University of Auckland, New Zealand, and is named after the first letter of its creators' names. [Source: R-project.org](https://www.r-project.org/about.html)

2. RStudio's impact: RStudio (now Posit) has significantly contributed to R's popularity. The RStudio IDE is used by an estimated 2.5 million people worldwide. [Source: Posit](https://posit.co/about/)

3. R in research: R is widely used in academic research. A study found that R was mentioned in over 400,000 scholarly articles between 2011-2020. [Source: IEEE Spectrum](https://spectrum.ieee.org/the-top-programming-languages-2020)

4. Parallel computing in R: You can leverage multi-core processors for faster computations using packages like `parallel` and `foreach`. [Source: CRAN Task View](https://cran.r-project.org/web/views/HighPerformanceComputing.html)

5. R Markdown: This powerful tool allows you to create dynamic documents that combine code, results, and narrative text. It's excellent for reproducible research. [Source: R Markdown book](https://bookdown.org/yihui/rmarkdown/)

6. Shiny: A web application framework for R that allows you to create interactive web apps directly from R. It's widely used for creating dashboards and data exploration tools. [Source: Shiny by Posit](https://shiny.posit.co/)

7. Configuring RStudio Server for multiple users: You can set up RStudio Server to support multiple users, each with their own workspace and permissions. [Source: RStudio Server Admin Guide](https://docs.posit.co/ide/server-pro/settings/server_management.html)

8. Setting up RStudio Server with SSL: For secure connections, especially important in cloud environments, you can configure RStudio Server to use SSL. [Source: RStudio Server Secure Socket Layer (SSL) Guide](https://docs.posit.co/ide/server-pro/access_and_security/ssl.html)

9. Integrating RStudio Server with version control: RStudio Server can be integrated with Git and SVN for version control, enhancing collaboration and code management. [Source: RStudio Support - Version Control](https://support.posit.co/hc/en-us/articles/200532077-Version-Control-with-Git-and-SVN)

10. R Consortium: The R Consortium, supported by the Linux Foundation, funds development of R-related projects and organizes conferences. It includes major tech companies as members. [Source: R Consortium](https://www.r-consortium.org/)

For more detailed information, refer to the [official RStudio documentation](https://docs.rstudio.com/) and [renv documentation](https://rstudio.github.io/renv/).
