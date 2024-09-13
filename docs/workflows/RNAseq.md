# RNA Sequencing Analysis

RNA sequencing (RNA-seq) is a technique used to analyze the transcriptome -
the complete set of RNA transcripts in a cell. This method involves sequencing
RNA molecules after reverse transcription to cDNA to examine gene expression levels
and identify novel transcripts.

This document describes two pipelines for RNA-seq analysis:

- Using `featureCounts` and then analyzing with DESeq2 in R
- Using the Tuxedo Suite (HISAT2, StringTie, Ballgown)

## `featureCounts`

[`featureCounts`](https://subread.sourceforge.net/featureCounts.html)
is a program for counting reads mapped to genomic features, such as genes, exons,
and promoters. It is part of the [Subread](https://subread.sourceforge.net)
package and can be used for RNA-seq as well as DNA-seq analysis.

> featureCounts takes as input SAM/BAM files and an annotation file including
> chromosomal coordinates of features. It outputs numbers of reads assigned to features
> (or meta-features). It also outputs stat info for the overall summrization results,
> including number of successfully assigned reads and number of reads that failed to be
> assigned due to various reasons (these reasons are included in the stat info).

Use FeatureCounts to count the number of reads that map to each gene in a GTF
file and summarize the results for downstream analysis (i.e., differential expression).

### Input

Aligned reads in BAM format and a GTF file containing genomic features.

Example usage:

```sh
featureCounts -T "$NUM_THREADS" --verbose -t exon -g gene_id --countReadPairs \
		-a "$REF_GTF" -p -P -C -B -o "${OUT_DIR}/${OUT_PREFIX}.tsv" ./*.bam
```

### Output

Feature counts are written to a tab-delimited file (`.tsv` or `.txt`)
with columns for each sample. You can import this file into R or other
statistical software for further analysis.

Feature counts also provide a summary of the number of reads that were
assigned to features, as well as the number of reads that were not assigned
to any feature.

## Downstream Analysis using R

Export the results from `featureCounts` to R for further analysis, such as
differential expression analysis using packages like DESeq2 or edgeR.

### DESeq2

[DESeq2](https://bioconductor.org/packages/release/bioc/html/DESeq2.html) is an
R package for differential gene expression analysis based on the negative
binomial distribution.

> DESeq2 provides methods to test for differential expression by use of negative
> binomial generalized linear models. The models use the raw counts as input and
> perform regularized log transformation and variance stabilizing
> transformation. The package also provides functions to visualize the data and
> results.

<!-- -->

## Tuxedo Suite

The Tuxedo Suite is a collection of tools for transcript-level expression analysis of RNA-seq experiments.

1. Align reads to the reference genome and sort to BAM format (HISAT2)
2. Assemble transcripts (StringTie)
3. Prepare for differential expression analysis (Ballgown setup)
4. Perform differential expression analysis
5. Visualize results

| Tool      | Description                                    | Manual                                                                      | Source                                             |
| --------- | ---------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------- |
| HISAT2    | Align reads to reference genome                | [manual](https://daehwankimlab.github.io/hisat2/manual/)                    | [source](https://github.com/DaehwanKimLab/hisat2)  |
| StringTie | Assemble RNA-Seq alignments into transcripts   | [manual](https://ccb.jhu.edu/software/stringtie/index.shtml)                | [source](https://github.com/gpertea/stringtie)     |
| Ballgown  | Isoform-level differential expression analysis | [manual](https://bioconductor.org/packages/release/bioc/html/ballgown.html) | [source](https://github.com/alyssafrazee/ballgown) |

> [!TIP]
> StringTie comes packaged with `gffcompare` for comparing and evaluating the
> accuracy of RNA-seq transcript assemblers. Read the
> [manual](https://ccb.jhu.edu/software/stringtie/gffcompare.shtml) for details.

Using Ballgown:

1. Filter to remove low-abundance genes
2. Identify differentially expressed transcripts and genes
3. Add gene names
4. Sort by p-value
5. Write results to file

## References

- Liao Y, Smyth GK, Shi W. featureCounts: an efficient general purpose program for assigning sequence reads to genomic features. Bioinformatics. 2014;30(7):923-30. [PMID: 24227677](https://pubmed.ncbi.nlm.nih.gov/24227677/)
- Pertea, M., Kim, D., Pertea, G. M., Leek, J. T., & Salzberg, S. L. (2016). Transcript-level expression analysis of RNA-seq experiments with HISAT, StringTie and Ballgown. Nature Protocols, 11(9), 1650–1667. [PMID: 27560171](https://pubmed.ncbi.nlm.nih.gov/27560171/)
- Kim D, Langmead B, Salzberg SL. HISAT: a fast spliced aligner with low memory requirements. Nat Methods. 2015;12(4):357-360. [PMID: 25751142](https://pubmed.ncbi.nlm.nih.gov/25751142/)
- Pertea M, Pertea GM, Antonescu CM, Chang TC, Mendell JT, Salzberg SL. StringTie enables improved reconstruction of a transcriptome from RNA-seq reads. Nat Biotechnol. 2015;33(3):290-295. [PMID: 25690850](https://pubmed.ncbi.nlm.nih.gov/25690850/)
- Frazee AC, Pertea G, Jaffe AE, Langmead B, Salzberg SL, Leek JT. Ballgown bridges the gap between transcriptome assembly and expression analysis. Nat Biotechnol. 2015;33(3):243-246. [PMID: 25748911](https://pubmed.ncbi.nlm.nih.gov/25748911/)
