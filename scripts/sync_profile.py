#!/usr/bin/env python3
"""Deterministic profile synchronization and integrity checker for ilias.laoukili.com.

Reads canonical facts from ../resume/data/profile.yaml (or $RESUME_PROFILE_PATH)
and generates data/profile.generated.json for the Next.js static site.

Subcommands:
    build   Regenerate data/profile.generated.json from resume/data/profile.yaml.
    check   Validate data/profile.generated.json, i18n parity, posts parity,
            zero drift against resume/data/profile.yaml (if present), and absence
            of stale domain/project references.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_RESUME_PROFILE = ROOT.parent / "resume" / "data" / "profile.yaml"
GENERATED_PATH = ROOT / "data" / "profile.generated.json"

SITE_URL = "https://ilias.laoukili.com"
RESUME_RELEASE_BASE = "https://github.com/ilias-laoukili/resume/releases/latest/download"

MONTHS = {
    "en": {
        1: "Jan.",
        2: "Feb.",
        3: "Mar.",
        4: "Apr.",
        5: "May",
        6: "Jun.",
        7: "Jul.",
        8: "Aug.",
        9: "Sep.",
        10: "Oct.",
        11: "Nov.",
        12: "Dec.",
    },
    "fr": {
        1: "Janv.",
        2: "Fév.",
        3: "Mars",
        4: "Avr.",
        5: "Mai",
        6: "Juin",
        7: "Juil.",
        8: "Août",
        9: "Sept.",
        10: "Oct.",
        11: "Nov.",
        12: "Déc.",
    },
}

PRESENT = {"en": "Present", "fr": "Présent"}

INLINE_MD_RE = re.compile(r"\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`")


def strip_inline_md(text: str) -> str:
    def repl(match: re.Match[str]) -> str:
        label, _url, bold, italic, code = match.groups()
        return label or bold or italic or code or ""

    cleaned = INLINE_MD_RE.sub(repl, text)
    return cleaned.replace(" -- ", " — ")


def format_single_date(raw: str, lang: str) -> str:
    match = re.fullmatch(r"(\d{4})(?:-(\d{2}))?", str(raw))
    if not match:
        raise ValueError(f"Invalid date: {raw}")
    year = match.group(1)
    month = int(match.group(2)) if match.group(2) else 0
    if month == 0:
        return year
    return f"{MONTHS[lang][month]} {year}"


def format_dates(dates: dict[str, Any] | None, lang: str) -> str:
    if not dates:
        return ""
    if "single" in dates:
        return format_single_date(dates["single"], lang)
    if "start_term" in dates:
        start_str = dates["start_term"][lang]
    else:
        start_str = format_single_date(dates["start"], lang)
    end_val = dates.get("end")
    end_str = PRESENT[lang] if end_val is None else format_single_date(end_val, lang)
    return f"{start_str} — {end_str}"


def pick_track_localized(node: Any, preferred_track: str = "industry") -> dict[str, Any]:
    if isinstance(node, dict) and preferred_track in node:
        node = node[preferred_track]
    elif isinstance(node, dict) and "research_academic" in node:
        node = node["research_academic"]
    return {
        "en": node["en"],
        "fr": node["fr"],
    }


def resolve_resume_path() -> Path:
    env_path = os.environ.get("RESUME_PROFILE_PATH")
    return Path(env_path).expanduser().resolve() if env_path else DEFAULT_RESUME_PROFILE


def build_payload(resume_path: Path) -> dict[str, Any]:
    try:
        import yaml
    except ImportError as exc:
        print("Error: PyYAML is required to sync from resume/data/profile.yaml.", file=sys.stderr)
        raise SystemExit(1) from exc

    with resume_path.open("r", encoding="utf-8") as handle:
        src = yaml.safe_load(handle)

    identity = src["identity"]

    def convert_bullets(node: Any, track: str = "industry") -> dict[str, list[str]]:
        loc = pick_track_localized(node, track)
        return {
            "en": [strip_inline_md(b) for b in loc["en"]],
            "fr": [strip_inline_md(b) for b in loc["fr"]],
        }

    experience = []
    for entry in src["experience"]:
        role = pick_track_localized(entry["role"], "industry")
        experience.append(
            {
                "id": entry["id"],
                "role": {"en": strip_inline_md(role["en"]), "fr": strip_inline_md(role["fr"])},
                "organization": {
                    "en": strip_inline_md(entry["organization"]["en"]),
                    "fr": strip_inline_md(entry["organization"]["fr"]),
                },
                "location": {
                    "en": entry["location"]["en"],
                    "fr": entry["location"]["fr"],
                },
                "period": {
                    "en": format_dates(entry["dates"], "en"),
                    "fr": format_dates(entry["dates"], "fr"),
                },
                "current": entry["dates"].get("end") is None,
                "bullets": convert_bullets(entry["bullets"], "industry"),
            }
        )

    education = []
    for entry in src["education"]:
        degree = pick_track_localized(entry["degree"], "industry")
        education.append(
            {
                "id": entry["id"],
                "institution": {
                    "en": entry["institution"]["en"],
                    "fr": entry["institution"]["fr"],
                },
                "location": {
                    "en": entry["location"]["en"],
                    "fr": entry["location"]["fr"],
                },
                "degree": {
                    "en": strip_inline_md(degree["en"]),
                    "fr": strip_inline_md(degree["fr"]),
                },
                "period": {
                    "en": format_dates(entry["dates"], "en"),
                    "fr": format_dates(entry["dates"], "fr"),
                },
                "current": entry["dates"].get("end") is None,
                "bullets": convert_bullets(entry["bullets"], "industry"),
            }
        )

    activities = []
    for entry in src.get("activities", []):
        activities.append(
            {
                "id": entry["id"],
                "role": {"en": entry["role"]["en"], "fr": entry["role"]["fr"]},
                "organization": {
                    "en": entry["organization"]["en"],
                    "fr": entry["organization"]["fr"],
                },
                "location": {"en": entry["location"]["en"], "fr": entry["location"]["fr"]},
                "period": {
                    "en": format_dates(entry["dates"], "en"),
                    "fr": format_dates(entry["dates"], "fr"),
                },
                "bullets": convert_bullets(entry["bullets"], "industry"),
            }
        )

    # Combine industry & academic technical skill rows cleanly for the portfolio
    skills = []
    for group in src["skills"]["industry"]:
        skills.append(
            {
                "label": {"en": group["label"]["en"], "fr": group["label"]["fr"]},
                "items": {
                    "en": strip_inline_md(group["items"]["en"]),
                    "fr": strip_inline_md(group["items"]["fr"]),
                },
            }
        )

    return {
        "siteUrl": SITE_URL,
        "identity": {
            "name": identity["name"],
            # Obfuscated char codes (XOR 42) so static HTML/JSON exposes no raw email to scrapers
            "emailCodes": [ord(ch) ^ 42 for ch in identity["emails"]["industry"]],
            "location": identity["location"],
            "github": identity["links"]["github"]["url"],
            "linkedin": identity["links"]["linkedin"]["url"],
        },
        "cvDownloads": {
            "industry": {
                "en": f"{RESUME_RELEASE_BASE}/cv_industry_en.pdf",
                "fr": f"{RESUME_RELEASE_BASE}/cv_industry_fr.pdf",
            },
            "academic": {
                "en": f"{RESUME_RELEASE_BASE}/cv_research_academic_en.pdf",
                "fr": f"{RESUME_RELEASE_BASE}/cv_research_academic_fr.pdf",
            },
        },
        "summary": {
            "en": strip_inline_md(src["summary"]["industry"]["en"]),
            "fr": strip_inline_md(src["summary"]["industry"]["fr"]),
        },
        "experience": experience,
        "education": education,
        "activities": activities,
        "skills": skills,
    }


def serialize(payload: dict[str, Any]) -> str:
    return json.dumps(payload, indent=2, ensure_ascii=False) + "\n"


def cmd_build() -> int:
    resume_path = resolve_resume_path()
    if not resume_path.exists():
        print(f"sync error: resume profile not found at {resume_path}", file=sys.stderr)
        return 1
    payload = build_payload(resume_path)
    GENERATED_PATH.parent.mkdir(parents=True, exist_ok=True)
    GENERATED_PATH.write_text(serialize(payload), encoding="utf-8")
    print(f"wrote {GENERATED_PATH.relative_to(ROOT)} from {resume_path}")
    return 0


def flatten_keys(obj: Any, prefix: str = "") -> set[str]:
    keys: set[str] = set()
    if isinstance(obj, dict):
        for k, v in obj.items():
            full = f"{prefix}.{k}" if prefix else k
            if isinstance(v, dict):
                keys.update(flatten_keys(v, full))
            else:
                keys.add(full)
    return keys


def cmd_check() -> int:
    errors: list[str] = []

    if not GENERATED_PATH.exists():
        print(f"check error: missing {GENERATED_PATH.relative_to(ROOT)}", file=sys.stderr)
        return 1

    current_text = GENERATED_PATH.read_text(encoding="utf-8")
    current_data = json.loads(current_text)

    # 1. Zero-drift check against sibling ../resume/data/profile.yaml when present locally
    resume_path = resolve_resume_path()
    if resume_path.exists():
        expected_one = serialize(build_payload(resume_path))
        expected_two = serialize(build_payload(resume_path))
        if expected_one != expected_two:
            errors.append("determinism error: sync_profile output differed across two runs.")
        elif current_text != expected_one:
            errors.append(
                "drift error: data/profile.generated.json is out of sync with "
                f"{resume_path}. Run: python3 scripts/sync_profile.py build"
            )

    # 2. Check CNAME matches siteUrl
    cname_path = ROOT / "public" / "CNAME"
    expected_host = current_data.get("siteUrl", "").replace("https://", "").rstrip("/")
    if not cname_path.exists() or cname_path.read_text(encoding="utf-8").strip() != expected_host:
        errors.append(f"public/CNAME must equal '{expected_host}'.")

    # 3. Check EN/FR messages parity and no extra locales
    messages_dir = ROOT / "messages"
    msg_files = sorted(p.name for p in messages_dir.glob("*.json"))
    if msg_files != ["en.json", "fr.json"]:
        errors.append(f"messages/ must contain only en.json and fr.json (found: {msg_files}).")
    else:
        en_keys = flatten_keys(json.loads((messages_dir / "en.json").read_text(encoding="utf-8")))
        fr_keys = flatten_keys(json.loads((messages_dir / "fr.json").read_text(encoding="utf-8")))
        if en_keys != fr_keys:
            errors.append(
                f"messages EN/FR key mismatch: only_en={sorted(en_keys - fr_keys)}, "
                f"only_fr={sorted(fr_keys - en_keys)}"
            )

    # 4. Check _posts EN/FR parity and no extra locale dirs
    posts_dir = ROOT / "_posts"
    post_dirs = sorted(p.name for p in posts_dir.iterdir() if p.is_dir())
    if post_dirs != ["en", "fr"]:
        errors.append(f"_posts/ must contain only en/ and fr/ (found: {post_dirs}).")
    else:
        en_posts = sorted(p.name for p in (posts_dir / "en").glob("*.md"))
        fr_posts = sorted(p.name for p in (posts_dir / "fr").glob("*.md"))
        if en_posts != fr_posts:
            errors.append(f"_posts EN/FR mismatch: en={en_posts}, fr={fr_posts}")

    # 5. Scan tracked content/config files for stale references or exposed emails
    stale_tokens = ("ilias-laoukili.github.io", "synth-graph-rs", "940/990", "proton.me", "ulaval.ca")
    scan_paths = [
        ROOT / "app" / "layout.tsx",
        ROOT / "app" / "[locale]" / "blog" / "page.tsx",
        ROOT / "app" / "[locale]" / "blog" / "[slug]" / "page.tsx",
        ROOT / "constants" / "data.ts",
        ROOT / "public" / "robots.txt",
        ROOT / "public" / "sitemap.xml",
        GENERATED_PATH,
        ROOT / "messages" / "en.json",
        ROOT / "messages" / "fr.json",
    ]
    for p in scan_paths:
        if not p.exists():
            continue
        text = p.read_text(encoding="utf-8")
        for token in stale_tokens:
            if token in text:
                errors.append(f"{p.relative_to(ROOT)}: contains stale reference '{token}'.")

    if errors:
        for err in errors:
            print(f"check error: {err}", file=sys.stderr)
        return 1

    source_note = f"synced with {resume_path.name}" if resume_path.exists() else "standalone CI check"
    print(f"ok: portfolio data, EN/FR parity, SEO domain, and sync checks passed ({source_note}).")
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Synchronize and validate portfolio data.")
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("build", help="Regenerate data/profile.generated.json from resume/data/profile.yaml.")
    sub.add_parser("check", help="Validate sync, EN/FR parity, and SEO references.")
    args = parser.parse_args(argv)
    if args.command == "build":
        return cmd_build()
    if args.command == "check":
        return cmd_check()
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
