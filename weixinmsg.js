const formatMsg = require('./fmtwxmsg');

function help() {
    return `这是一个消息回复测试程序，会把消息原样返回，但是目前不支持视频类型的消息`;
}

function userMsg(wxmsg, retmsg) {
    /*
        检测是否为文本消息，如果是文本消息则先要检测是不是支持的关键词回复。
    */
    if (wxmsg.MsgType == 'text') {
        if (wxmsg.Content == 'help' || wxmsg.Content == '?' || wxmsg.Content == '？') {
            retmsg.msg = help();
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        }
//        } else if (wxmsg.Content == 'hello' || wxmsg.Content == '你好'){
//
//            retmsg.msg = '你好，你可以输入一些关键字测试消息回复，输入help/?获取帮助';
//            retmsg.msgtype = 'text';
//            return formatMsg(retmsg);
            else if (wxmsg.Content == 'who'){

            retmsg.msg = '学生：李沛伦 河北师范大学软件学院 H5';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);

        } else {
            retmsg.msg = wxmsg.Content;
            retmsg.msgtype = wxmsg.MsgType;
            return formatMsg(retmsg);
        }
    } else {
        switch(wxmsg.MsgType) {
            case 'image':
            case 'voice':
                retmsg.msg = wxmsg.MediaId;
                retmsg.msgtype = wxmsg.MsgType;
                break;
            default:
                retmsg.msg = '不支持的类型';
        }

        return formatMsg(retmsg);
    }
}

exports.userMsg = userMsg;
exports.help = help;

exports.msgDispatch = function msgDispatch(wxmsg, retmsg) {
    return userMsg(wxmsg, retmsg);
};

function eventMsg(wxmsg,retmsg){
    retmsg.msgtype='text';
    switch(wxmsg.Event){
        case 'subscribe':
            retmsg.msg = '你好，这是一个没什么用的测试号'
            return formatMsg(retmsg);
        case 'unsubscribe':
            console.log(wxmsg.FromUserName,'取消关注');
            break;
        case 'CLICK':
            retmsg.msg = wxmsg.EventKey;
            return formatMsg(retmsg);
        default:
            return '';
    }
    return '';
}
exports.msgDispatch=function(wxmsg,retmsg){
    if(wxmsg.MsgType=='event'){
        return eventMsg(wxmsg,retmsg);
    }
    return userMsg(wxmsg,retmsg);
}
