import request from '../plugins/axios/index'
//0xB221dDf32a85f2af237401d02bbF860f75e7A4D0
export function sendVerificationCode(mail) {
    return request({
        url: '/authorization/mail_code',
        method: 'get',
        params:{
            "mail":mail
        }
    })
}

export function sendRegisterAccount(mes) {
    return request({
        url: '/authorization/register',
        method: 'post',
        data:{
            "appId": "87245bf5fb0fb9a83f3682d09642ca60",
            "channelCode":mes.channelCode,
            "code": mes.code,
            "inviteCode": mes.inviteCode,
            "mail": mes.mail,
            "origin": "PLATFORM_AUTH",
            "password": mes.password
        },
    })
}


export function sendLogin(mes) {
    return request({
        url: '/authorization/user_login',
        method: 'post',
        data:{
            "account": mes.account,
            "appId": "87245bf5fb0fb9a83f3682d09642ca60",
            "channelCode": mes.channelCode,
            "credit": mes.credit,
            "inviteCode": mes.inviteCode,
            "origin": "PLATFORM_AUTH",
            "platform": "ORIGIN"
        },
    })
}

export function sendFindPass(mes) {
    return request({
        url: '/authorization/reset_pwd',
        method: 'post',
        data:{
            "account": mes.account,
            "code": mes.code,
            "mail": mes.account,
            "newPassword": mes.newPassword
        },
    })
}

export function sendForgetCode(mail) {
    return request({
        url: '/authorization//forgot_pwd',
        method: 'get',
        params:{
            "mail":mail
        }
    })
}

export function sendlogout() {
    return request({
        url: '/authorization/logout',
        method: 'post',
    })
}


export function sendPresaleInfo() {
    return request({
        url: '/shop/api/presale/87245bf5fb0fb9a83f3682d09642ca60',
        method: 'get',
    })
}

export function sendGetShopSignature(data) {
    return request({
        url: '/shop/api/presale/shop_signature',
        method: 'post',
        data:{
            "amount": data.amount,
            "chainId": data.chainId,
            "currency": data.currency,
            "planId": data.planId,
            "price": data.price 
        },
    })
}