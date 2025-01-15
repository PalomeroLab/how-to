# Linux and the Command Line

Linux is a family of open-source Unix-like operating systems based on the Linux kernel.
It's typically packaged in a distribution, which includes the Linux kernel along with
a set of software tools and utilities. There are many different distributions of
Linux, such as Ubuntu, Fedora, Red Hat, and CentOS.

Linux distrubitions all run a shell, which is a program that interprets and executes
programs. The "command line" refers to the interface between you and the shell.

## Concepts

- **Operating System**: The software that manages resources of a computer.
- **Architecture**: The type of CPU (e.g., x86, x86_64, ARM).
- **Distribution**: A version of the Linux operating system.
- **Terminal**: The window in which you type commands.
- **Shell**: The program that interprets and executes commands.

> [!IMPORTANT]
> When creating an instance on AWS, you're setting up a virtual machine that >
> runs an operating system of your choice. > For maximum compatibility with our
> software, use `Ubuntu 22.04 LTS` (on 64-bit x86).

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
> For maintainability and portability, it's recommended to write scripts in
> `bash` and be explicit about it. For an interesting discussion on this topic,
> check out this [post](https://unix.stackexchange.com/questions/697052/why-should-i-care-about-posix-if-im-writing-bash-scripts).

Read through the [bash guide](bash.md) for more information on the writing and
executing shell scripts.

## Windows Subsystem for Linux (WSL)

Windows users can run a Linux distribution on Windows using WSL. This allows you
to run Linux command-line tools and utilities directly on Windows without
needing a virtual machine or dual-boot setup. If you want to use WSL, follow the
[installation instructions](https://docs.microsoft.com/en-us/windows/wsl/install).

## Linux Command Line Interface (CLI)

To check your bash version:

```sh
bash --version
```

Example output:

```console
GNU bash, version 5.1.16(1)-release (x86_64-pc-linux-gnu)
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
```

To verify if bash is running:

```sh
echo $SHELL
```

### User Management

#### Set a password for the `ubuntu` user

```sh
sudo passwd ubuntu
```

#### Adding a user to `sudo`ers

```sh
sudo adduser username sudo
```

#### Configure no-password `sudo`

Open the sudoers file for editing:

```sh
sudo visudo
```

> [!NOTE] > `visudo` is a special command that edits the sudoers file safely.
> If the environment variable `$EDITOR` is not set, it will use `vi`.

Uncomment or add these lines:

```sudoers
# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL

# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL

# Add to run any command without a password
username ALL=(ALL) NOPASSWD: ALL
```

### SSH Operations

#### Installing OpenSSH server

```sh
sudo apt install openssh-server
```

#### Connecting to a remote server

```sh
ssh username@hostname
```

#### Copying files to/from a remote server

```sh
scp username@hostname:/path/to/remote/file /path/to/local/file
scp /path/to/local/file username@hostname:/path/to/remote/file
```

#### Setting up passwordless SSH

1. Generate a new SSH key pair:

```sh
ssh-keygen -t rsa -b 4096 -C "a comment"
```

2. Copy the public key to the remote server:

```sh
ssh-copy-id -i <identity_file >username@hostname
```

3. Modify the `~/.ssh/config` file:

```sh
Host hostname
User username
HostName hostname
IdentityFile ~/.ssh/identity_file
```

Now you can log in without a password:

```sh
ssh username@hostname
```

## Quick Reference of common Linux commands

| Command  | Description                                                 |
| -------- | ----------------------------------------------------------- |
| `pwd`    | **p**rint **w**orking **d**irectory                         |
| `ls`     | **l**i**s**t files and directories in the current directory |
| `cd`     | **c**hange **d**irectory                                    |
| `cp`     | **c**o**p**y files or directories                           |
| `mv`     | **m**o**v**e or rename files or directories                 |
| `touch`  | create an empty file                                        |
| `mkdir`  | **m**a**k**e a new **dir**ectory                            |
| `rm`     | **r**e**m**ove files or directories                         |
| `wc`     | **w**ord **c**ount                                          |
| `less`   | view the contents of a file                                 |
| `head`   | view the first few lines of a file                          |
| `tail`   | view the last few lines of a file                           |
| `gzip`   | compress a file                                             |
| `gunzip` | decompress a file                                           |
| `curl`   | download the contents of a website                          |
| `echo`   | print text to the terminal                                  |
| `cat`    | concatenate and print files                                 |
| `man`    | view the **man**ual for a command                           |
