import { Command } from "commander";
import fs from "fs";
import path from "path";
import { glob } from "glob";

function generateSpacing() {
    const result: Record<number, string> = {};
    for (let i = 0.5; i <= 50; i += 0.5) {
        result[i] = `${i * 13}px`;
    }
    return { 0: "0px", ...result };
}

const customSpacing = generateSpacing();

function mapToCustomSpacing(defaultPxValue: number) {
    const spacingValues = Object.keys(customSpacing).map(Number);
    const customPxValues = Object.values(customSpacing).map((v) => parseFloat(v as string));

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

function replaceSpacingClass(className: string) {
    const spacingClassRegex = /\b(m|p|mt|mb|mr|ml|mx|my|pt|pb|pr|pl|px|py|gap|space-x|space-y|h|w)-((?:\d+\.)?\d+|auto)\b/g;

    return className.replace(spacingClassRegex, (match, prefix, value) => {
        if (value === "auto") {
            return `${prefix}-auto`;
        }

        const defaultPxValue = parseFloat(value) * 4;
        const closestSpacing = mapToCustomSpacing(defaultPxValue);
        return `${prefix}-${closestSpacing}`;
    });
}

function extractSpacingClasses(tsxContent: string) {
    const spacingClasses = new Set<string>();
    const spacingClassRegex = /\b(m|p|mt|mb|mr|ml|mx|my|pt|pb|pr|pl|px|py|gap|space-x|space-y|h|w)-((?:\d+\.)?\d+|auto)\b/g;

    const matches = tsxContent.matchAll(spacingClassRegex);
    for (const match of matches) {
        spacingClasses.add(match[0]);
    }

    return Array.from(spacingClasses);
}

export function registerSpacingCommand(program: Command) {
    program
        .command("spacing")
        .description("Translate tailwind spacing from 4px to 13px")
        .option(
            "-d, --dir <directory>",
            "Specify directory to scan for TSX files. Defaults to current directory.",
            "."
        )
        .action(async (options) => {
            const directory = path.resolve(options.dir);
            console.log(`Scanning directory: ${directory}`);

            try {
                const tsxFiles = await glob(`${directory}/**/*.tsx`);

                for (const filePath of tsxFiles) {
                    let tsxContent = await fs.promises.readFile(filePath, "utf-8");
                    const extractedClasses = extractSpacingClasses(tsxContent);

                    if (extractedClasses.length > 0) {
                        for (const className of extractedClasses) {
                            const updatedClass = replaceSpacingClass(className);
                            tsxContent = tsxContent.replace(className, updatedClass);
                        }

                        await fs.promises.writeFile(filePath, tsxContent, "utf-8");
                        console.log(`Updated spacing classes in ${filePath}`);
                    }
                }

                console.log("Spacing class update complete!");
            } catch (error: any) {
                console.error("Error:", error.message);
            }
        });
}
