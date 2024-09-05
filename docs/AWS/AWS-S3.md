# AWS S3

S3 (Simple Storage Service) is a cloud storage service that allows you to store
and retrieve files.

## Upload/Download files to/from S3

> The s3 [sync](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/sync.html)
> command synchronizes the contents of a bucket and a directory,
> or the contents of two buckets. Typically, s3 sync copies missing or outdated
> files or objects between the source and target.

use [`sync`](https://docs.aws.amazon.com/cli/latest/userguide/cli-services-s3-commands.html#using-s3-commands-managing-objects-sync)
like `cp --recursive`

```sh
aws s3 sync <source> <target> [--options]
```

Where `<source>` and `<target>` are either local directories or S3 URIs
and options include:

| Option      | Description                                           |
| ----------- | ----------------------------------------------------- |
| `--exclude` | Exclude files that match the specified pattern        |
| `--include` | Include files that match the specified pattern        |
| `--dryrun`  | Perform a trial run with no changes made              |
| `--delete`  | Delete files in the target that are not in the source |
| `--quiet`   | Suppress output except for errors                     |

> [!TIP]
> Click the "Copy S3 URI" button in the S3 console to copy the URI of a file or directory.
> S3 directories are in the form `s3://bucketname/uri`

## Rename objects

You can rename objects with Renaming objects with
[`mv`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/mv.html),
but this operation is not atomic and it is not possible to view progress.

```sh
# instead of this
aws s3 mv s3://bucketname/oldkey s3://bucketname/newkey

# do this
aws s3 cp s3://bucketname/oldkey s3://bucketname/newkey \
    && aws s3 rm s3://bucketname/oldkey
```

The command following the `&&` will only run if the first command is successful.

## Glacier storage

[Amazon S3 Glacier storage classes](https://aws.amazon.com/s3/storage-classes/glacier/)

Files uploaded to s3 are converted to Glacier storage class after a certain
amount of time. This means that the files are not immediately accessible and
must be restored to their original form before they can be downloaded.

```sh
# restore all objects in a bucket to their original form
aws s3api restore-object --bucket bucketname --key uri --restore-request '{"Days":25,"GlacierJobParameters":{"Tier":"Standard"}}'
```

If you encounter the following warning when trying to download files from s3:

> [!WARNING]
> Object is of storage class GLACIER. Unable to perform download operations on GLACIER objects. You must restore the object to be able to the perform operation.

First, ensure that the object has been restored by running the following command:

```sh
aws s3api head-object --bucket "${bucketname}" --key "${uri}"
```

If you see the above warning when trying to make recursive calls to aws objects that have already been restored, rerun the command using the `--force-glacier-transfer` flag. There is no real error, this is just the way the aws cli handles the situation.

```sh
aws s3 cp s3://bucketname/uri/ . --recursive --force-glacier-transfer
```

Check out this [issue](https://github.com/aws/aws-cli/issues/1699) for more info.

```sh
# copy files to/from s3 bucket
aws s3 sync <source> <destination>

# copy all files of a certain type to local
aws s3 cp s3://bucketname/uri/*.fastq.gz .
```

### Mount S3 bucket as a filesystem

Installation:

```sh
wget https://s3.amazonaws.com/mountpoint-s3-release/latest/x86_64/mount-s3.deb
sudo apt-get install ./mount-s3.deb -y && rm mount-s3.deb
```

To mount...
