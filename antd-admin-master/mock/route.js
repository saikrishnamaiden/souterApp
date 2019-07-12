import { Constant } from './_utils'
const { ApiPrefix } = Constant

const database = [
  {
    id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    zh: {
      name: '仪表盘'
    },
    'pt-br': {
      name: 'Dashboard'
    },
    route: '/dashboard',
  },
  {
    id: '2',
    breadcrumbParentId: '1',
    name: 'Tables',
    zh: {
      name: '用户管理'
    },
    'pt-br': {
      name: 'Usuário'
    },
  },
  {
    id: '3',
    breadcrumbParentId: '2',
    menuParentId: '2',
    name: 'CITIES',
    zh: {
      name: '用户管理'
    },
    'pt-br': {
      name: 'Usuário'
    },
    route: '/cities',
  },
  {
    id: '4',
    menuParentId: '-1',
    breadcrumbParentId: '3',
    name: 'CITIES Detail',
    zh: {
      name: '用户详情'
    },
    'pt-br': {
      name: 'Detalhes do usuário'
    },
    route: '/cities/:id',
  },
  {
    id: '5',
    breadcrumbParentId: '2',
    menuParentId: '2',
    name: 'FEEBACK',
    zh: {
      name: '用户管理'
    },
    'pt-br': {
      name: 'Usuário'
    },
    route: '/feeback',
  },
  {
    id: '6',
    menuParentId: '-1',
    breadcrumbParentId: '5',
    name: 'FEEBACK Detail',
    zh: {
      name: '用户详情'
    },
    'pt-br': {
      name: 'Detalhes do usuário'
    },
    route: '/feeback/:id',
  },
]

module.exports = {
  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json(database)
  },
}
