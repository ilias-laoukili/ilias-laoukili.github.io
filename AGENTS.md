# Instructions for agents

How an agent working in this repository must behave, and what it must check before starting.

## Before starting

- Read `data/profile.generated.json` and `messages/en.json` / `messages/fr.json`.
- Never edit `data/profile.generated.json` by hand: it is deterministically generated from `../resume/data/profile.yaml` via `python3 scripts/sync_profile.py build`.
- Find what the author changed by hand and never overwrite it.
- Check that the pre-commit checks are active: `git config core.hooksPath` returns `.githooks`.
- Check that the starting point is sound:
  - `python3 scripts/sync_profile.py check` passes;
  - `npm run lint` passes.

## How to behave

### With the author

- Answer in French: the verdict first, in simple words, with simple questions.
- Unsolicited advice is allowed; the author keeps the right to set it aside.
- Before changing substantive portfolio wording or design direction, show the proposal and wait for approval.

### Single source of truth and synchronization

- Canonical facts (dates, roles, organizations, emails, CV download links, skills, TOEIC score) originate in `../resume/data/profile.yaml`.
- Whenever `../resume/data/profile.yaml` changes, run `python3 scripts/sync_profile.py build` to regenerate `data/profile.generated.json`.
- This repository maintains **two locales only**: `en` and `fr`. Keep `messages/en.json` and `messages/fr.json` in exact key parity, and keep `_posts/en/` and `_posts/fr/` in exact file parity.
- Keep the canonical domain `https://ilias.laoukili.com` consistent across `public/CNAME`, `app/layout.tsx`, blog metadata, `public/robots.txt`, and `public/sitemap.xml`.

### Design principles (Ollama x NASA)

- Preserve the pared-down visual identity: clean light default with discrete dark mode toggle, crisp `1px` grid/dividers, monospace technical metadata (`JetBrains Mono`), and high typographic clarity.
- Do not reintroduce heavy 3D shaders (`three`), neon/Matrix effects, floating duplicate navbars, or generic marketing CTA blocks.
- Keep the hidden Konami-code Easter egg (`components/Terminal/`) intact and unobtrusive.

### Content accuracy and confidentiality

- Use direct, verifiable, plain language. Never inflate titles or invent metrics.
- For public-sector roles (such as the Ministère de la Cybersécurité et du Numérique), describe only public, non-confidential scope and responsibilities; never include internal project names, systems, tools, or data.

### Repository and git discipline

- Create no file, in particular no `.md` file, without being asked.
- Never delete with `rm`: move what is replaced to the macOS Trash (`/usr/bin/trash`).
- Do not commit without being asked.
- The agent is at no point a contributor and never presents itself as one: no author, co-author, or contributor mention of the agent in a commit message (no `Co-Authored-By` line), a pull request, a document, the code, or anywhere else.
- Never rewrite a commit: no `amend`, no `rebase`, no `force push`.
- Never bypass the pre-commit checks (no `--no-verify`).
- Generated files (`data/profile.generated.json`) must come out byte-identical when nothing changed.

## Before handing back

- Run `python3 scripts/sync_profile.py check`.
- Run `npm run lint`.
- Run `npm run build` and verify the static export in `out/`.
- State clearly what was checked and what was not.
