# Robots After Dark — minimalist edition (v2)

This replaces the old desktop interface with two writing sections and an archive. There are **no placeholder posts**.

## Publish

1. Keep a copy of your existing GitHub repository if you want the old design/content later.
2. Open https://github.com/robotsafterdark/robotsafterdark.github.io
3. Upload the contents of this folder into the repository root (not the folder or ZIP itself). Replace files with matching names, especially `index.html`, `style.css`, `script.js`, and `.pages.yml`. Add `earth.html`, `archive.html`, and `content/posts.json`.
4. Important: old `content/site.json` is unused. You may leave it in GitHub for backup; it will not show on the new website. The old `assets/shoreline.webp` is also unused.
5. Wait for GitHub Pages to deploy and refresh the website.

## Publishing new entries

Open https://app.pagescms.org, choose this repository and open **Posts**. Add an item to **All posts**. Give each post a unique short ID (e.g. `2026-11-first-note`), choose **Elsewhere** or **Life on Earth**, add date, headline and body. Tags are comma-separated: `Books, Games`. Save. The website will update after GitHub Pages deploys.

Images: upload to `assets/uploads/` using GitHub or Pages CMS media library, then put the image path `/assets/uploads/filename.jpg` into the Image path field. For best results, use small web-friendly JPG/WEBP files.

The Archive is automatically generated from both sections. The section pages display newest posts first. Tags can be filtered and posts searched.

## Note

This update intentionally replaces the previous placeholder content and layout, but does not delete the original content file from the repository. GitHub commit history retains earlier versions.
