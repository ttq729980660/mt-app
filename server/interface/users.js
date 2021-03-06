import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from '../utils/passport'
import Email from '../dbs/config'
import axios from '../utils/axios'

const router = new Router({prefix:'/users'})
const Store = new Redis().client
//发送邮件验证码接口
router.post('/verifyCode', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`,'expire')

  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code:-1,
      msg:'验证请求过于频繁，1分钟1次'
    }
    return false
  }
  let tranporter = nodeMailer.createTransport({
    service:'qq',
    auth:{
      user:Email.smtp.user,
      pass:Email.smtp.pass
    }
  })
  let ko = {
    code:Email.smtp.code(),
    expire:Email.smtp.expire(),
    email:ctx.request.body.email,
    user:ctx.request.body.username
  }
  let mailOptions = {
    from:`"认证邮件"<${Email.smtp.user}>`,
    to:ko.email,
    subject:'《美团网》注册码',
    html:`您在美团网注册，您的邀请码是${ko.code}`
  }
  await tranporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    } else {
     Store.hmset(`nodemail:${ko.user}`,'code',ko.code,'expire',ko.expire,'email',ko.email)
    }
  })
  const save1Expire = await  Store.hget(`nodemail:${ko.user}`,'expire')
  ctx.body = {
    code:0,
    msg:'验证码已发送，可能会有延时，有效期1分钟',
  }
})

//注册接口
router.post('/signup', async (ctx) => {
  const { username, password, email, code } = ctx.request.body
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`,'code')
    const saveExpire = await  Store.hget(`nodemail:${username}`,'expire')
    if (new Date().getTime() - saveExpire > 0) {
      ctx.body = {
        code:-1,
        msg:'验证码已过期,请重新尝试'
      }
      return
    }
    if (code !== saveCode) {
      ctx.body = {
        code:-1,
        msg:'请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  let user = await User.find({username})
  if (user.length) {
    ctx.body = {
      code: -1,
      msg:'已被注册'
    }
    return
  }
  let newUser = await User.create({username,password,email})
  if (newUser) {
    let res = await axios.post('/users/signin', {username, password})
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code:0,
        msg:'注册成功',
        user:res.data.user
      }
    } else {
      ctx.body = {
        code:-1,
        msg:'error'
      }
    }
  } else {
      ctx.body = {
        code: -1,
        msg:'注册失败'
      }
  }
})
//登录接口
router.post('/signin', async (ctx,next) => {
  return Passport.authenticate('local', function (err,user,info,status) {
    if (err) {
      ctx.body = {
        code:-1,
        msg:err
      }
    } else {
      if (user) {
        ctx.body = {
          code:0,
          msg:'登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code:1,
          msg:info
        }
      }
    }
  })(ctx, next)
})
//获取用户接口
router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {username, email} = ctx.session.passport.user
    ctx.body = {
      user:username,
      email
    }
  } else {
    ctx.body = {
      user:'',
      email:''
    }
  }
})
//退出接口
router.get('/exit', async (ctx) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code:0,
      msg:'退出成功'
    }
  } else {
    ctx.body = {
      code:-1,
      msg:'退出失败'
    }
  }
})
export  default router
