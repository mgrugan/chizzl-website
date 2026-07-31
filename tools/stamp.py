#!/usr/bin/env python3
"""Stamp a content hash onto the CSS/JS URLs in index.html.

GitHub Pages serves everything with cache-control: max-age=600 and the header
cannot be configured, so a visitor returning inside that window can load fresh
HTML against a stale stylesheet and get a broken hybrid page.

The version is derived from the asset bytes themselves, which means:

  * it only changes when the assets actually change, so caches are not
    needlessly busted on every deploy, and
  * it is baked into the committed HTML, so it survives whichever builder
    publishes the site. This repo currently has both the Pages Actions
    workflow and GitHub's legacy branch builder responding to pushes, and
    the legacy one serves the repo verbatim.

Run after editing any stamped asset:

    python3 tools/stamp.py

Exits non-zero if index.html still contains an unstamped '?v=dev'.
"""

from __future__ import annotations

import hashlib
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = ROOT / "index.html"

# Order matters — the digest must be stable across runs.
ASSETS = [
    "assets/css/fonts.css",
    "assets/css/styles.css",
    "assets/js/main.js",
]


def digest() -> str:
    h = hashlib.sha256()
    for rel in ASSETS:
        path = ROOT / rel
        if not path.exists():
            sys.exit(f"stamp: missing asset {rel}")
        h.update(rel.encode())
        h.update(path.read_bytes())
    return h.hexdigest()[:10]


def main() -> int:
    version = digest()
    html = HTML.read_text()

    stamped, total = html, 0
    for rel in ASSETS:
        # Match the asset with or without an existing ?v=... suffix
        pattern = re.compile(re.escape(rel) + r'(\?v=[A-Za-z0-9]+)?(?=")')
        stamped, n = pattern.subn(f"{rel}?v={version}", stamped)
        total += n
        if n == 0:
            print(f"stamp: warning — {rel} not referenced in index.html")

    if "?v=dev" in stamped:
        sys.exit("stamp: an unstamped ?v=dev remains in index.html")

    changed = stamped != html
    if changed:
        HTML.write_text(stamped)

    print(f"stamp: version {version} applied to {total} reference(s)"
          f"{'' if changed else ' (already current)'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
