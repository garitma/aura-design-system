import { useEffect } from "react";

import Button from "../atoms/button";
import { SharedBasic } from "../types/global";

export interface NoticeProps extends SharedBasic {
  doc: any;
  index: any;
  deleteNotice?: any;
  width?: string;
}

const Notice = ({
  doc,
  index,
  deleteNotice,
  width = "100%",
  ...props
}: NoticeProps) => {
  useEffect(() => {
    let timer = setTimeout(() => deleteNotice(index), doc?.delay);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div
      className={`aura ${doc?.type} ${doc?.type}-text anchor`}
      key={index}
      style={{ width: width }}
      {...props}
    >
      <div className="centertxt">
        <b>{doc?.title}</b>
        <p className="mb0">{doc?.description}</p>

        <div className="pin right top bottom">
          <div className="valign vfluid">
            <Button mode="link" onClick={() => deleteNotice(index)}>
              <i className="icon close" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
