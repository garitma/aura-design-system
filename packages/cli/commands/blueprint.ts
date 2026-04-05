import { Command } from "commander";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const SCRIPTS_TO_MERGE: Record<string, string> = {
  preflight: "tsx scripts/preflight.ts",
  "dev:server": "next dev",
  dev: "pnpm run preflight && pnpm run dev:server",
  "sonar:up":
    "docker start sonarqube 2>/dev/null || docker run -d --name sonarqube -p 9000:9000 sonarqube:lts",
  "sonar:setup":
    'sleep 45 && curl -fsS -u admin:admin -X POST "http://localhost:9000/api/users/change_password?login=admin&previousPassword=admin&password=$npm_package_name" && curl -fsS -u admin:$npm_package_name -X POST "http://localhost:9000/api/user_tokens/generate?name=local-token" | jq -r .token > .sonar-token',
  "sonar:scan":
    "sonar-scanner -Dsonar.login=$(cat .sonar-token) -Dsonar.projectKey=$npm_package_name -Dsonar.host.url=http://localhost:9000",
  "sonar:report":
    "curl -u admin:$npm_package_name \"http://localhost:9000/api/issues/search?componentKeys=$npm_package_name&resolved=false\" | jq '[.issues[] | {message: .message, severity: .severity, component: .component, line: .line}]' > sonar-issues.json",
  "sonar:full": "pnpm run sonar:up && pnpm run sonar:setup && pnpm run sonar:scan",
};

const DEV_DEPS_TO_ADD: Record<string, string> = {
  "sonarqube-scanner": "^4.3.5",
  tsx: "^4.19.1",
};

const GITIGNORE_SONAR_LINES = [
  ".sonar-token",
  "sonar-issues.json",
  ".scannerwork/",
];

function templatesRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, "..", "templates");
}

function readTpl(rel: string): string {
  return readFileSync(join(templatesRoot(), rel), "utf-8");
}

function interpolate(
  content: string,
  vars: Record<string, string>,
): string {
  let out = content;
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{{${k}}}`).join(v);
  }
  return out;
}

function writeIfMissingOrForce(
  path: string,
  content: string,
  force: boolean,
  label: string,
): void {
  if (existsSync(path) && !force) {
    console.log(`  skip (exists): ${label}`);
    return;
  }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf-8");
  console.log(`  write: ${label}`);
}

function mergePackageJson(projectRoot: string): void {
  const path = join(projectRoot, "package.json");
  const pkg = JSON.parse(readFileSync(path, "utf-8")) as {
    scripts?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };

  pkg.scripts = pkg.scripts ?? {};
  let scriptsAdded = 0;
  for (const [key, value] of Object.entries(SCRIPTS_TO_MERGE)) {
    if (pkg.scripts[key] === undefined) {
      pkg.scripts[key] = value;
      scriptsAdded += 1;
    }
  }

  pkg.devDependencies = pkg.devDependencies ?? {};
  let depsAdded = 0;
  for (const [key, value] of Object.entries(DEV_DEPS_TO_ADD)) {
    if (pkg.devDependencies[key] === undefined) {
      pkg.devDependencies[key] = value;
      depsAdded += 1;
    }
  }

  writeFileSync(path, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
  console.log(
    `  package.json: +${scriptsAdded} script(s), +${depsAdded} devDependency key(s) (existing entries unchanged)`,
  );
}

function ensureGitignoreLines(projectRoot: string): void {
  const path = join(projectRoot, ".gitignore");
  const lines = GITIGNORE_SONAR_LINES;
  if (!existsSync(path)) {
    writeFileSync(path, lines.join("\n") + "\n", "utf-8");
    console.log("  write: .gitignore (Sonar entries)");
    return;
  }
  const current = readFileSync(path, "utf-8");
  const toAppend = lines.filter((l) => !current.split(/\r?\n/).includes(l));
  if (toAppend.length === 0) {
    console.log("  .gitignore: Sonar lines already present");
    return;
  }
  const sep = current.endsWith("\n") ? "" : "\n";
  writeFileSync(path, current + sep + toAppend.join("\n") + "\n", "utf-8");
  console.log(`  patch: .gitignore (+${toAppend.length} Sonar line(s))`);
}

function scaffoldWiki(
  projectRoot: string,
  suffix: string,
  packageName: string,
  force: boolean,
): void {
  const wikiRoot = join(projectRoot, "wiki");
  const brunoName = `bruno-${suffix}`;
  const obsidianName = `obsidian-${suffix}`;
  const brunoDir = join(wikiRoot, brunoName);
  const obsidianDir = join(wikiRoot, obsidianName);

  mkdirSync(wikiRoot, { recursive: true });
  mkdirSync(brunoDir, { recursive: true });
  mkdirSync(obsidianDir, { recursive: true });

  const vars = {
    PACKAGE_NAME: packageName,
    BRUNO_COLLECTION_NAME: brunoName,
    OBSIDIAN_VAULT_RELATIVE: `wiki/${obsidianName}`,
    BRUNO_COLLECTION_RELATIVE: `wiki/${brunoName}`,
  };

  const opencollection = interpolate(
    readTpl("bruno/opencollection.yml"),
    vars,
  );
  writeIfMissingOrForce(
    join(brunoDir, "opencollection.yml"),
    opencollection,
    force,
    `wiki/${brunoName}/opencollection.yml`,
  );

  writeIfMissingOrForce(
    join(brunoDir, ".gitignore"),
    readTpl("bruno/gitignore"),
    force,
    `wiki/${brunoName}/.gitignore`,
  );

  mkdirSync(join(brunoDir, "environments"), { recursive: true });
  writeIfMissingOrForce(
    join(brunoDir, "environments", "Local.yml"),
    readTpl("bruno/environments/Local.yml"),
    force,
    `wiki/${brunoName}/environments/Local.yml`,
  );

  const aiPrompt = interpolate(readTpl("bruno/AI-PROMPT.md"), vars);
  writeIfMissingOrForce(
    join(brunoDir, "AI-PROMPT.md"),
    aiPrompt,
    force,
    `wiki/${brunoName}/AI-PROMPT.md`,
  );

  const dotObsidian = join(obsidianDir, ".obsidian");
  mkdirSync(dotObsidian, { recursive: true });
  for (const f of ["app.json", "appearance.json", "core-plugins.json"]) {
    const src = join(templatesRoot(), "obsidian", "dotobsidian", f);
    const dest = join(dotObsidian, f);
    writeIfMissingOrForce(dest, readFileSync(src, "utf-8"), force, `wiki/${obsidianName}/.obsidian/${f}`);
  }

  const welcome = interpolate(readTpl("obsidian/Welcome.md"), vars);
  writeIfMissingOrForce(
    join(obsidianDir, "Welcome.md"),
    welcome,
    force,
    `wiki/${obsidianName}/Welcome.md`,
  );

  const bootstrap = interpolate(readTpl("obsidian/Bootstrap.md"), vars);
  writeIfMissingOrForce(
    join(obsidianDir, "Bootstrap.md"),
    bootstrap,
    force,
    `wiki/${obsidianName}/Bootstrap.md`,
  );
}

function scaffoldPreflight(projectRoot: string, force: boolean): void {
  const scriptsDir = join(projectRoot, "scripts");
  mkdirSync(scriptsDir, { recursive: true });
  const dest = join(scriptsDir, "preflight.ts");
  const body = readTpl("preflight.ts");
  writeIfMissingOrForce(dest, body, force, "scripts/preflight.ts");
}

function scaffoldSonarProperties(projectRoot: string, force: boolean): void {
  const dest = join(projectRoot, "sonar-project.properties");
  writeIfMissingOrForce(
    dest,
    readTpl("sonar-project.properties"),
    force,
    "sonar-project.properties",
  );
}

function deriveSuffix(packageName: string): string {
  const parts = packageName.split("-").filter(Boolean);
  if (parts.length <= 1) {
    return packageName;
  }
  return parts.slice(1).join("-");
}

export function registerBlueprintCommand(program: Command) {
  program
    .command("blueprint [projectDir]")
    .description(
      "Scaffold wiki (Bruno + Obsidian), generic preflight, Sonar scripts, and scanner config",
    )
    .option(
      "-f, --force",
      "Overwrite bootstrap files and scripts/preflight.ts if they already exist",
      false,
    )
    .option(
      "--suffix <string>",
      "Override wiki folder suffix (default: package.json name with first segment removed)",
    )
    .action(async (projectDir: string | undefined, options) => {
      const root = resolve(process.cwd(), projectDir ?? ".");
      const pkgPath = join(root, "package.json");
      if (!existsSync(pkgPath)) {
        console.error(`No package.json at ${root}`);
        process.exit(1);
      }

      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as {
        name?: string;
      };
      const packageName = pkg.name ?? "app";
      const suffix =
        typeof options.suffix === "string" && options.suffix.length > 0
          ? options.suffix
          : deriveSuffix(packageName);

      const force = Boolean(options.force);

      console.log(`\n@aura-design/cli blueprint → ${root}`);
      console.log(`  package: ${packageName}`);
      console.log(`  wiki suffix: ${suffix}\n`);

      scaffoldWiki(root, suffix, packageName, force);
      scaffoldPreflight(root, force);
      scaffoldSonarProperties(root, force);
      ensureGitignoreLines(root);
      mergePackageJson(root);

      console.log("\nDone.\n");
    });
}
