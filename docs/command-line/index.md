# Linux

Linux is a family of open-source Unix-like operating systems based on the Linux kernel.
It's typically packaged in a distribution, which includes the Linux kernel along with
a set of software tools and utilities. There are many different distributions of
Linux, such as Ubuntu, Fedora, Red Hat, and CentOS.

In this guide, the "command line" refers to the interface between you and the
shell. Checkout the [quick reference](quick-reference.md) for common commands.

## Concepts

- **Operating System**: The software that manages resources of a computer.
- **Architecture**: The type of CPU (e.g., x86, x86_64, ARM).
- **Distribution**: A version of the Linux operating system.
- **Terminal**: The window in which you type commands.
- **Shell**: The program that interprets and executes commands.

> [!IMPORTANT]
> When creating an instance on AWS, you're setting up a virtual machine that runs an operating system of your choice.
> For maximum compatibility with our software, use `Ubuntu 22.04 LTS` (on 64-bit x86).

## Terminal

The "terminal" is the interface between you and the shell.
It's also referred to as the "command line" or the "console".
Various programs can serve as a terminal, such as:

- `iTerm` on macOS
- `cmd` on Windows
- EC2 Serial Console
- The "Terminal" tab in RStudio

## Shell

The "shell" is the program that interprets and executes commands. Examples
include:

- `bash` (most common on Linux systems)
- `zsh` (the default on macOS)

> [!TIP]
> For maintainability and portability, it's recommended to write scripts in `bash` and be explicit about it.
> For an interesting discussion on this topic, check out this
> [Stack Overflow post](https://unix.stackexchange.com/questions/697052/why-should-i-care-about-posix-if-im-writing-bash-scripts).

Read through the [bash guide](bash.md) for more information on the writing and
executing shell scripts.

## Windows Subsystem for Linux (WSL)

Windows users can run a Linux distribution on Windows using WSL. This allows you
to run Linux command-line tools and utilities directly on Windows without
needing a virtual machine or dual-boot setup. If you want to use WSL, follow the
[installation instructions](https://docs.microsoft.com/en-us/windows/wsl/install).
