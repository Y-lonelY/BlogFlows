> 在校期间（2016-10）为导师做一个商城项目，其中注册、找回密码、换绑手机等功能都需要用到验证码，考虑到上线的安全问题，我决定用手机验证码来提高安全性。经过各大短信平台进行比较后，选择了[阿里大于][1]，一个阿里巴巴的云通信平台，下面我将这次开发经验和遇到的一些问题分享出来。

<!--more-->

---
1.登录平台 


---
2.登陆之后我们可以看到资费，使用场景等，在进入正题之前我们需要一些准备工作，首先我们先了解下短信的请求参数，在这里我们需要注意的是**sms_param**这个参数，在接下来我们申请短信模板的时候会用到！


---
3.相应参数，对待返回值我们记住最基本的true or false 即可！


---
4.了解完公共参数，接下来我们进入正题，首先我们得**配置短信签名**和**配置短信模板**，*短信签名*出现在短信**开头**，注意短信模板，这里将用到上文提示的**sms_param**参数！


---
5.同时，在其网站上下载好SDK，下图展示的是我的存放位置，使用的是**thinkphp**框架，*其他的开发环境文件的存放位置在官网上有详细说明*，在项目中位置：
**\根目录\ThinkPHP\Library\Org\taobao**


---
6.接下来是项目后台的配置，其中`appkey`,`secret`在你完成上述申请之后可以在**个人管理中心**查看

```php
    class DuanXinController extends Controller {
        public function index()
        {
    $appkey = "...";//你的App key
    $secret = "...";//你的App Secret:
    import('Org.taobao.top.TopClient');
    import('Org.taobao.top.ResultSet');
    import('Org.taobao.top.RequestCheckUtil');
    import('Org.taobao.top.TopLogger');
    import('Org.taobao.top.request.AlibabaAliqinFcSmsNumSendRequest');
    //将需要的类引入，并且将文件名改为原文件名.class.php的形式
    $c = new \TopClient;
    $c->appkey = $appkey;
    $c->secretKey = $secret;
    $req = new \AlibabaAliqinFcSmsNumSendRequest;
    $req->setExtend("123456");//确定发给的是哪个用户，参数为用户id
    $req->setSmsType("normal");
    session_start();
    $verifycode = strval(rand(1000,9999));
    $_SESSION['verifycode'] = $verifycode;
    $userStatus=0;
    /*
    进入阿里大鱼的管理中心找到短信签名管理，输入已存在签名的名称，这里是身份验证。
    */
    $req->setSmsFreeSignName("山水优品");
    $smsParams = [
        'code' => $verifycode,
        'product' => '...'
    ];
    $req->setSmsParam(json_encode($smsParams));
    //$req->setSmsParam("{'code':numfour() 'product':'山水优品'}"); 
    //这里设定的是发送的短信内容：验证码${code}，您正在进行${product}身份验证，打死不要告诉别人哦！”
    $req->setRecNum(...);//参数为用户的手机号码
    $req->setSmsTemplateCode("SMS_16670740");
    $resp = $c->execute($req);
    //var_dump($resp);这里是用来打印返回结果
    if($resp->result->success)
        {
            $userStatus=1;
        }
        else
        {
            $userStatus=0;
        }
        echo $userStatus;
    }
    // 检查验证码是否正确
    function checkcode(){
        session_start();
        $verifycode = $_SESSION['verifycode'];
        $inputcode = I('post.code');
        $checkstatus = 0;
        if ($inputcode == $verifycode) {
            $checkstatus = 1;
        }else{
            $checkstatus = 0;
        }
        echo $checkstatus;
    }
```

---
7.下面的代码是项目前台的**Ajax**请求部分：

```javascript
        send.onclick = function() {
            var oldTel = document.getElementById('oldTel').value;
            var that = this;
            var times = 60;
            this.disabled = true;
            timer1 = setInterval(function() {
                times--;
                that.value = times + "秒后重试";
                if (times <= 0) {
                    that.disabled = false;
                    that.value = "发送验证码";
                    clearInterval(timer1);
                    times = 60;
                }
            }, 1000);
            $.ajax({
            url: "{:U('DuanXin/index')}",
            type: "post",
            data: {
                'name':oldTel,
            },
                success: function(responseText, status, xhr) {
                    if (status == 'success') {
                        if (responseText == 1) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }

                },

                error: function() {
                    return false;
                },

                timeout: 1000 * 60,
        });
    }
```

这里的按钮加入了一个简单的倒计时功能，即点击发送后60s内无法点击按钮； 


---
至此第一次使用短信验证API的经历结束！


[1]: http://www.alidayu.com/?spm=a3142.8065892.1999205497.1.9luySV
