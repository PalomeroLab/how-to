# how-to

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

How to do stuff

## About

This is the repository for the documentation of how to do stuff.

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
