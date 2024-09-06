# EC2

EC2 (Elastic Compute Cloud) instances are virtual servers that you can spin up
and down as needed. They are billed by the hour and you can choose from a
variety of instance [types](https://aws.amazon.com/ec2/instance-types/).

## `ssh`

If there is an ssh key associated with the instance, make sure you have a copy of the
private key with permissions set to `400`:

```sh
chmod 400 /path/to/private-key.pem
```

## Connect to EC2 instance through serial console

Go to the [EC2 Console](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#Instances:instanceState=running)
and select the instance you want to connect to.
Click on the `Connect`, then `EC2 serial console` tab, and `Connect` again.

> [!NOTE]
> Make sure the type of instance is supported by the serial console.
> Look for ones that run on AWS Nitro System.

Once connected, you can interact with the instance as if you were using a terminal.

If a login prompt does not appear, try pressing `Enter`.
