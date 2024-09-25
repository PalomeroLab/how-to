# Bioconda and Micromamba

## Overview

- **Bioconda**: A channel for the conda package manager specializing in bioinformatics software.
- **Micromamba**: A fast, lightweight implementation of the conda package manager.

## Bioconda Channels

Bioconda traditionally recommends setting up channels as follows:

```sh
conda config --add channels defaults
conda config --add channels bioconda
conda config --add channels conda-forge
conda config --set channel_priority strict
```

This creates a `.condarc` file in the user's home directory:

```.condarc
channels:
  - defaults
  - bioconda
  - conda-forge
channel_priority: strict
```

However, the Mamba project (which includes Micromamba) suggests a different approach. They recommend avoiding the Anaconda default channels due to potential conflicts and slower resolution times. Instead, they advocate for using only the necessary channels for each project.

## Micromamba: A Lightweight Alternative

Micromamba is a smaller, faster version of the conda package manager. It's particularly useful for bioinformatics workflows due to its speed and reduced resource requirements.

### Why Use Micromamba?

1. Faster package resolution and installation
2. Smaller disk footprint
3. No base environment, reducing conflicts
4. Suitable for CI/CD pipelines and containers

## Environment Management with Micromamba

Best practice is to use environment specification files for each project:

```yaml
name: RNAseq
channels:
  - bioconda
  - conda-forge
dependencies:
  - fastqc=0.11.9
  - hisat2=2.2.1
  - bwa=0.7.17
  - bowtie2=2.4.2
  - samtools=1.13
  - htslib=1.13
  - bcftools=1.13
  - stringtie=2.1.7
  - subread=2.0.1
```

Save this as `RNAseq.yaml`, then create the environment:

```sh
micromamba env create -f RNAseq.yaml
```

Activate the environment:

```sh
micromamba activate RNAseq
```

Your prompt should now show the active environment:

```console
(RNAseq) user@host:~$
```

## Best Practices

1. Specify exact versions for reproducibility.
2. Use separate environments for different projects or workflows.
3. Regularly update your environment files as tools are updated.
4. Include only necessary channels to avoid conflicts.
5. Use `micromamba env export > environment.yaml` to save current environment state.

## Troubleshooting

1. If package conflicts occur, try removing the problematic package and reinstalling.
2. Use `micromamba clean --all` to clear package caches if you encounter strange behavior.
3. If a package is not found, ensure you've included the correct channel.

## Advanced Usage

- Use `micromamba run -n env_name command` to run commands in a specific environment without activating it.
- Create environments on-the-fly with `micromamba create -n myenv package1 package2`.

For more information, refer to the [Bioconda documentation](https://bioconda.github.io/) and [Micromamba documentation](https://mamba.readthedocs.io/en/latest/user_guide/micromamba.html).
