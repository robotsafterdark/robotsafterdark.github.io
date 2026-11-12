# Robots After Dark.exe
A free, static personal website inspired by old-school homepages and Windows 98.

## Preview
Open `index.html` through a local web server (the content JSON is fetched over HTTP). With Python installed, run `python -m http.server 8000` from this folder, then open `http://localhost:8000`.

## Publish on GitHub Pages
1. Create a free GitHub account and a **public** repository named `robots-after-dark` (or another name).
2. Upload all files **including `.pages.yml`** to the repository root. GitHub's web uploader may hide dotfiles on some systems; verify `.pages.yml` is present.
3. In repository **Settings → Pages**, select **Deploy from a branch**, branch `main`, folder `/ (root)`, and Save.
4. Your site will be at `https://YOUR-USERNAME.github.io/robots-after-dark/` after publishing. Keep the repository public on the free GitHub Pages plan.

## Edit with Pages CMS
1. Visit https://pagescms.org/ and sign in with GitHub.
2. Select your website repository and branch `main`.
3. Edit **Website content**. Add journal entries or items to the other folders, then save.
4. The website updates automatically after GitHub Pages rebuilds it.

## Notes
- All site text lives in `content/site.json`. Images can be added under `assets/uploads/` and linked as `assets/uploads/filename.jpg` in entries.
- This starter stores each section's entries together in one JSON file; later we can move to separate Markdown posts for easier long-form editing.
- The desktop icons, windows, Start menu and robot work without external dependencies.
- The wallpaper is an original generated image, adapted to a low-resolution retro style.
- A custom domain is optional; the free `github.io` subdomain has no fixed expiration while the service and account remain available.
