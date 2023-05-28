import { useState } from "react";

export const timeConvert = (num: number) => {
  const time = Math.trunc(num);
  const hours = Math.floor(time / 60);
  const minutes = ("0" + (time % 60)).slice(-2);

  return hours + ":" + minutes;
};

export const compare = (num: number, comparator: number, context: string) => {
  const result = Math.trunc(num - comparator);
  const displayData = context
    ? context === "time"
      ? result < 0
        ? timeConvert(result * -1)
        : timeConvert(result)
      : `${result} ${context}`
    : result;

  if (result === 0) {
    return <span>{displayData} still the same</span>;
  }
  if (result < 0) {
    return (
      <span>
        {displayData} decrease <i className="icon arrowDown"></i>
      </span>
    );
  }

  if (result > 0) {
    return (
      <span>
        {displayData} increase <i className="icon arrowUp"></i>
      </span>
    );
  }

  return <span>0 something went wrong</span>;
};

export const usePaginateData = (allData = [], pageSize = 12) => {
  const [archivePageSize, setArchivePageSize] = useState<number>(pageSize);
  const [data, setData] = useState<{}[]>(allData);
  const [page, setPage] = useState<number>(1);
  const totalResultsSize = allData?.length;
  const totalPages = Math.ceil(totalResultsSize / archivePageSize);
  const cursorInit = (page - 1) * archivePageSize;
  const cursorEnd = page * archivePageSize;
  const hasNextPage = totalPages > page;
  const hasPrevPage = 1 < page;
  const hasPagination = totalPages > 1;
  const prevPage = () => hasPrevPage && setPage(page - 1);
  const nextPage = () => hasNextPage && setPage(page + 1);

  const mutate = () => {
    setData(allData);
  };

  const screenData = data.slice(cursorInit, cursorEnd);

  return {
    screenData,
    data,
    nextPage,
    prevPage,
    archivePageSize,
    setArchivePageSize,
    page,
    setPage,
    totalResultsSize,
    totalPages,
    cursorInit,
    cursorEnd,
    hasNextPage,
    hasPrevPage,
    hasPagination,
    mutate,
  };
};

export const useDataView = (initialData: {
  [value: string]: never[] | undefined;
}) => {
  let allData = {};

  for (const value in initialData) {
    allData = {
      ...allData,
      [value]: usePaginateData(initialData[value]),
    };
  }

  return allData;
};
