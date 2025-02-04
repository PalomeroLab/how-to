# Azenta sFTP Data Delivery

- `Host`: sftp://sftp.genewiz.com
- `User`: uni1234_cumc_columbia
- `Password`: ####################
- `Port`: 22

## Login

```sh
# Connects to sFTP and prompts for password
sftp -P 22 $User@$Host
```

### Set Up Passwordless SSH Authentication

Ensure your SSH public key is added to the authorized_keys file
on the SFTP server. If you haven’t done this yet, follow these steps:

```sh
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@remote_server
```

Copying to an sftp server looks like:

```sh
ssh-copy-id -i ~/.ssh/id_ed25519.pub hm2882_cumc_columbia
```
