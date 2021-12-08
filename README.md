# AniList readme workflow

> Simple workflow that will add your latest MAL History into your readme!


## Note

This is basicly wallmart copy of [pxseu/anilist-readme](https://github.com/pxseu/anilist-readme/)

## How to

Simply add this to your README.md

```html
# 🌸 My recent AniList activity

<!-- MAL_ACTIVITY:start -->

<!-- MAL_ACTIVITY:end -->
```

and setup the workflow like this:

```yml
on:
  schedule:
    # Runs every hour
    - cron: '0 * * * *'
  workflow_dispatch:

jobs:
  update-readme-with-blog:
    name: Update this repo's README with latest MAL history
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: MyAnimeList readme workflow
        uses: MoonLGH/MAL-autoreadme@v2
        with:
          username: "MoonLMAL"
          gh_token: ${{ github.token }}
          readme_path: "MoonLGH/MoonLGH"
```

## Settings

| Option            | Description                                         | Default                                | Required |
| ----------------- | --------------------------------------------------- | -------------------------------------- | -------- |
| `username`         | Your MyAnimeList user name                                | ""                                     | `True`   |
| `gh_token`        | Authorized github token                             | ${{ github.token }}                    | `False`  |
| `readme_path`     | Path to the readme file to edit                     | ""                          | `True`  |
| `branch`     | branch the readme file to edit                     | "main"                          | `True`  |


## Example

You can find it on my [profile](https://github.com/MoonLGH/MoonLGH)!
