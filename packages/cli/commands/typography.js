import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

export function registerTypographyCommand(program) {
  const typographyCommand = program
    .command('typography')
    .description('Typography utilities for Aura Design System');

  typographyCommand
    .command('generate')
    .description('Generate a custom typography.css file based on Aura philosophy')
    .action(async () => {
      // Prompt for small, p, and scale
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'small',
          message: 'Enter the absolute font size for small (in rem, e.g., 0.875):',
          validate: (input) => !isNaN(parseFloat(input)) && parseFloat(input) > 0 || 'Enter a valid positive number',
        },
        {
          type: 'input',
          name: 'p',
          message: 'Enter the absolute font size for p (in rem, e.g., 1):',
          validate: (input) => !isNaN(parseFloat(input)) && parseFloat(input) > 0 || 'Enter a valid positive number',
        },
        {
          type: 'list',
          name: 'scaleType',
          message: 'How do you want to define the headline scale?',
          choices: [
            { name: 'Single ratio (e.g., 1.25)', value: 'ratio' },
            { name: 'Explicit values for h6 to h1', value: 'explicit' },
          ],
        },
        {
          type: 'input',
          name: 'ratio',
          message: 'Enter the scale ratio (e.g., 1.25):',
          when: (answers) => answers.scaleType === 'ratio',
          validate: (input) => !isNaN(parseFloat(input)) && parseFloat(input) > 1 && parseFloat(input) < 2.5 || 'Enter a reasonable ratio (e.g., 1.15 - 1.5)',
        },
        {
          type: 'input',
          name: 'h6',
          message: 'Enter the font size for h6 (in rem):',
          when: (answers) => answers.scaleType === 'explicit',
          validate: (input) => !isNaN(parseFloat(input)) && parseFloat(input) > 0 || 'Enter a valid positive number',
        },
        {
          type: 'input',
          name: 'h5',
          message: 'Enter the font size for h5 (in rem):',
          when: (answers) => answers.scaleType === 'explicit',
          validate: (input) => !isNaN(parseFloat(input)) && parseFloat(input) > 0 || 'Enter a valid positive number',
        },
        {
          type: 'input',
          name: 'h4',
          message: 'Enter the font size for h4 (in rem):',
          when: (answers) => answers.scaleType === 'explicit',
          validate: (input) => !isNaN(parseFloat(input)) && parseFloat(input) > 0 || 'Enter a valid positive number',
        },
        {
          type: 'input',
          name: 'h3',
          message: 'Enter the font size for h3 (in rem):',
          when: (answers) => answers.scaleType === 'explicit',
          validate: (input) => !isNaN(parseFloat(input)) && parseFloat(input) > 0 || 'Enter a valid positive number',
        },
        {
          type: 'input',
          name: 'h2',
          message: 'Enter the font size for h2 (in rem):',
          when: (answers) => answers.scaleType === 'explicit',
          validate: (input) => !isNaN(parseFloat(input)) && parseFloat(input) > 0 || 'Enter a valid positive number',
        },
        {
          type: 'input',
          name: 'h1',
          message: 'Enter the font size for h1 (in rem):',
          when: (answers) => answers.scaleType === 'explicit',
          validate: (input) => !isNaN(parseFloat(input)) && parseFloat(input) > 0 || 'Enter a valid positive number',
        },
      ]);

      // Calculate scale and generate CSS file
      const small = parseFloat(answers.small);
      const p = parseFloat(answers.p);
      let headingSizes = [];
      if (answers.scaleType === 'ratio') {
        // Start from h6, go up to h1
        const ratio = parseFloat(answers.ratio);
        // We'll use h6 = p * 1.0625 (Aura's default h6 is 1.0625rem, p is 1rem)
        let h6 = p * 1.0625;
        headingSizes = [h6];
        for (let i = 1; i < 6; i++) {
          headingSizes.push(headingSizes[i - 1] * ratio);
        }
        // Now headingSizes = [h6, h5, h4, h3, h2, h1]
      } else {
        // Explicit values
        headingSizes = [
          parseFloat(answers.h6),
          parseFloat(answers.h5),
          parseFloat(answers.h4),
          parseFloat(answers.h3),
          parseFloat(answers.h2),
          parseFloat(answers.h1),
        ];
      }
      // h6 to h1, so reverse for h1..h6
      const headings = ['h6', 'h5', 'h4', 'h3', 'h2', 'h1'];
      const headingVars = headings.map((tag, i) => {
        const val = headingSizes[i];
        return {
          tag,
          min: (val * 0.85).toFixed(5) + 'rem',
          val: '4.03vw',
          max: val.toFixed(3) + 'rem',
        };
      });
      // Build CSS
      let css = `body h1,
body h2,
body h3,
body h4,
body h5,
body h6,
body p,
body .h1,
body .h2,
body .h3,
body .h4,
body .h5,
body .h6 {
  font-size: clamp(var(--min), var(--val), var(--max));
}

`;
      // Headings (h1..h6)
      for (let i = 5; i >= 0; i--) {
        const { tag, min, val, max } = headingVars[i];
        css += `${tag}, .${tag} {
  --min: ${min};
  --val: ${val};
  --max: ${max};
}

`;
      }
      // Paragraph
      css += `p, .p {
  --min: ${p}rem;
  --val: ${p}rem;
  --max: ${p}rem;
}

`;
      // Small
      css += `small, .small {
  --min: ${small}rem;
  --val: ${small}rem;
  --max: ${small}rem;
}
`;
      // Write to typography.css
      const outPath = path.join(process.cwd(), 'typography.css');
      fs.writeFileSync(outPath, css, 'utf-8');
      console.log(`\nTypography CSS generated at ${outPath}`);
    });
}
