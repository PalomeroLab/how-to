# SSH (Secure Shell)

## Check your ip address

### macOS

```sh
ifconfig | grep inet
```

### Linux

```sh
hostname -I
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

```config
Host hostname
User username
HostName hostname
IdentityFile ~/.ssh/identity_file
```

Now you can log in without a password:

```sh
ssh username@hostname
```
