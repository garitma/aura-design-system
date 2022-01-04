import { useNotice, NoticeProps } from "../utils/use-notice";
import Notice from "../molecules/notice";

type Props = {
  children: React.ReactNode;
};

const NoticeBox = ({ children }: Props) => {
  const { notices, deleteNotice } = useNotice();

  if (notices.length > 0) {
    return (
      <>
        {children}
        <div className="hold left right top centertxt">
          <div className="aureole one">
            {notices.map((item: NoticeProps) => (
              <Notice
                doc={item}
                index={item.id}
                key={item.id}
                deleteNotice={deleteNotice}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
  return <>{children}</>;
};

export default NoticeBox;
