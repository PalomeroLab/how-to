.PHONY: help install build serve clean

install:
	pip install -r requirements.txt

build:
	mkdocs build

serve:
	mkdocs serve

clean:
	rm -rf site

help:
	@echo "Available commands:"
	@echo "  make install - Install dependencies"
	@echo "  make build   - Build the documentation site"
	@echo "  make serve   - Serve the documentation locally"
	@echo "  make clean   - Remove the build artifacts"

