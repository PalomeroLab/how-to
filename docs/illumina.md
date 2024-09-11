# Illumina Sequencing

If you used a core facility, Azenta, or another commercial service for
sequencing, they will send link to directly download the de-multiplexed
FASTQ files, usually with corresponding md5 checksums.

For instructions on how to download data from Azenta's sFTP server,
click [here](https://3478602.fs1.hubspotusercontent-na1.net/hubfs/3478602/13012-M%26G%200222%20sFTP%20Guide-3.pdf).

> [!NOTE]
> sFTP (Secure File Transfer Protocol) provides an encrypted channel for data transfer.\
> The md5 checksum is a unique character sequence that is computed from the
> contents of a file and changes if the file is modified.
> Read the original [RFC 1321](https://www.ietf.org/rfc/rfc1321.txt).

Otherwise, consult the [documentation](https://developer.basespace.illumina.com/docs)
for the appropriate Illumina sequencer:

- [MiSeq](https://support.illumina.com/sequencing/sequencing_instruments/miseq/documentation.html)
- [NextSeq500](https://support.illumina.com/sequencing/sequencing_instruments/nextseq-550/documentation.html)

## BaseSpace and the `bs` command-line interface

The browser-based interface is useful for small-scale projects, but the
command-line interface is more efficient for large-scale projects.
Check out [examples](https://developer.basespace.illumina.com/docs/content/documentation/cli/cli-examples).

Install on macOS using Homebrew:

```sh
brew tap basespace/basespace && brew install bs-cli
```

otherwise, download the latest version from Illumina:

```sh
install_directory="${HOME}/.local/bin}"
basespace_executable="$install_directory/bs"
wget "https://launch.basespace.illumina.com/CLI/latest/amd64-linux/bs" -O "$basespace_executable"
chmod +x "$basespace_executable"
# add to PATH
# echo "export PATH=$install_directory:$PATH" >> ~/.bashrc
# or add an alias
# echo "alias bs=$basespace_executable" >> ~/.bashrc
```

After installation, authenticate with your BaseSpace credentials:

```sh
bs authenticate
#
```

Follow link and login with illumina credentials,
then run 'bs whoami' to verify that you are authenticated:

```console
+----------------+----------------------------------------------------+
| Name           | Ryan Najac                                         |
| Id             | ########                                           |
| Email          | rdn2108@cumc.columbia.edu                          |
| DateCreated    | 2021-07-13 15:29:51 +0000 UTC                      |
| DateLastActive | 2024-06-03 18:59:47 +0000 UTC                      |
| Host           | https://api.basespace.illumina.com                 |
| Scopes         | READ GLOBAL, CREATE GLOBAL, BROWSE GLOBAL,         |
|                | CREATE PROJECTS, CREATE RUNS, START APPLICATIONS,  |
|                | MOVETOTRASH GLOBAL, WRITE GLOBAL                   |
+----------------+----------------------------------------------------+
```

## Demultiplexing Illumina sequencing data

Illumina instruments will demultiplex the data for you if you provide a valid
sample sheet prior to sequencing. For more information on how to create a sample
sheet, consult the [Illumina Support](https://support.illumina.com/) page.

Skip ahead to the [Quality Control](#quality-control) section if the
FASTQ files are already demultiplexed and ready for analysis, or keep reading
for instructions on how to demultiplex the data yourself.

Illumina hosts `.rpm` files for CentOS/RedHat Linux distros and the
source code (which must be compiled) for other distros.

Download bcl2fastq2 Conversion Software v2.20 Installer (Linux rpm) from
[Illumina](https://support.illumina.com/sequencing/sequencing_software/bcl2fastq-conversion-software.html).

The AWS EC2 instance used for this project is based on Ubuntu, so we will
have to convert the `.rpm` file to a `.deb` file using the `alien` package,
as per this [post](https://www.biostars.org/p/266897/).

```sh
sudo alien -i bcl2fastq2-v2.20.0.422-Linux-x86_64.rpm
```

> [!WARNING]
> As of 2024-08-05, `bcl2fastq` is no longer supported; use `bclconvert` instead.\
> You can install `bclconvert` using the same methods as described above.

Read the docs:

- [bcl2fastq](https://support.illumina.com/content/dam/illumina-support/documents/documentation/software_documentation/bcl2fastq/bcl2fastq_letterbooklet_15038058brpmi.pdf)
- [bclconvert](https://support-docs.illumina.com/SW/BCL_Convert_v4.0/Content/SW/BCLConvert/BCLConvert.htm)
