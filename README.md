# Fireside Library

Baha'i educational firesides and the website that publishes them.

- `content/` — fireside briefs, analysis, and drafts (`content/firesides/`)
- `web/` — the publishing website (Astro)

See `CLAUDE.md` for repository structure and routing.

## Research material (encrypted)

Per-fireside source material under `content/firesides/*/research/` (PDFs,
transcripts, quote dumps) is third-party copyrighted material and is encrypted
with [git-crypt](https://github.com/AGWA/git-crypt). Everything else in the repo
is plaintext.

These files are committed as ciphertext and are not readable without the
symmetric key. Maintainers with the key decrypt a clone once:

```sh
# install git-crypt (macOS)
brew install git-crypt

# unlock a fresh clone (run once per clone/machine)
git-crypt unlock ~/.config/git-crypt/fireside-library.key
```

After unlocking, encryption and decryption are automatic — files added to any
`research/` folder are encrypted on commit and readable in the working tree.

The key lives only in the maintainer's password manager and at
`~/.config/git-crypt/fireside-library.key`. It is never committed. **Without it,
the research material is unrecoverable** — back it up.
