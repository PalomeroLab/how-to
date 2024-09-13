# Samtools

[Samtools](http://www.htslib.org/doc/samtools.html) is a suite of programs for manipulating high-throughput sequencing data. It's essential for many bioinformatics workflows, particularly in processing and analyzing DNA sequencing data.

The suite includes:

- [Samtools](https://github.com/samtools/samtools): For handling SAM/BAM/CRAM formats
- [BCFtools](https://github.com/samtools/bcftools): For variant calling and manipulating VCF/BCF files
- [HTSlib](https://github.com/samtools/htslib): A C library underlying samtools and bcftools

## Key Samtools Commands

### Viewing and Converting Files

`samtools view`: Convert between formats and filter alignments

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

The `-F 4` flag filters out unmapped reads. Use `samtools flags` to understand SAM flags.

### Sorting and Indexing

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

Always index your sorted BAM files. Many tools require indexed BAMs for efficient access.

### Merging and Splitting

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

### Statistics and Quality Control

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

## Troubleshooting

- If you get "file not found" errors, check if your BAM files are where you expect and have read permissions.
- For "invalid file format" errors, ensure your input files are properly formatted and not corrupted.
- If samtools seems slow, check your disk I/O and consider using an SSD for temporary files.
- For memory errors in `sort`, adjust the `-m` option to use less memory per thread.

Remember to consult the [official samtools documentation](http://www.htslib.org/doc/samtools.html) for detailed information on each command and its options. Regular practice and experimentation will help you become proficient with these powerful tools.
