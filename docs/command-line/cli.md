# Linux Command Line Interface (CLI)

This guide provides practical examples for common Linux command-line operations.

## Checking Bash Version

To check your bash version:

```sh
bash --version
```

Expected output:

```console
GNU bash, version 5.1.16(1)-release (x86_64-pc-linux-gnu)
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
```

To verify if bash is running:

```sh
echo $SHELL
```

## User Management

### Setting a password for the `ubuntu` user

```sh
sudo passwd ubuntu
```

### Adding a user to sudoers

```sh
sudo adduser username sudo
```

### Configuring no-password sudo

Open the sudoers file:

```sh
sudo visudo
```

Uncomment or add these lines:

```sudoers
# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL

# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL

# Add to run any command without a password
username ALL=(ALL) NOPASSWD: ALL
```

## SSH Operations

### Installing OpenSSH server

```sh
sudo apt install openssh-server
```

### Connecting to a remote server

```sh
ssh username@hostname
```

### Copying files to/from a remote server

```sh
scp username@hostname:/path/to/remote/file /path/to/local/file
scp /path/to/local/file username@hostname:/path/to/remote/file
```

### Setting up passwordless SSH

1. Generate a new SSH key pair:

```sh
ssh-keygen -t rsa -b 4096 -C "a comment"
```

2. Copy the public key to the remote server:

```sh
ssh-copy-id -i <identity_file> username@hostname
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

These examples cover basic user management, SSH operations, and system configuration. For more advanced operations or specific use cases, consult the manual pages (`man` command) or official documentation for each command.
