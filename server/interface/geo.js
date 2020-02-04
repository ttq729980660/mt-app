import Router from 'koa-router'
import axios from '../utils/axios'

let router = new Router({prefix:'/geo'})
//获取当前位置接口
router.get('/getPosition', async (ctx) => {
  const { status, data:{ province, city }} = await axios.get('http://cp-tools.cn/geo/getPosition')
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})
//获取省列表
router.get('/province', async (ctx) => {
  const { status, data:{ province }} = await axios.get('http://cp-tools.cn/geo/province')
  if (status === 200) {
    ctx.body = {
      province
    }
  } else {
    ctx.body = {
      province:[]
    }
  }
})
//根据省份获取城市列表

router.get('/province/:id', async (ctx) => {
  const { status, data:{ city }} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city:[]
    }
  }
})
//获取当前省份全部城市列表
router.get('/city', async (ctx) => {
  const { status, data:{ city }} = await axios.get('http://cp-tools.cn/geo/city')
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city:[]
    }
  }
})
//获取热门城市列表
router.get('/hotCity', async (ctx) => {
  const { status, data:{ hots }} = await axios.get('http://cp-tools.cn/geo/hotCity')
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots:[]
    }
  }
})
//获取导航菜单接口
router.get('/menu', async (ctx) => {
  const { status, data:{ menu }} = await axios.get('http://cp-tools.cn/geo/menu')
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu:[]
    }
  }
})

export default router
