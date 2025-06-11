#!/bin/bash

COMPONENT_NAME=$1

if [ -z "$COMPONENT_NAME" ]; then
  echo "Usage: ./copy_component.sh <ComponentName>"
  exit 1
fi

SOURCE_FILE="apps/ladle/components/ui/${COMPONENT_NAME}.tsx"
DEST_DIR="packages/registry/registry/default/ui"
DEST_FILE="${DEST_DIR}/${COMPONENT_NAME}.tsx"

if [ ! -f "$SOURCE_FILE" ]; then
  echo "Error: Component '$COMPONENT_NAME' not found at '$SOURCE_FILE'"
  exit 1
fi

mkdir -p "$DEST_DIR"

cp "$SOURCE_FILE" "$DEST_FILE"

echo "Successfully copied '$SOURCE_FILE' to '$DEST_FILE'" 