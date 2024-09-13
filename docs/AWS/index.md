# Amazon Web Services

This guide covers setting up and using the AWS Command Line Interface (CLI) for interacting with various AWS services.

- [S3 (Simple Storage Service)](s3.md)
- [EC2 (Elastic Compute Cloud)](ec2.md)
- [IAM (Identity and Access Management)](iam.md)

## AWS CLI Installation

For fresh Ubuntu instances:

```sh
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install && rm -rf ./awscliv2.zip ./aws
```

For other operating systems, refer to the [official installation guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

## Shell Completion Setup

### Bash

Add to your `~/.bashrc`:

```sh
complete -C '/usr/local/bin/aws_completer' aws
```

### Zsh

Add to your `~/.zshrc`:

```sh
autoload bashcompinit && bashcompinit
autoload -Uz compinit && compinit
complete -C '/usr/local/bin/aws_completer' aws
```

## AWS CLI Configuration

Set up your AWS credentials:

```sh
aws configure
```

You'll be prompted for:

- AWS Access Key ID
- AWS Secret Access Key
- Default region name (e.g., us-east-1)
- Default output format (json, text, or table)

> [!TIP]
> You can set up multiple profiles using `aws configure --profile profilename`

## Basic AWS CLI Usage

### List S3 Buckets

```sh
aws s3 ls
```

### List EC2 Instances

```sh
aws ec2 describe-instances
```

### Create an IAM User

```sh
aws iam create-user --user-name newuser
```

## Advanced CLI Features

### Using JSON Parameters

For complex API calls, you can use JSON files:

```sh
aws ec2 run-instances --cli-input-json file://ec2-params.json
```

### JMESPath Querying

Use `--query` to filter output:

```sh
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name]'
```

### AWS CLI Aliases

Create shortcuts for common commands in `~/.aws/cli/alias`:

```
[toplevel]
todays-instances = ec2 describe-instances --query 'Reservations[].Instances[?LaunchTime>=`2023-01-01`]'
```

Use with: `aws todays-instances`

## References

- [AWS CLI Command Reference](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/index.html)
- [S3 CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html)
- [EC2 CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/ec2/index.html)
- [IAM CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/iam/index.html)
- [Glacier CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/glacier/index.html)
