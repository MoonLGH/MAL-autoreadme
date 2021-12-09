# MAL readme workflow

> Simple workflow that will add your latest MAL History into your readme!


## Note

This is basicly wallmart copy of [pxseu/anilist-readme](https://github.com/pxseu/anilist-readme/)

## How to

Simply add this to your README.md

```html
# 🌸 My recent MAL activity

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

| Option            | Description                                         | Default                                | Required | Example |
| ----------------- | --------------------------------------------------- | -------------------------------------- | -------- | ------- |
| `username`         | Your MyAnimeList user name                                | ""                                     | `True`   | MoonLMAL
| `gh_token`        | Authorized github token                             | ${{ github.token }}                    | `False`  | ""
| `readme_path`     | Path to the readme file Repo to edit                     | ""                          | `True`  | "[MoonLGH/MoonLGH](https://github.com/MoonLGH/MoonLGH)" |
| `branch`     | branch the readme file to edit                     | "main"                          | `True`  | "main" |
| `useScraping`     | Scraping the MAL history web instead of using JikanAPi                     | "false"                          | `false`  | "true" |
| `limit`     | limit the post of the history                     | "10"                          | `false`  | "15" |

> useScraping is still in beta and possibly a lot of bugs in it

## Example

You can find it on my [profile](https://github.com/MoonLGH/MoonLGH)!

## Troubleshooting

- Your Activity is not updating ?

Dont worry, its just JikanApi not updating stuff by that time, just wait for couple more hour (1 - 12) and it will be updated!\
For more details, just open your history on https://myanimelist.net/history/YourUsername and if it updated there, open https://api.jikan.moe/v3/user/YourUsername/history and look if it updated there.\
if it both updated, try using useScraping instead, reruning action or wait for next action executed.

## Contributing

I make mistakes here, or just want to help with this project ?\
yeah, just make a pr im gonna consider it