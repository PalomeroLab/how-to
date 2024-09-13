# EC2

EC2 instances are virtual servers that you can provision and manage in the AWS cloud. They offer flexible compute capacity, billed by the hour or second, with a variety of instance types to suit different workloads.

## Instance Types

EC2 provides a wide range of [instance types](https://aws.amazon.com/ec2/instance-types/) optimized for various use cases:

- General Purpose (e.g., t3, m5)
- Compute Optimized (e.g., c5)
- Memory Optimized (e.g., r5)
- Accelerated Computing (e.g., p3, g4)
- Storage Optimized (e.g., i3, d2)

Choose the instance type based on your application's requirements for CPU, memory, storage, and network performance.

## Connecting to EC2 Instances

### SSH

To connect via SSH, ensure you have the private key associated with the instance:

```sh
chmod 400 /path/to/private-key.pem
ssh -i /path/to/private-key.pem ec2-user@ec2-xx-xxx-xxx-xxx.compute-1.amazonaws.com
```

### EC2 Serial Console

For instances that support it (typically those running on AWS Nitro System):

1. Go to the [EC2 Console](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#Instances:instanceState=running)
2. Select the instance
3. Click `Connect` > `EC2 Serial Console` > `Connect`

> [!NOTE]
> If no login prompt appears, try pressing `Enter`.

## CLI Tools for EC2 Interaction

### SSH Config

Optimize your SSH connections by editing `~/.ssh/config`:

```
Host aws-instance
    Hostname ec2-xx-xxx-xxx-xxx.compute-1.amazonaws.com
    User ec2-user
    IdentityFile ~/.ssh/aws-key.pem
```

Now connect with: `ssh aws-instance`

### SCP (Secure Copy)

Transfer files to/from your EC2 instance:

```sh
# Local to EC2
scp localfile.txt aws-instance:~/

# EC2 to Local
scp aws-instance:~/remotefile.txt .
```

### Rsync

Synchronize directories:

```sh
rsync -avz --progress /local/dir/ aws-instance:/remote/dir/
```

### Tmux

For persistent sessions, use tmux. Connect with:

```sh
ssh -t aws-instance tmux attach
```

### Vim

Edit remote files directly:

```sh
vim scp://aws-instance//path/to/remote/file
```

Copy current buffer to EC2:

```vim
:!scp % aws-instance:~/path/to/remote/file
```

## Best Practices

1. Use appropriate instance types for your workload
2. Implement proper security groups and network ACLs
3. Use Elastic IPs for static public IP addresses
4. Utilize EC2 Auto Scaling for high availability and fault tolerance
5. Regularly patch and update your EC2 instances
6. Use Amazon CloudWatch for monitoring and alerting

## Advanced Features

- **EC2 Instance Connect**: Browser-based SSH access without the need for a key pair
- **Spot Instances**: Save up to 90% on EC2 costs for interruptible workloads
- **Elastic Fabric Adapter**: High-performance networking for HPC and ML applications
- **Elastic Inference**: Add GPU-powered inference acceleration to EC2 instances

For more information, refer to the [EC2 User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
