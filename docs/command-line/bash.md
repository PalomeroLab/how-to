# Bash Scripting

[Google](https://google.github.io/styleguide/shellguide.html)
recommends using `bash` for all executable shell scripts:

> Restricting all executable shell scripts to `bash` gives us a consistent
> shell language that's installed on all our machines. In particular, this
> means there is generally no need to strive for POSIX-compatibility or
> otherwise avoid "bashisms".

## Start with a shebang

The shebang is the first line of a script and tells the system which interpreter
to use to run the script. For `bash` scripts, use `#!/bin/bash`:

```sh
#!/bin/bash
# After the shebang, add comments to describe the script
echo "Hello, world!"
```

You may see other shebangs like `#!/bin/sh` or `#!/usr/bin/env bash`. The former
uses the system's default shell, which may not be `bash`. The latter is more
portable as it can find `bash` in different locations.

### Executing scripts

To execute a script from the command line, you can manually invoke the
interpreter with `bash <filename>` or you can make the file executable:

```sh
chmod +x /path/to/script.sh
```

> [!NOTE]
> If you use the command `ls -l`, you'll see an `x` in the permissions column
> for the script. More about that [here](https://www.geeksforgeeks.org/how-to-set-file-permissions-in-linux/).

Then run it:

```sh
./path/to/script.sh
```

> [!TIP]
> The `./` prefix is required to run scripts in the current directory.

Try saving the "Hello, world!" script above to a file and running it
after making it executable. (The `.sh` extension is optional.)

## Resources

- `man bash`
- [Bash Reference Manual](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html)
- [Bash Guide](https://mywiki.wooledge.org/BashGuide)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)
- [Safety First!](https://github.com/anordal/shellharden/blob/master/how_to_do_things_safely_in_bash.md)
- [Bashisms](https://mywiki.wooledge.org/Bashism)
- [Bash Pitfalls](https://mywiki.wooledge.org/BashPitfalls)
- [Arrays in Bash](https://mywiki.wooledge.org/BashFAQ/005)
- [Shell Script Templates](https://stackoverflow.com/questions/430078/shell-script-templates)
- [Command Name Extensions Considered Harmful](https://www.talisman.org/~erlkonig/documents/commandname-extensions-considered-harmful/)

For a quick reference, check out [DevHints.io](https://devhints.io/bash).

## Special Variables and Commands

Special variables and commands can be very useful in `bash` scripts,
particularly for interacting with command history:

<!-- markdownlint-disable MD013 -->

| Command         | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `!!`            | Repeat the last command.                                     |
| `!$`            | Last argument of the last command.                           |
| `$_`            | Last argument of the last command.                           |
| `!^`            | First argument of the last command.                          |
| `$?`            | Exit status of the last command.                             |
| `!n`            | Repeat command number `n` from history.                      |
| `!!:n`          | The `n`-th argument of the last command.                     |
| `!!:s/old/new/` | Substitute `old` with `new` in the last command.             |
| `!cmd`          | Run the most recent command starting with `cmd`.             |
| `!+`            | Next command in the history list (after the current one).    |
| `!-n`           | The command `n` lines before the current command in history. |
| `!!:p`          | Print the last command without executing it.                 |
| `!!:x`          | Extract and display the `x`-th argument of the last command. |

### Examples

You ran a command without `sudo` and want to run it again with `sudo`:

```sh
$ apt update
E: Could not open lock file /var/lib/apt/lists/lock - open (13: Permission denied)
$ sudo !!
```

You performed a dry run with `echo` and want to run the command for real:

```sh
echo sudo apt-get install -y vim
!:2-*
```

## Update and Upgrade Everything on Ubuntu

To update and upgrade all packages:

```sh
sudo apt-get update && sudo apt-get upgrade -y
```

Alternatively:

```sh
yes | sudo sh -c 'apt update && apt upgrade && apt dist-upgrade \
                 && apt autoremove && apt autoclean && apt clean'
```

## Special text inside `bash` scripts

### Multi-line Comments

To add multi-line comments in `bash`, use the following syntax:

```sh
: '
This is a
very neat comment
in bash
'
```

### Here Documents

A here document allows you to pass multiple lines of input to a command without storing it in a file:

```sh
cat <<EOF
This is a here document.
It can be used to pass multiple lines of input to a command.
EOF
```

### More useful commands

| Command                             | Description                                                                   |
| ----------------------------------- | ----------------------------------------------------------------------------- |
| ssh user@host 'bash -s' < script.sh | Run a local script on a remote machine.                                       |
| md5sum ./\*.fastq.gz > md5sums.txt  | Generate a file with the MD5 checksums of all files in the current directory. |
| md5sum -c md5sums.txt               | Check files against the MD5 checksums in a file.                              |
| du -ha --max-depth=1                | Check the total size of each folder in the current directory.                 |
| free -h                             | Check current memory usage.                                                   |

## Loop across files of the same extension

Don't use `ls` or `find`. Instead, use a glob pattern:

```sh
for file in ./*.bam; do # Loop across all .bsudoam files in the current directory
 command "$file"        # Quote the variable to handle spaces in filenames
done

# single-line loop
for file in ./*.bam; do command "$file"; done
```

[source](https://mywiki.wooledge.org/BashPitfalls#for_f_in_.24.28ls_.2A.mp3.29)

## Safely change directories

Don't `cd` without checking if it was successful!
You might end up executing commands in the wrong directory.

```sh
cd /path/to/some/dir || exit # Exit if the directory doesn't exist or is inaccessible
rm -rf *                     # This could be very bad if the cd failed
```

[source](https://mywiki.wooledge.org/BashPitfalls#cd_.2Ffoo.3B_bar)

## Correctly define functions

Don't use `function` to define functions! It's ugly and not portable.
Just use the function name followed by parentheses. We'll know it's a function.

```sh
# bad
function myfunc {
 echo "Hello, world!"
}

# very bad
function myfunc() {
 echo "Hello, world!"
}

# good
myfunc() {
 echo "Hello, world!"
}
```

[source](https://mywiki.wooledge.org/BashPitfalls#function_foo.28.29)

> [!TIP]
> To define single-line functions, add a semicolon before the closing brace:
>
> `myfunc() { echo "Hello, world!"; }`
