# Packages

Bioconda recommends these default channels:

```sh
conda config --add channels defaults
conda config --add channels bioconda
conda config --add channels conda-forge
conda config --set channel_priority strict
```

A .condarc file is created in the user's home directory with the following contents:

```.condarc
channels:
  - defaults
  - bioconda
  - conda-forge
channel_priority: strict
```

However, Mamba documentation recommends against using any of the
[Anaconda default channels](https://docs.anaconda.com/working-with-conda/reference/default-repositories/).
by deactivating them, rather than deprioritizing them...

Instead of fighting against defaults, write spec files:

```yaml
name: RNAseq
channels:
  - bioconda
  - conda-forge
dependencies:
  - fastqc
  - hisat2
  - bwa
  - bowtie2
  - samtools
  - htslib
  - bcftools
  - stringtie
  - bowtie
  - subread
```

Then create the environment:

```sh
# it doesn't matter if you use .yml or .yaml, but be consistent!
micromamba env create -f RNAseq.yaml
```

When you correctly activate the environment, the usual prompt
will be prefixed with the name of the environment in parentheses:

```console
(RNAseq) ubuntu@ip-172-31-70-15:~/micromamba/envs$
```
