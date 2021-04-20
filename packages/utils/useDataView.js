import { useState } from "react"

export const timeConvert = num => {
  const time = Math.trunc(num)
  const hours = Math.floor(time / 60)
  const minutes = ("0" + (time % 60)).slice(-2)

  return hours + ":" + minutes
}

export const compare = (num, comparator, context) => {
  const result = Math.trunc(num - comparator)
  const displayData = context
    ? context === "time"
      ? result < 0
        ? timeConvert(result * -1)
        : timeConvert(result)
      : `${result} ${context}`
    : result

  if (result === 0) {
    return <span>{displayData} still the same</span>
  }
  if (result < 0) {
    return (
      <span>
        {displayData} decrease <i className="glyphsSprite arrowDown"></i>
      </span>
    )
  }

  if (result > 0) {
    return (
      <span>
        {displayData} increase <i className="glyphsSprite arrowUp"></i>
      </span>
    )
  }
}

export const paginateData = (allData = [], pageSize = 12) => {
  const [archivePageSize, setArchivePageSize] = useState(pageSize)
  const [data, setData] = useState(allData)
  const [page, setPage] = useState(1)
  const totalResultsSize = allData?.length
  const totalPages = Math.ceil(totalResultsSize / archivePageSize)
  const cursorInit = (page - 1) * archivePageSize
  const cursorEnd = page * archivePageSize
  const hasNextPage = totalPages > page
  const hasPrevPage = 1 < page
  const hasPagination = totalPages > 1
  const prevPage = () => hasPrevPage && setPage(page - 1)
  const nextPage = () => hasNextPage && setPage(page + 1)

  const onScreenData = data.slice(cursorInit, cursorEnd)

  return {
    onScreenData,
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
  }
}

export const useDataView = initialData => {
  let allData = {}

  for (const value in initialData) {
    allData = {
      ...allData,
      [value]: paginateData(initialData[value]),
    }
  }

  return allData
}
