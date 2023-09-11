import Section from "@aura-design/system/section";
import Grid from "@aura-design/system/grid";
import * as prismicH from "@prismicio/helpers";
import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";

import Link from "@/components/Link";

const DocumentationLink = ({ doc }) => {
  return (
    <Section container="smash" space="aura">
      <Grid col="two">
        <div>
          {doc.data.prev?.id && (
            <div className="lefttxt">
              <Link field={doc.data.prev}>
                <a className="uline button-menu h-auto">
                  <div className="aureole one">
                    <div>
                      <ArrowLeftIcon />
                      <span className="wall-pad">Previus:</span>
                    </div>
                    <h3>{prismicH.asText(doc.data.prev?.data?.title)}</h3>
                  </div>
                </a>
              </Link>
            </div>
          )}
        </div>
        <div>
          {doc.data.next?.id && (
            <div className="righttxt">
              <Link field={doc.data.next}>
                <a className="uline button-menu h-auto">
                  <div className="aureole one">
                    <div>
                      <span className="wall-pad">Next:</span>
                      <ArrowRightIcon />
                    </div>
                    <h3>{prismicH.asText(doc.data.next?.data?.title)}</h3>
                  </div>
                </a>
              </Link>
            </div>
          )}
        </div>
      </Grid>
    </Section>
  );
};

export default DocumentationLink;
