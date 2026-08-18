# Palomero Lab How-To

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This repository ships the MkDocs theme and build configuration for the
Palomero Lab how-to site. Pages live in
[`docs/`](https://github.com/PalomeroLab/how-to/tree/main/docs) as plain
markdown files; see
[`docs/example.md`](https://github.com/PalomeroLab/how-to/blob/main/docs/example.md)
for the features the theme supports (admonitions, tabs, fenced code with a
copy button, and the last-updated macro).

This file is published as the site's home page at the URL above
(`docs/index.md` is a symlink to this README).

## Building

Docs are built with `mkdocs` and hosted on GitHub Pages.

## Local setup

You can install dependencies with either `pip` or `micromamba`.

### Option 1: pip

- `pip` docs: https://pip.pypa.io/en/stable/installation/
- Create and activate a virtual environment:
  - `python3 -m venv .venv`
  - `source .venv/bin/activate`
- Install requirements:
  - `pip install -r requirements.txt`

### Option 2: micromamba

- `micromamba` docs: https://mamba.readthedocs.io/en/latest/installation/micromamba-installation.html
- Create env from `environment.yml`:
  - `micromamba env create -f environment.yml`
- Activate env:
  - `micromamba activate how-to`
- This environment installs `mkdocs` with conda-forge and installs the remaining Python packages from `requirements.txt` via pip.

### Build/serve docs

- `mkdocs build`
- `mkdocs serve`
