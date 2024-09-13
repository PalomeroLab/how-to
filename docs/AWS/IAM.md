# IAM

Use IAM to securely manage access to AWS services and resources. This guide covers users, groups, policies, and best practices.

## Users

To create a user:

1. Navigate to `IAM` in the AWS Management Console
2. Select `Users` from the left sidebar
3. Click `Create user`
4. Follow the prompts to set up the user

> [!CAUTION]
> Providing user access to the AWS Management Console is a security risk.
> If you must provide access:
>
> 1. Create an auto-generated password
> 2. Require the user to change it upon first login
> 3. Enable Multi-Factor Authentication (MFA)

Best practice: Don't attach policies directly to users. Use groups to manage permissions instead.

### Example: Creating a user with AWS CLI

```bash
aws iam create-user --user-name johndoe
aws iam create-login-profile --user-name johndoe --password "InitialPassword123!" --password-reset-required
```

## Groups and Policies

Groups simplify permission management by allowing you to assign policies to multiple users at once.

We have three custom groups:

| Group Name | Policies                                                               | Use Case                                            |
| ---------- | ---------------------------------------------------------------------- | --------------------------------------------------- |
| LabAdmin   | AdministratorAccess                                                    | For administrators who need full access             |
| LabUser    | FullAccess to IAM, CloudShell, EC2, S3, and Glacier                    | For regular lab users with broad but limited access |
| LabGuest   | AmazonS3ReadOnlyAccess, AmazonGlacierFullAccess, IAMUserChangePassword | For collaborators who need minimal access           |

### Creating a Group

1. Go to `IAM` > `User groups` > `Create group`
2. Name the group and attach relevant policies
3. Add users to the group

### Example: Creating a group with AWS CLI

```bash
aws iam create-group --group-name LabUser
aws iam attach-group-policy --group-name LabUser --policy-arn arn:aws:iam::aws:policy/AmazonEC2FullAccess
aws iam add-user-to-group --user-name johndoe --group-name LabUser
```

## Policies

Policies define permissions for AWS resources. They can be AWS-managed, customer-managed, or inline.

### Inline Policies

Inline policies are directly attached to a user, group, or role. They're useful for one-off permissions.

Example: Allowing access to EC2 Serial Console

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowInstanceBasedSerialConsoleAccess",
      "Effect": "Allow",
      "Action": ["ec2-instance-connect:SendSerialConsoleSSHPublicKey"],
      "Resource": "*"
    }
  ]
}
```

### Creating a Custom Policy

1. Go to `IAM` > `Policies` > `Create policy`
2. Use the visual editor or JSON editor to define permissions
3. Review and create the policy

More about policy syntax: [IAM Policy Reference](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies.html)

## Best Practices

1. Follow the principle of least privilege
2. Use groups for permission management
3. Enable MFA for all users
4. Regularly audit and remove unused users, groups, and policies
5. Use AWS Organizations for multi-account environments
6. Implement a strong password policy

## Monitoring and Auditing

Use AWS CloudTrail to log IAM and AWS account activity. Set up CloudWatch alarms to alert on suspicious activity.

Example CloudWatch alarm for failed console sign-in attempts:

```json
{
  "MetricName": "ConsoleSignInFailures",
  "Namespace": "AWS/IAM",
  "Statistic": "Sum",
  "Period": 300,
  "EvaluationPeriods": 1,
  "Threshold": 3,
  "ComparisonOperator": "GreaterThanThreshold",
  "AlarmActions": ["arn:aws:sns:us-east-1:123456789012:SecurityNotifications"]
}
```

For more information, refer to the [IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html).
