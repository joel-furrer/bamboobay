{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "bamboobay-dev";

  buildInputs = with pkgs; [
    bun

    nodejs_20

    git

    curl
    jq
    ripgrep
    fd
  ];

  shellHook = ''
    echo ""
    echo "  BambooBay Dev Shell"
    echo "  -------------------"
    echo "  Bun:    $(bun --version)"
    echo "  Node:   $(node --version)"
    echo ""
    echo "  Befehle:"
    echo "    bun install     - Abhängigkeiten installieren"
    echo "    bun run dev     - Entwicklungsserver starten"
    echo "    bun run build   - Produktions-Build erstellen"
    echo "    bun run preview - Build lokal vorschauen"
    echo ""
  '';

  NODE_ENV = "development";
}
