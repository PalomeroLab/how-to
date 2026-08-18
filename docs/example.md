# Example page

This page shows the theme features available to pages written for this site.

## Admonitions

!!! note
    This is a note admonition, from `markdown_gfm_admonition`.

!!! warning "Custom title"
    Admonitions can take a custom title.

## Fenced code with copy button

```python
def hello():
    print("Hello, Palomero Lab!")
```

The clipboard button in the top-right corner of the block above comes from
`custom_theme/extra.js`.

## Tabs and superfences

=== "Tab A"
    Content for tab A.

=== "Tab B"
    Content for tab B.

## Macros

The last-updated date at the bottom of every page comes from the
`get_file_date_macro` defined in `main.py`.
