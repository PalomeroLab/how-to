# Linux Command Line

Key terms:

- operating system: the software that manages resources of a computer
- architecture: the type of CPU (e.g. x86, x86_64, ARM)
- distribution: a version of the Linux operating system
- terminal: the window in which you type commands
- shell: the program that interprets and executes commands

## Overview

Linux is a family of open-source Unix-like operating systems based on the Linux
kernel. Linux is typically packaged in a distribution. A distribution is a
version of the Linux operating system that includes the Linux kernel as well as
a set of software tools and utilities. There are many different distributions of
Linux, such as Ubuntu, Fedora, Red Hat, and CentOS.

> [!IMPORTANT]
> When you create an instance on AWS, you are creating a virtual machine that
> runs an operating system that you must choose. Use `Ubuntu 22.04 LTS`
> (on 64-bit x86) for the most compatibility with the software we use.

### Terminal

The "terminal" is the window in which you type commands. It is the interface
between you and the shell. The terminal is also referred to as the "command
line" or the "console". There are different programs that can be used as a
terminal, such as the `iTerm` on macOS, `cmd` on Windows, EC2 Serial Console,
or even the "Terminal" tab in RStudio.

### Shell

The "shell" is the underlying program that interprets and executes commands.
There are many different shells, such as `bash`, `zsh`, `sh`, `csh`, `ksh`, etc.,
but `bash` is the most common shell on Linux systems and it comes pre-installed
on most Linux distributions (and is the default shell on Ubuntu).

> [!TIP]
> Just write your scripts in `bash` and be explicit about it. This is a good way
> to ensure maintainability and some degree of portability. This
> [SO post](https://unix.stackexchange.com/questions/697052/why-should-i-care-about-posix-if-im-writing-bash-scripts)
> has some interesting discussion on the topic.

## Shell (`bash`) scripting

From the [Google Shell Style Guide](https://google.github.io/styleguide/shellguide.html):

> Restricting all executable shell scripts to `bash` gives us a consistent shell
> language that’s installed on all our machines. In particular, this means there
> is generally no need to strive for POSIX-compatibility or otherwise avoid "bashisms".

### Check your version

`$ bash --version`

> ```console
> GNU bash, version 5.1.16(1)-release (x86_64-pc-linux-gnu)
> Copyright (C) 2020 Free Software Foundation, Inc.
> License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
> ```

If you are unsure whether `bash` is running, you can check the `$SHELL`
environment variable: `$ echo $SHELL`

### users

By default, ubuntu instances do not have a password set for the `ubuntu` user.
You can read about why here: [Why does the default Ubuntu account have a blank password?](https://askubuntu.com/questions/101367/why-does-the-default-ubuntu-account-have-a-blank-password)

#### Set a password for the `ubuntu`

```sh
sudo passwd ubuntu
```

#### Add a user sudoers

```sh
sudo adduser username sudo
```

#### no-password sudo

Open the sudoers file as root and uncomment these lines:

```sh
sudo visudo
```

```sudoers
# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL

# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL

# Add to run any command without a password
username ALL=(ALL) NOPASSWD: ALL
```
