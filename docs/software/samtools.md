# Samtools

[Samtools](http://www.htslib.org/doc/samtools.html) is a suite of programs for
manipulating high-throughput sequencing data consisting of:

- [Samtools](https://github.com/samtools/samtools): For handling SAM/BAM/CRAM formats
- [BCFtools](https://github.com/samtools/bcftools): Variant calling (VCF/BCF formats)
- [HTSlib](https://github.com/samtools/htslib): The underlying C library

> [!TIP]
> Read the official samtools documentation [here](http://www.htslib.org/doc/samtools.html)

## `samtools` Commands

### Indexing

| Command | Description                       | Syntax |
| ------- | --------------------------------- | ------ |
| `dict`  | create a sequence dictionary file |        |
| `faidx` | index/extract FASTA               |        |
| `fqidx` | index/extract FASTQ               |        |
| `index` | index alignment                   |        |

### Editing

| Command               | Description                               | Syntax                                       |
| --------------------- | ----------------------------------------- | -------------------------------------------- |
| `calmd`               | recalculate MD/NM tags and '=' bases      |                                              |
| `fixmate`             | fix mate information                      |                                              |
| `reheader`            | replace BAM header                        |                                              |
| `targetcut`           | cut fosmid regions (for fosmid pool only) |                                              |
| `addreplacerg`        | adds or replaces RG tags                  |                                              |
| [`markdup`](#markdup) | mark duplicates                           | `samtools markdup in.algnsorted.bam out.bam` |
| `ampliconclip`        | clip oligos from the end of reads         |                                              |

#### Handling Duplicate Reads <a name="markdup"></a>

Let's assume we already have sorted, marked duplicates, and indexed BAM files.

```sh
for bamfile in ./*.bam; do
# note that in this case, files are named like `DNMT3A_sorted_markdup.bam`
    samtools markdup @$(nproc) -r -s $bamfile ${bamfile%markdup.bam}dedup.bam
done
```

### File operations

| Command      | Description                                       | Syntax |
| ------------ | ------------------------------------------------- | ------ |
| `collate`    | shuffle and group alignments by name              |        |
| `cat`        | concatenate BAMs                                  |        |
| `consensus`  | produce a consensus Pileup/FASTA/FASTQ            |        |
| `merge`      | merge sorted alignments                           |        |
| `mpileup`    | multi-way pileup                                  |        |
| `sort`       | sort alignment file                               |        |
| `split`      | splits a file by read group                       |        |
| `quickcheck` | quickly check if SAM/BAM/CRAM file appears intact |        |
| `fastq`      | converts a BAM to a FASTQ                         |        |
| `fasta`      | converts a BAM to a FASTA                         |        |
| `import`     | Converts FASTA or FASTQ files to SAM/BAM/CRAM     |        |
| `reference`  | Generates a reference from aligned data           |        |
| `reset`      | Reverts aligner changes in reads                  |        |

#### Sorting and Indexing

`samtools sort`: Sort alignments by leftmost coordinates

Sort a BAM file:

```sh
samtools sort -o sorted_output.bam input.bam
```

Sort by read names (useful for some tools):

```sh
samtools sort -n -o name_sorted.bam input.bam
```

`samtools index`: Index a sorted BAM/CRAM file

```sh
samtools index sorted_output.bam
```

> [!TIP]
> Always index your sorted BAM files.
> Many tools require indexed BAMs for efficient access.

#### Merging and Splitting

`samtools merge`: Combine multiple BAM files

```sh
samtools merge output.bam input1.bam input2.bam input3.bam
```

Ensure all input BAMs are sorted in the same way (coordinate or query name).

`samtools split`: Split a BAM file by read group

```sh
samtools split -u unassigned.bam -f '%*_%!.bam' input.bam
```

This is useful when you have multiple samples in one BAM file.

### Statistics

| Command         | Description                                | Syntax |
| --------------- | ------------------------------------------ | ------ |
| `bedcov`        | read depth per BED region                  |        |
| `coverage`      | alignment depth and percent coverage       |        |
| `depth`         | compute the depth                          |        |
| `flagstat`      | simple stats                               |        |
| `idxstats`      | BAM index stats                            |        |
| `cram-size`     | list CRAM Content-ID and Data-Series sizes |        |
| `phase`         | phase heterozygotes                        |        |
| `stats`         | generate stats (former bamcheck)           |        |
| `ampliconstats` | generate amplicon specific stats           |        |

`samtools flagstat`: Generate simple alignment statistics

```sh
samtools flagstat input.bam
```

`samtools idxstats`: Report alignment summary statistics

```sh
samtools idxstats input.bam
```

`samtools stats`: Generate comprehensive statistics

```sh
samtools stats input.bam > stats.txt
```

Use `plot-bamstats` to visualize these statistics.

### Viewing

| Command   | Description                                     | Syntax |
| --------- | ----------------------------------------------- | ------ |
| `flags`   | explain BAM flags                               |        |
| `head`    | header viewer                                   |        |
| `tview`   | text alignment viewer                           |        |
| `view`    | SAM<->BAM<->CRAM conversion                     |        |
| `depad`   | convert padded BAM to unpadded BAM              |        |
| `samples` | list the samples in a set of SAM/BAM/CRAM files |        |

Convert SAM to BAM:

```sh
samtools view -b -o output.bam input.sam
```

Convert BAM to CRAM (requires indexed reference genome):

```sh
samtools view -C -T reference.fa -o output.cram input.bam
```

View specific region of a BAM file:

```sh
samtools view input.bam chr1:1000000-2000000
```

Filter for mapped reads and convert to SAM:

```sh
samtools view -F 4 -h -o mapped_reads.sam input.bam
```

> [!NOTE]
> The `-F 4` flag filters out unmapped reads. Run `samtools flags` for more info.

## Working with CRAM Files

CRAM is a compressed alternative to BAM, offering significant space savings.

Converting BAM to CRAM:

```sh
samtools view -C -T reference.fa -o output.cram input.bam
```

### Important Considerations for CRAM

- Always keep your reference genome available.
- Use the exact same reference for creating and reading CRAM files.
- Set the `REF_PATH` environment variable to help samtools locate reference sequences:

```sh
export REF_PATH="/path/to/references/%2s/%2s/%s:http://www.ebi.ac.uk/ena/cram/md5/%s"
```

This allows for local and EBI-hosted reference lookup.

## Best Practices and Tips

Always work with sorted and indexed BAM/CRAM files for efficiency.

Use multithreading when available:

```sh
samtools sort -@ 4 -o sorted.bam input.bam
```

When working with large files, use the `-c` option to compress temporary files:

```sh
samtools sort -c -m 4G -o sorted.bam input.bam
```

For variant calling workflows, mark duplicates:

```sh
samtools markdup input.bam output.bam
```

Use `samtools faidx` to index your reference genome:

```sh
samtools faidx reference.fa
```

When downloading reference genomes, ensure they're bgzip-compressed:

```sh
# If you have a gzipped file:
gunzip reference.fa.gz
bgzip reference.fa
samtools faidx reference.fa.gz
```

For large-scale analyses, consider using CRAM format to save storage space.

## Practical Workflow Example

Here's a typical workflow for processing a new sequencing run:

```sh
# Convert FASTQ to BAM (assuming you've already aligned with BWA)
bwa mem -t 8 reference.fa read1.fq read2.fq | samtools view -b -o raw_aligned.bam -

# Sort the BAM file
samtools sort -@ 8 -o sorted.bam raw_aligned.bam

# Mark duplicates
samtools markdup -@ 8 sorted.bam marked_duplicates.bam

# Index the final BAM
samtools index marked_duplicates.bam

# Generate alignment statistics
samtools flagstat marked_duplicates.bam > alignment_stats.txt
samtools idxstats marked_duplicates.bam > chromosome_stats.txt

# Convert to CRAM for storage
samtools view -C -T reference.fa -o final_output.cram marked_duplicates.bam
```

## Example Pipelines
