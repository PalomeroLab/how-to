# R, RStudio, and RStudio Server

R is a programming language and software environment for statistical computing and graphics.

RStudio is an integrated development environment (IDE) for R.
It includes a console, syntax-highlighting editor that supports direct code
execution, as well as tools for plotting, history, debugging and workspace management.

RStudio Server enables you to provide a browser based interface to a version
of R running on a remote Linux server, AWS, or Docker container. Here, we'll
be installing and connecting to RStudio Server on an AWS EC2 instance.

## Installation

Refer to the [RStudio Server installation](https://posit.co/download/rstudio-server/) page or
run the installation script below (with root privileges).

```sh
sudo bash <(curl -L https://raw.githubusercontent.com/rdnajac/cbmf/main/scripts/install_RStudioServer)
```

> [!NOTE]
> The `<(curl -L "$URL")` syntax is a bash process substitution that creates a
> temporary file descriptor that can be used as an input for commands.
>
> `raw.githubusercontent.com` is a service that serves raw files directly from GitHub,
> so we get just the plain text file of the installation commands.

### Installing on VM from local machine

You can send ssh commands to the EC2 instance from your local terminal:

```sh
ssh -i /path/to/private-key.pem ubuntu@ip-address 'bash -s' < /path/to/install_RStudioServer
```

## Connection

To connect to a running RStudio Server, you'll need to know the public IP address of your
EC2 instance. You can find this in the AWS console under the `Description` tab of the
instance (or under `Connect` if you're using the new console).

> [!NOTE]
> Make sure the security group for your EC2 instance allows inbound traffic on port 8787.
> For more details, click [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html).

## RStudio Server login

RStudio Server login is the same login as the underlying Linux system.
The default username `ubuntu` is pre-configured with an empty password, so
we can't use that to login to RStudio Server unless we set a password for it
with `sudo passwd ubuntu`.

Once you have a password set, you can login to RStudio Server by navigating to
`http://ip-address:8787` in your browser and entering the username and password.

> [!TIP]
> The console in RStudio Server is a valid alternative to the terminal
> and is pre-configured with root privileges\*, so you can run the `passwd` command,
> or any other commands that require root access like `adduser`.

## Package installation

To install old packages, first ensure you have the necessary system dependencies.

```sh
sudo apt update && sudo apt install build-essential
```

Then install the package using `remotes`:

```r
install.packages("remotes")
require(remotes)
install_version("Seurat", version = "4.4.1")
```

## renv

renv is a package management tool for R that creates project-specific library paths, ensuring reproducibility across different environments.

### Installation

Install renv from CRAN:

```r
install.packages("renv")
```

### Usage

1. Initialize renv in your project:

   ```r
   renv::init()
   ```

   This creates a project-specific library and a lockfile (`renv.lock`).

2. Install packages as usual. renv will track them in the project library:

   ```r
   install.packages("dplyr")
   ```

3. Snapshot your project's state:

   ```r
   renv::snapshot()
   ```

   This updates the lockfile with current package versions.

4. To restore your project's state on another machine:

   ```r
   renv::restore()
   ```

### Best Practices

- Commit `renv.lock` to version control.
- Use `renv::status()` to check for any unsaved changes in your project's package list.
- Regularly update your snapshot with `renv::snapshot()`.

### renv in RStudio

- RStudio detects renv usage and provides visual cues in the "Packages" pane.
- Use the "renv" menu in RStudio for quick access to common renv functions.

### sessionInfo() in RStudio

- Run sessionInfo() in the console or include it in your R scripts/RMarkdown documents.
- Copy the output easily using RStudio's console features.

### Troubleshooting

1. If renv::restore() fails:

   - Check for package conflicts.
   - Ensure you have necessary system libraries installed.

2. If sessionInfo() shows unexpected packages:
   - Check your .Rprofile for auto-loaded packages.
   - Verify you're using the correct project environment.
