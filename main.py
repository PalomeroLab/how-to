import os
from datetime import datetime

# This script defines custom functions and macros for use in the MkDocs site


def get_file_date(page):
    """Returns the last modification date of the given page's source file."""
    if page and hasattr(page, "file") and hasattr(page.file, "abs_src_path"):
        stat = os.stat(page.file.abs_src_path)
        return datetime.fromtimestamp(stat.st_mtime).strftime("%Y-%m-%d")
    return None


def define_env(env):
    """Hook for defining variables, macros and filters in the MkDocs environment."""

    @env.macro
    def get_file_date_macro(page):
        """Macro to call get_file_date in the templating environment."""
        return get_file_date(page)


def on_post_page_macros(env):
    """Actions after macro interpretation and markdown generation."""
    # Add the file_date to the page metadata for use in templates
    env.page.meta["file_date"] = get_file_date(env.page)
