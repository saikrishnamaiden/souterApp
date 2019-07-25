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
  {
    id: '7',
    breadcrumbParentId: '2',
    menuParentId: '2',
    name: 'COMMENT',
    zh: {
      name: '用户管理'
    },
    'pt-br': {
      name: 'Usuário'
    },
    route: '/comment',
  },
  {
    id: '8',
    menuParentId: '-1',
    breadcrumbParentId: '7',
    name: 'COMMENT Detail',
    zh: {
      name: '用户详情'
    },
    'pt-br': {
      name: 'Detalhes do usuário'
    },
    route: '/comment/:id',
  },
  {
    id: '9',
    breadcrumbParentId: '2',
    menuParentId: '2',
    name: 'EVENT',
    zh: {
      name: '用户管理'
    },
    'pt-br': {
      name: 'Usuário'
    },
    route: '/event',
  },
  {
    id: '10',
    menuParentId: '-1',
    breadcrumbParentId: '9',
    name: 'EVENT Detail',
    zh: {
      name: '用户详情'
    },
    'pt-br': {
      name: 'Detalhes do usuário'
    },
    route: '/event/:id',
  },
  {
    id: '11',
    breadcrumbParentId: '2',
    menuParentId: '2',
    name: 'ZIPCODE',
    zh: {
      name: '用户管理'
    },
    'pt-br': {
      name: 'Usuário'
    },
    route: '/zipcode',
  },
  {
    id: '12',
    menuParentId: '-1',
    breadcrumbParentId: '11',
    name: 'ZIPCODE Detail',
    zh: {
      name: '用户详情'
    },
    'pt-br': {
      name: 'Detalhes do usuário'
    },
    route: '/zipcode/:id',
  },
  {
    id: '13',
    breadcrumbParentId: '2',
    menuParentId: '2',
    name: 'SUBCOMMENTS',
    zh: {
      name: '用户管理'
    },
    'pt-br': {
      name: 'Usuário'
    },
    route: '/subComments',
  },
  {
    id: '14',
    menuParentId: '-1',
    breadcrumbParentId: '13',
    name: 'SUBCOMMENTS Detail',
    zh: {
      name: '用户详情'
    },
    'pt-br': {
      name: 'Detalhes do usuário'
    },
    route: '/subComments/:id',
  },
]

module.exports = {
  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json(database)
  },
}
