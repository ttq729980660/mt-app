import axios from '../server/utils/axios'

export const actions = {
  async nuxtServerInit({commit}, {req}) {
    const {status, data: {province, city}} = await axios.get('/geo/getPosition')
    commit('geo/setPosition', status === 200 ? {city, province} : {city: '', province: ''})
    const {status: status2, data: {menu}} = await axios.get('/geo/menu')
    commit('home/setMenu', status2 === 200 ? menu : [])
    const {status:status3,data:{result}}=await axios.get('/search/hotPlace',{
      params:{
        city: city.replace('市','')
      }
    })
    commit('home/setHotPlace',status3===200?result:[])
  }
}

