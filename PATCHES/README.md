This directory contains a small patch to reapply the TracksDesktop ScrollTrigger cleanup fix.

Why: If you pull `main` (or reset your branch) the local edit to `app/components/tracks/TracksDesktop.jsx` may be lost. This patch contains the minimal replacement to avoid killing all ScrollTrigger instances.

How to reapply after pulling main:

1. Create a short-lived branch (optional but recommended):

```bash
git checkout -b fix/tracks-scrolltrigger-cleanup
```

2. Apply the patch from this directory (from repository root):

```bash
git apply PATCHES/0001-tracks-scrolltrigger-cleanup.patch
```

3. Verify the file change:

```bash
git add -p app/components/tracks/TracksDesktop.jsx
git commit -m "fix(tracks): avoid killing all ScrollTrigger instances; only kill local triggers"
```

4. Push or merge as needed.

Notes:

- The patch replaces the global `ScrollTrigger.getAll().forEach(trigger => trigger.kill())` cleanup with a per-component cleanup that kills only triggers created by `TracksDesktop`.
- If `git apply` fails due to context mismatches, you can open `PATCHES/0001-tracks-scrolltrigger-cleanup.patch` and apply the small change manually (search for `ScrollTrigger.getAll().forEach` and replace with the `createdTriggers.forEach` snippet).
