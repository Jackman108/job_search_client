"""Regenerate valid public/*.png and favicon.ico (PNG signatures corrupted by gitattributes)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

PUB = Path(__file__).resolve().parents[1] / "public"
BAK = PUB / "_corrupt_backup_2026-11-05"
SZ = 48  # crisp when shown at ~24 CSS px


def backup_once() -> None:
    BAK.mkdir(exist_ok=True)
    for name in (
        "run.png",
        "update.png",
        "profile.png",
        "resume.png",
        "subscribe.png",
        "pen.png",
        "favicon.ico",
    ):
        src = PUB / name
        dst = BAK / name
        if src.exists() and not dst.exists():
            dst.write_bytes(src.read_bytes())


def save_png(path: Path, img: Image.Image) -> None:
    img.save(path, format="PNG", optimize=True)
    data = path.read_bytes()
    assert data[:8] == b"\x89PNG\r\n\x1a\n", f"bad sig {path}: {data[:8]!r}"
    Image.open(path).verify()
    print(f"OK {path.name} {path.stat().st_size}B sig={data[:8].hex(' ')}")


def plate(size: int, bg: tuple[int, int, int, int], draw_fn) -> Image.Image:
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([1, 1, size - 2, size - 2], radius=size // 5, fill=bg)
    draw_fn(d, size)
    return im


def draw_run(d: ImageDraw.ImageDraw, s: int) -> None:
    d.polygon(
        [(s * 0.38, s * 0.28), (s * 0.38, s * 0.72), (s * 0.78, s * 0.5)],
        fill=(255, 255, 255, 255),
    )


def draw_update(d: ImageDraw.ImageDraw, s: int) -> None:
    d.arc(
        [int(s * 0.2), int(s * 0.2), int(s * 0.8), int(s * 0.8)],
        45,
        250,
        fill=(255, 255, 255, 255),
        width=max(3, s // 9),
    )
    d.polygon(
        [
            (int(s * 0.72), int(s * 0.22)),
            (int(s * 0.88), int(s * 0.38)),
            (int(s * 0.62), int(s * 0.40)),
        ],
        fill=(255, 255, 255, 255),
    )
    d.polygon(
        [
            (int(s * 0.28), int(s * 0.78)),
            (int(s * 0.12), int(s * 0.62)),
            (int(s * 0.38), int(s * 0.60)),
        ],
        fill=(255, 255, 255, 255),
    )


def draw_profile(d: ImageDraw.ImageDraw, s: int) -> None:
    d.ellipse([s * 0.34, s * 0.18, s * 0.66, s * 0.48], fill=(255, 255, 255, 255))
    d.ellipse([s * 0.22, s * 0.52, s * 0.78, s * 0.98], fill=(255, 255, 255, 255))


def draw_resume(d: ImageDraw.ImageDraw, s: int) -> None:
    d.rounded_rectangle(
        [s * 0.28, s * 0.16, s * 0.72, s * 0.84], radius=3, fill=(255, 255, 255, 255)
    )
    ink = (63, 81, 181, 255)
    for i, y in enumerate([0.30, 0.42, 0.54, 0.66]):
        right = 0.64 if i < 3 else 0.52
        d.rectangle([s * 0.36, s * y, s * right, s * (y + 0.04)], fill=ink)


def draw_subscribe(d: ImageDraw.ImageDraw, s: int) -> None:
    d.ellipse([s * 0.32, s * 0.22, s * 0.68, s * 0.58], fill=(255, 255, 255, 255))
    d.polygon(
        [
            (s * 0.22, s * 0.55),
            (s * 0.78, s * 0.55),
            (s * 0.70, s * 0.70),
            (s * 0.30, s * 0.70),
        ],
        fill=(255, 255, 255, 255),
    )
    d.rectangle([s * 0.28, s * 0.68, s * 0.72, s * 0.74], fill=(255, 255, 255, 255))
    d.ellipse([s * 0.44, s * 0.74, s * 0.56, s * 0.86], fill=(255, 255, 255, 255))


def draw_pen(d: ImageDraw.ImageDraw, s: int) -> None:
    d.polygon(
        [
            (s * 0.30, s * 0.70),
            (s * 0.38, s * 0.78),
            (s * 0.78, s * 0.38),
            (s * 0.70, s * 0.30),
        ],
        fill=(255, 255, 255, 255),
    )
    d.polygon(
        [(s * 0.70, s * 0.30), (s * 0.78, s * 0.38), (s * 0.86, s * 0.22)],
        fill=(255, 235, 59, 255),
    )
    d.polygon(
        [(s * 0.22, s * 0.86), (s * 0.30, s * 0.70), (s * 0.38, s * 0.78)],
        fill=(33, 33, 33, 255),
    )


def main() -> None:
    backup_once()
    specs = [
        ("run.png", (46, 125, 50, 255), draw_run),
        ("update.png", (33, 150, 243, 255), draw_update),
        ("profile.png", (121, 85, 72, 255), draw_profile),
        ("resume.png", (63, 81, 181, 255), draw_resume),
        ("subscribe.png", (255, 152, 0, 255), draw_subscribe),
        ("pen.png", (156, 39, 176, 255), draw_pen),
    ]
    for name, bg, fn in specs:
        save_png(PUB / name, plate(SZ, bg, fn))

    fav = plate(64, (46, 125, 50, 255), draw_run)
    ico_path = PUB / "favicon.ico"
    fav.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    ico = ico_path.read_bytes()
    assert ico[:4] == b"\x00\x00\x01\x00", ico[:4]
    print(f"OK favicon.ico {ico_path.stat().st_size}B head={ico[:8].hex(' ')}")

    for name, size in (("logo192.png", 192), ("logo512.png", 512)):
        save_png(PUB / name, plate(size, (46, 125, 50, 255), draw_run))

    print("DONE")


if __name__ == "__main__":
    main()
