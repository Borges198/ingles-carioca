#!/usr/bin/env bash
set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
project_root=$(CDPATH= cd -- "$script_dir/.." && pwd)
dist_dir="$project_root/dist"

case "$dist_dir" in
  "$project_root"/dist) ;;
  *)
    echo "Caminho de dist inválido: $dist_dir" >&2
    exit 1
    ;;
esac

rm -rf -- "$dist_dir"
mkdir -p -- "$dist_dir/data" "$dist_dir/js"

cp -- "$project_root/index.html" "$dist_dir/index.html"
cp -- "$project_root/styles.css" "$dist_dir/styles.css"
cp -- "$project_root/app.js" "$dist_dir/app.js"
cp -- "$project_root/data/phrases.js" "$dist_dir/data/phrases.js"
cp -- "$project_root/data/dialogues.js" "$dist_dir/data/dialogues.js"
cp -- "$project_root/data/lessons.js" "$dist_dir/data/lessons.js"
cp -- "$project_root/js/speech.js" "$dist_dir/js/speech.js"
cp -- "$project_root/js/storage.js" "$dist_dir/js/storage.js"
