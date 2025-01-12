export function generateSpacing() {
  const result = {};
  for (let i = 0.5; i <= 50; i += 0.5) {
    result[i] = `${i * 13}px`;
  }
  return { 0: "0px", ...result };
}

const customSpacing = generateSpacing();

export function mapToCustomSpacing(defaultPxValue: number) {
  const spacingValues = Object.keys(customSpacing).map(Number);
  const customPxValues = Object.values(customSpacing).map((v) => parseFloat(v)); // Extract pixel values as numbers

  // Find the closest spacing
  let closestSpacing = spacingValues[0];
  let minDiff = Math.abs(defaultPxValue - customPxValues[0]);

  for (let i = 1; i < spacingValues.length; i++) {
    const diff = Math.abs(defaultPxValue - customPxValues[i]);
    if (diff < minDiff) {
      closestSpacing = spacingValues[i];
      minDiff = diff;
    }
  }

  return closestSpacing;
}



export function replaceSpacingClass(className: string) {
  // Updated regex to include 'h-' and 'w-' prefixes
  const spacingClassRegex = /\b(m|p|mt|mb|mr|ml|mx|my|pt|pb|pr|pl|px|py|gap|space-x|space-y|h|w)-((?:\d+\.)?\d+|auto)\b/g;

  return className.replace(spacingClassRegex, (match, prefix, value) => {
    // Handle 'auto' value
    if (value === "auto") {
      return `${prefix}-auto`;
    }

    const defaultPxValue = parseFloat(value) * 4; // Tailwind default spacing (multiplied by 4px)
    const closestSpacing = mapToCustomSpacing(defaultPxValue);
    return `${prefix}-${closestSpacing}`;
  });
}

// Function to extract Tailwind spacing classes from TSX content
export function extractSpacingClasses(tsxContent) {
  const spacingClasses = new Set(); // Use Set to avoid duplicates

  // Updated regex to match Tailwind spacing classes like m-4, mt-6, h-8, w-12, etc.
  const spacingClassRegex =
    /\b(m|p|mt|mb|mr|ml|mx|my|pt|pb|pr|pl|px|py|gap|space-x|space-y|h|w)-((?:\d+\.)?\d+|auto)\b/g;

  const matches = tsxContent.matchAll(spacingClassRegex);
  for (const match of matches) {
    spacingClasses.add(match[0]); // Add the full class (e.g., 'm-4', 'mt-2', 'h-8')
  }

  return Array.from(spacingClasses); // Convert Set to array
}
