# Amazon Web Services

This page covers setting up the command-line interface for AWS services.
For more information on AWS services, see one of these pages:

- [S3](s3.md)
- [EC2](ec2.md)
- [IAM](iam.md)

## Installation

Fresh Ubuntu instances require [installation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html):

```sh
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install && rm -rf ./awscliv2.zip ./aws
``` 

Next, add tab completion to your shell:

```sh
complete -C '/usr/local/bin/aws_completer' aws
```

If you're using `zsh` (the shell on macOS), add the following to your `.zshrc`
so that the completion script is loaded when you start a new shell:

```sh
autoload bashcompinit && bashcompinit
autoload -Uz compinit && compinit
```

Finally, configure your credentials:

```sh
aws configure
```

- AWS Access Key ID [None]: <YOUR_ACCESS_KEY_ID>
- AWS Secret Access Key [None]: <YOUR_SECRET_ACCESS_KEY>
- Default region name [None]: us-east-1
- Default output format [None]: [json|text|table]

## Further Reading
Command Line Interface References:

- [AWS S3 CLI](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html)
- [AWS EC2 CLI](https://docs.aws.amazon.com/cli/latest/reference/ec2/index.html)
- [AWS IAM CLI](https://docs.aws.amazon.com/cli/latest/reference/iam/index.html)
- [AWS Glacier CLI](https://docs.aws.amazon.com/cli/latest/reference/glacier/index.html)
