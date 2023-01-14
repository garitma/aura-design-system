import { createContext, useState, useContext } from "react";

import { HelpType } from "../types/global";

export type NoticeProps = {
  id: string;
  title: string;
  description: string;
  delay: number;
  type: HelpType;
  src: string;
};

export type NoticeContextProps = {
  notices: any;
  deleteNotice: (notice: number) => void;
  addNotice: (
    description: string,
    type: HelpType,
    title: string,
    src: string,
    delay: number
  ) => void;
};

export const NoticeContext = createContext<NoticeContextProps>({
  notices: [],
  deleteNotice: () => {},
  addNotice: () => {},
});

export const useNotice = () => {
  const { addNotice } = useContext(NoticeContext);

  return addNotice;
};

type NoticeContexProviderProps = {
  children: React.ReactNode;
};

export const NoticeContexProvider = ({
  children,
}: NoticeContexProviderProps) => {
  const [notices, setNotices] = useState<{}[]>([]);

  const deleteNotice = (index: any) => {
    let newNotices = [...notices];
    newNotices.splice(index, 1);
    return setNotices(newNotices);
  };

  const addNotice = (
    description: string,
    type: HelpType = "success",
    title: string,
    src: string,
    delay: number = 3000
  ) => {
    let id = Math.trunc(Math.random() * 1000000).toString();
    let newNotices: {}[] = [...notices];
    let notice: NoticeProps = { id, title, description, delay, type, src };
    newNotices.push(notice);
    setNotices(newNotices);
  };

  return (
    <NoticeContext.Provider
      value={{
        notices,
        deleteNotice,
        addNotice,
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
};
