import MaidenGrid from 'maidengrid'

const Table = props => {
  const { dataSource, columns, afterDataLoad, ...restProps } = props
  let { filterValue, ...restAllProps } = restProps
  const gridPreferences = { filterInfo: [], sortInfo: [] }
  const filterBy = columns[0].dataIndex
  if (filterBy && filterValue && filterValue !== ''){
    if(columns[0].type === 'int'){
      filterValue = { equalValue : parseInt(filterValue) }
    }
    gridPreferences.filterInfo.push({ filterBy, filterValue })
  }
  const afterData = ({ start, limit, sortInfo, filterInfo }) => {
      for (let item of filterInfo){
          if (item.filterBy == filterBy) afterDataLoad(item.filterValue)
      }
  }
  return (
    <MaidenGrid
      data={dataSource}
      columns={columns}
      gridPreferences={JSON.stringify(gridPreferences)}
      afterDataLoad={afterData}
      size={'small'}
      {...restAllProps}
    />
  )
}

Table.defaultProps = {
  afterDataLoad : () => {}
}

export { Table }
