import os
from datetime import datetime

def get_file_date(page):
    """
    Returns the last modification date of the given page's source file.
    """
    if page and hasattr(page, 'file') and hasattr(page.file, 'abs_src_path'):
        stat = os.stat(page.file.abs_src_path)
        return datetime.fromtimestamp(stat.st_mtime).strftime('%Y-%m-%d')
    return None

def define_env(env):
    """
    This is the hook for defining variables, macros and filters
    """
    @env.macro
    def get_file_date_macro(page):
        """
        Macro to call get_file_date in the templating environment.
        """
        return get_file_date(page)

def on_post_page_macros(env):
    """
    Actions to be done after macro interpretation,
    when the markdown is already generated
    """
    # Use the macro function
    env.page.meta['file_date'] = get_file_date(env.page)
