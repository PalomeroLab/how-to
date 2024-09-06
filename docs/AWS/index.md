# Amazon Web Services

Command Line Interface References:

- [AWS S3 CLI](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html)
- [AWS EC2 CLI](https://docs.aws.amazon.com/cli/latest/reference/ec2/index.html)
- [AWS IAM CLI](https://docs.aws.amazon.com/cli/latest/reference/iam/index.html)
- [AWS Glacier CLI](https://docs.aws.amazon.com/cli/latest/reference/glacier/index.html)

## Installation

Fresh Ubuntu instances require [installation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html):

```sh
#!/bin/bash
#
## Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# cleanup
rm -rf awscliv2.zip ./aws

# add completion to your shell
complete -C '/usr/local/bin/aws_completer' aws
# on macOS, add the following to your .zshrc:
# autoload bashcompinit && bashcompinit
# autoload -Uz compinit && compinit

# configure credentials; use the ones from the IAM user you created
# AWS Access Key ID [None]: <YOUR_ACCESS_KEY_ID>
# AWS Secret Access Key [None]: <YOUR_SECRET_ACCESS_KEY>
# Default region name [None]: us-east-1
# Default output format [None]: [json|text|table]
aws configure
```

## Other CLI Tools

### `ssh`

edit `~/.ssh/config`

- add the location of the private key file so you don't have to specify it with `-i` each time you connect
- add the `User` and `Hostname` fields so you don't have to specify them each time

```sh
# example ~/.ssh/config
Host aws
    Hostname ec2-1-234-5-6.compute-1.amazonaws.com
    User ubuntu
    IdentityFile ~/.ssh/aws.pem
```

### `scp`

- "secure copy" files between computers using `ssh`
- this means the config from `~/.ssh/config` is used

```sh
# copy file to home dir of remote aws instance
scp localfile.txt aws:~

# copy remote file to pwd
scp aws:~/remotefile.txt .
```

### `rsync`

- useful for keeping all files in a directory up-to-date

```sh
# copy all files in a directory to a remote server
rsync -avz --progress /path/to/local/dir/ aws:/path/to/remote/dir/
```

### `tmux`

Weird stuff can happen with "nested" sessions over `ssh`.
If you want to attach to a tmux session on a remote server,
you need to use the `-t` flag since `tmux` is not a login shell.

```sh
ssh aws             # works
ssh aws tmux a      # huh?
ssh aws -t tmux a   # ok
```

### `vim`

Once you have ssh configured, you can use vim to edit files remotely thanks to
the `netrw` plugin that comes shipped with `vim`.

```sh
vim scp://aws/remote/path/to/file
```

Copy current vim buffer to remote server

```vim
:!scp % aws:~/path/to/remote/file
```

Inside vim, you can use the `:Explore` command to browse the remote server.
Read more about it with `:h netrw` from inside vim.
