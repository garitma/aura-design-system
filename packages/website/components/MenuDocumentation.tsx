import Accordion from "@aura-design/system/accordion";
import Button from "@aura-design/system/button";

import Link from "@/components/Link";

export default function MenuDocumentation({ menu }) {
  return (
    <div className="purple pad anchor">
      <div className="hide-large">
        <Accordion title="Documentation">
          <ul>
            <li>
              <h4 className="mt13 h6">Overview</h4>
            </li>
            <li>
              <Link href="/docs/getting-started" passHref>
                <Button mode="link">Getting Starter</Button>
              </Link>
            </li>
            <li>
              <Link href="/docs/principles" passHref>
                <Button mode="link">Principles</Button>
              </Link>
            </li>
            <li>
              <Link href="/docs/cheat-sheet" passHref>
                <Button mode="link">Cheat Sheet</Button>
              </Link>
            </li>
          </ul>
        </Accordion>
      </div>
      <div className="sticky hide-small hide-medium">
        <ul>
          <li>
            <h4 className="mt13 h6">Overview</h4>
          </li>
          <li>
            <Link href="/docs/getting-started" passHref>
              <Button mode="link">Getting Starter</Button>
            </Link>
          </li>
          <li>
            <Link href="/docs/principles" passHref>
              <Button mode="link">Principles</Button>
            </Link>
          </li>
          <li>
            <Link href="/docs/cheat-sheet" passHref>
              <Button mode="link">Cheat Sheet</Button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
