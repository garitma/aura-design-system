import { createContext, useState, useContext } from "react";

export const NoticeContext = createContext({});
export const useNotice = () => useContext(NoticeContext)

type Props = {
  children: React.ReactNode 
}

export const NoticeContexProvider = ({ children }: Props )  => {
  const [notices, setNotices] = useState([]);

  const deleteNotice = (index: number) => {
    let newNotices = [...notices];
    newNotices.splice(index, 1);
    return setNotices(newNotices);
  };

  const addNotice = (
    description: string,
    type = "success",
    title: string,
    src: string,
    delay = 3000
  ) => {
    let id = Math.trunc(Math.random() * 1000000);
    let newNotices: any = [...notices];
    let notice: any = { id, title, description, delay, type, src };
    newNotices.push(notice);
    setNotices(newNotices);
  };

  return (
    <NoticeContext.Provider
      value={{
        notices,
        setNotices,
        deleteNotice,
        addNotice,
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
};
