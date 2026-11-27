## Why I built manis

Checking a running Ubuntu server against CIS Benchmarks is already a solved problem: Canonical's USG, OpenSCAP, and Lynis do that well. The case that felt awkward to automate cleanly in CI was different: auditing an extracted rootfs or mounted Linux image **before it boots**, without root privileges, without installing OpenSCAP or Python inside the pipeline, and failing the build if a hardening control regresses between two image builds.

`manis` (`v1.0.0`) is a single static Rust binary (~1.9 MB stripped, `#![forbid(unsafe_code)]`) built around that workflow. It never shells out to `dpkg`, `systemctl`, `ufw`, or `findmnt`. Instead, it reads system state directly through files (`/etc`, `/var/lib/dpkg/status`, `/proc`, `/sys`, `/boot`) behind a `SystemView` abstraction.

## Offline confinement matters

The main trap when writing a `--root <dir>` auditor is symbolic links. Standard Linux images are full of absolute symlinks (`/etc/resolv.conf -> /run/systemd/resolve/...`, `/etc/mtab -> /proc/self/mounts`, drop-in files under `/etc/apt/sources.list.d/` or `/etc/ssh/sshd_config.d/`). A naive `root.join(path)` lets an absolute symlink escape the image and read the CI runner's own `/etc/passwd` or `/etc/ssh/sshd_config`, silently turning a broken image into a false `PASS`.

In `manis`, `--root` resolves every path component by component inside the target rootfs:

- absolute symlink targets are re-anchored inside `<root>`;
- `..` stops at the virtual root, as in a `chroot`;
- symlink chains deeper than 40 hops return an explicit error instead of looping;
- drop-in directories follow symlinked files inside the confined root rather than skipping them silently;
- `.manis-meta.toml` (used in test fixtures to simulate UIDs and SUID bits on macOS or git checkouts) is strictly opt-in (`--fixture-meta`) so an untrusted image can never forge its own permissions.

## Profiles and CI drift gates

All 103 rules are declarative TOML files embedded in the binary and evaluated by 14 Rust primitives. They map to **CIS Ubuntu 24.04 LTS**, **ANSSI-BP-028 v2.0**, and **NIST SP 800-53**:

| Profile | Rules | Target |
|---|---:|---|
| `cis-l1-server` (default) | 93 | Debian family (Ubuntu 24.04, Debian 12/13) |
| `anssi-minimal` / `intermediary` / `reinforced` | 36 / 95 / 101 | ANSSI-BP-028 v2.0 levels |
| `linux-generic` | 73 | Any Linux rootfs (no `dpkg`, APT, UFW, AppArmor, or Debian PAM) |
| `all` | 103 | All automated rules + 3 `MANUAL` controls |

Typical CI usage against an exported rootfs:

```bash
manis audit --root /mnt/image --format json --output current.json
manis audit --root /mnt/image --format sarif --output manis.sarif
manis diff baseline.json current.json
```

`manis diff` exits non-zero on any regression (`PASS -> FAIL`), while GitHub Code Scanning ingests the SARIF 2.1.0 report directly. Every push is tested in CI on Ubuntu 24.04, Debian 12 (`bookworm`), Debian 13 (`trixie`), Alpine 3, and Rocky Linux 9, plus MSRV verification on Rust 1.85.

## What manis is not

- It does not replace OpenSCAP or Canonical USG when an auditor requires formal XCCDF/OVAL reports or full live-server coverage.
- Offline images do not have a live `/proc/sys` or `/proc/mounts`: those controls report `WARN`, never a silent `PASS`.
- CIS section numbers follow the Ubuntu 24.04 benchmark; on Debian they apply by equivalence without claiming an official CIS Debian mapping.
