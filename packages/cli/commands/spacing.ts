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

function updateSpacingInContent(content: string) {
    let hasChanges = false;
    const spacingClassRegex = /(^|[\s"'])((?:[^"'\s]*:)?)(m|p|mt|mb|mr|ml|mx|my|pt|pb|pr|pl|px|py|gap|space-x|space-y|h|w|size)-((?:\d+\.)?\d+|auto)(?=$|[\s"'])/g;

    const updatedContent = content.replace(spacingClassRegex, (match, delimiter, variants, prefix, value) => {
        if (value === "auto") {
            return match;
        }

        const defaultPxValue = parseFloat(value) * 4;
        const closestSpacing = mapToCustomSpacing(defaultPxValue);

        const newClass = `${delimiter}${variants}${prefix}-${closestSpacing}`;
        if (newClass !== match) {
            hasChanges = true;
        }
        return newClass;
    });

    return { updatedContent, hasChanges };
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
                    const tsxContent = await fs.promises.readFile(filePath, "utf-8");
                    const { updatedContent, hasChanges } = updateSpacingInContent(tsxContent);

                    if (hasChanges) {
                        await fs.promises.writeFile(filePath, updatedContent, "utf-8");
                        console.log(`Updated spacing classes in ${filePath}`);
                    }
                }

                console.log("Spacing class update complete!");
            } catch (error: any) {
                console.error("Error:", error.message);
            }
        });
}
