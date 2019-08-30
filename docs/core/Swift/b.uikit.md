# UIKit

## UITextField

Swift 内通过 `UITextField` 来输入文本

```Swift
let textFeild = UITextField()
self.view.addSubview(textFeild)
// 提示
textFeild.placeholder = "请输入"
// 自定义提示字体样式
textFeild.attributedPlaceholder = NSAttributedString(string: "请输入", attributes: [NSAttributedString.Key.foregroundColor: UIColor.gray, NSAttributedString.Key.font: UIFont.systemFont(ofSize: 15)])
// 边框样式，为边框添加下划线的一种解决办法
textFeild.borderStyle = UITextField.BorderStyle.none
textFeild.layer.backgroundColor = UIColor.white.cgColor
textFeild.layer.masksToBounds = false
textFeild.layer.shadowColor = UIColor.gray.cgColor
textFeild.layer.shadowOffset = CGSize(width: 0, height: 1.0)
textFeild.layer.shadowOpacity = 1.0
textFeild.layer.shadowRadius = 0.0
// 背景颜色
textFeild.backgroundColor = UIColor.white
// 输入文字颜色
textFeild.textColor = UIColor.black
// 设置光标颜色
textFeild.tintColor = UIColor.white
// 是否自动纠错
textFeild.autocorrectionType = UITextAutocorrectionType.no
// 输入文字超过宽度，缩小字号而不是隐藏，同时设置其字号的最小值
textFeild.adjustsFontSizeToFitWidth = true
textFeild.minimumFontSize = 14
// 设置对齐方式
// 水平方式
textFeild.textAlignment = .left
// 竖直方式
textFeild.contentVerticalAlignment = .center
// 输入时展示键盘状态
textFeild.keyboardType = .asciiCapable
// 设置输入为密码输入
textFeild.isSecureTextEntry = true
// 取消首字母大写
textFeild.autocapitalizationType = UITextAutocapitalizationType.none
// 添加左侧图表
textFeild.leftView = UIImageView(image: UIImage(named: "test_egg"))
textFeild.leftViewMode = .always
```