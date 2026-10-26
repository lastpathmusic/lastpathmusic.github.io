# lastpathmusic.github.io

Website for Last Path Music. Plain HTML, CSS and a little JavaScript, no build step.

## Edit

- **Shows:** add an `<li>` to `#show-list` in `index.html` (a template is in the comment). Delete the "No shows" paragraph once you have dates.
- **Live set videos:** change the `id` and `start` (seconds) in `js/main.js`.
- **Links and copy:** all in `index.html`.

## Deploy

Push to `main`. In the repo, go to Settings > Pages and set the source to "Deploy from a branch", branch `main`, folder `/ (root)`.
The site appears at https://lastpathmusic.github.io.

## Custom domain later

Add a file named `CNAME` containing the domain, point DNS at GitHub Pages, and update the URLs in the `<head>` of `index.html`.
