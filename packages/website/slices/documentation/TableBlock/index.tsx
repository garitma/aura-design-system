import React from "react";
import { PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import Section from "@aura-design/system/section";
import Link from "@/components/Link";

/**
 * @typedef {import("@prismicio/client").Content.TableBlockSlice} TableBlockSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TableBlockSlice>} TableBlockProps
 * @param { TableBlockProps }
 */
const TableBlock = ({ slice }) => {
  return (
    <div className="mod">
      <div className="accents-2 aura">
        <b>{prismicH.asText(slice.primary.title)}</b>
      </div>
      <div className="mod-detail">
        <table>
          <tbody className="aureole one ">
            {slice.items.map((item, index) => (
              <tr className="halo" key={index}>
                <td className="small-4">
                  <Link field={item.document}>
                    <a>
                      <span className="info info-text">
                        {prismicH.asText(item.document.data.title)}
                      </span>
                    </a>
                  </Link>
                </td>
                <td className="small-8 ulinea pm0">
                  <PrismicRichText field={item.document.data.excerpt} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableBlock;
