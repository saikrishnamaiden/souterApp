import MaidenGrid from 'maidengrid'

const Table = props => {
  const { dataSource, columns, filterValue, afterDataLoad, ...restProps } = props
  const gridPreferences = { filterInfo: [], sortInfo: [] }
  const filterBy = columns[0].dataIndex
  if (filterValue) {
    gridPreferences.filterInfo.push({ filterBy, filterValue })
  }
  const afterData = ({ start, limit, sortInfo, filterInfo }) => {
      for (let item of filterInfo){
          if (item.filterBy == filterInfo) return afterDataLoad(item.filterValue)
      }
  }
  return (
    <MaidenGrid
      data={dataSource}
      columns={columns}
      gridPreferences={JSON.stringify(gridPreferences)}
      afterDataLoad={afterData}
      {...restProps}
    />
  )
}

export { Table }
