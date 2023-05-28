import Accordion from "@aura-design/system/accordion";
import Button from "@aura-design/system/button";

import Link from "@/components/Link";
import MenuAside from "@/components/MenuAside";

export default function MenuDocumentation({ menu }) {
  return (
    <div className="purple pad anchor">
      <div className="hide-large">
        <Accordion title="Documentation">
          <ul>
            <MenuAside secondMenuTabs={menu.data.secondMenuTabs} />
          </ul>
        </Accordion>
      </div>
      <div className="sticky hide-small hide-medium">
        <ul>
          <MenuAside secondMenuTabs={menu.data.secondMenuTabs} />
        </ul>
      </div>
    </div>
  );
}
