## Pourquoi j'ai écrit manis

Vérifier un serveur Ubuntu qui tourne déjà face au benchmark CIS est un problème largement couvert : USG (Canonical), OpenSCAP et Lynis le font très bien. Le cas qui restait pénible à automatiser proprement en CI était différent : auditer une image ou un rootfs Linux **avant qu'il ne démarre**, sans droits root, sans installer OpenSCAP ni Python dans le pipeline, et bloquer le build dès qu'un contrôle régresse entre deux versions d'image.

`manis` (`v1.0.0`) est né en janvier 2026 d'une série de scripts shell vérifiant des contrôles ANSSI-BP-028 sous Linux, avant d'évoluer vers un binaire Rust statique unique (~1,9 Mo strippé, `#![forbid(unsafe_code)]`) conçu pour ce besoin précis. Il ne lance aucun sous-processus (`dpkg`, `systemctl`, `ufw` ou `findmnt` ne sont jamais appelés). Toute l'inspection passe par des lectures de fichiers derrière une abstraction `SystemView`.

## Le piège des liens symboliques en `--root`

Le premier écueil d'un audit hors ligne (`--root <dir>`), ce sont les liens symboliques. N'importe quelle image Debian ou Ubuntu contient des liens absolus (`/etc/resolv.conf -> /run/systemd/resolve/...`, `/etc/mtab -> /proc/self/mounts`, ou des fichiers drop-in dans `/etc/apt/sources.list.d/` et `/etc/ssh/sshd_config.d/`). Un simple `root.join(path)` suit le lien sur la machine hôte, lit la configuration du runner CI au lieu de l'image, et renvoie un faux `PASS` silencieux.

Dans `manis`, le mode `--root` résout chaque chemin composant par composant à l'intérieur de la racine cible :

- les cibles de liens absolus sont réancrées dans `<root>` ;
- `..` s'arrête à la racine virtuelle, comme dans un `chroot` ;
- au-delà de 40 liens chaînés, le moteur renvoie une erreur explicite sans boucler ;
- les répertoires drop-in suivent bien les fichiers en lien symbolique confinés au lieu de les ignorer ;
- `.manis-meta.toml` (qui sert à simuler des UID ou bits SUID dans les fixtures de test) n'est jamais lu par défaut : il exige le flag explicite `--fixture-meta`, pour qu'une image non fiable ne puisse pas falsifier ses propres permissions.

## Profils et contrôle de dérive en CI

Les 103 règles sont décrites en TOML, embarquées dans le binaire et évaluées par 14 primitives Rust, avec correspondances **CIS Ubuntu 24.04**, **ANSSI-BP-028 v2.0** et **NIST SP 800-53** :

| Profil | Règles | Cible |
|---|---:|---|
| `cis-l1-server` (défaut) | 93 | Famille Debian (Ubuntu 24.04, Debian 12/13) |
| `anssi-minimal` / `intermediary` / `reinforced` | 36 / 95 / 101 | Niveaux ANSSI-BP-028 v2.0 |
| `linux-generic` | 73 | Tout rootfs Linux (sans `dpkg`, APT, UFW, AppArmor ni PAM Debian) |
| `all` | 103 | Toutes les règles automatisées + 3 contrôles `MANUAL` |

Usage typique en CI sur un rootfs exporté :

```bash
manis audit --root /mnt/image --format json --output current.json
manis audit --root /mnt/image --format sarif --output manis.sarif
manis diff baseline.json current.json
```

`manis diff` retourne un code non nul dès qu'une règle régresse (`PASS -> FAIL`), et le rapport SARIF 2.1.0 s'intègre directement dans GitHub Code Scanning. La CI vérifie le binaire statique `musl` sur Ubuntu 24.04, Debian 12 (`bookworm`), Debian 13 (`trixie`), Alpine 3 et Rocky Linux 9, ainsi que la compatibilité MSRV sur Rust 1.85.

## Limites assumées

- `manis` ne remplace pas OpenSCAP ni Canonical USG lorsqu'un auditeur exige un rapport XCCDF/OVAL formel sur un serveur en production.
- Une image hors ligne n'a ni `/proc/sys` ni `/proc/mounts` : ces contrôles sortent en `WARN`, jamais en `PASS`.
- Les références CIS suivent le benchmark Ubuntu 24.04 ; sur Debian, les contrôles s'appliquent par équivalence sans revendiquer un mapping CIS Debian officiel.
