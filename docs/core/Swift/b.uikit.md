# UIKit

> UIKit 就是一个核心组件库，提供了许多应用程序的核心对象

## UISearchBar

系统自带搜索框组件，基于 UITextField 实现

```swift5
var searchBar: UISearchBar = UISearchBar()

searchBar.delegate = self // 面向协议，设置协议委托

searchBar.placeholder = "搜索国家" // 设置提示信息

searchBar.showsCancelButton = false // 展示取消按钮，一般自己实现

searchBar.tintColor = UIColor.white // 图标颜色

searchBar.backgroundColor = UIColor.white // 设置搜索框背景色

searchBar.ud_setFontSize(14) // 输入文字size

/**
 * 设置搜索栏样式
 * .default 输入框外侧灰暗
 * .minimal 输入框内侧灰暗
 */
searchBar.searchBarStyle = .minimal

/**
 * 设置文本颜色
 * 通过 barStyle 来设置
 * 自定义设置
 */
searchBar.barStyle = ThemeCreator.current.contains("dark") ? .blackTranslucent : .default 
let textFieldInsideSearchBar = searchBar.value(forKey: "searchField") as? UITextField
textFieldInsideSearchBar?.textColor = UTheme.textColor.bcancel

// 利用 UISearchBarDelegate 来执行事件，对用户交互作出反应
extension ContactListViewController: UISearchBarDelegate {
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
		// statements
    }
}
```


## UITextField

Swift 内通过 `UITextField` 来输入文本

```swift5
let textFeild = UITextField()

textFeild.placeholder = "请输入" // 提示

textFeild.backgroundColor = UIColor.white // 背景颜色

textFeild.textColor = UIColor.black // 输入文字颜色

textFeild.tintColor = UIColor.white // 设置光标颜色

textFeild.autocorrectionType = UITextAutocorrectionType.no // 是否自动纠错

textFeild.keyboardType = .asciiCapable // 输入时展示键盘状态

textFeild.isSecureTextEntry = true // 设置输入为密码输入

textFeild.autocapitalizationType = UITextAutocapitalizationType.none // 取消首字母大写

// 添加左侧icon
textFeild.leftView = UIImageView(image: UIImage(named: "test_egg"))
textFeild.leftViewMode = .always

// 输入文字超过宽度，缩小字号而不是隐藏，同时设置其字号的最小值
textFeild.adjustsFontSizeToFitWidth = true
textFeild.minimumFontSize = 14

// 自定义提示字体样式
textFeild.attributedPlaceholder = NSAttributedString(string: "请输入", attributes: [NSAttributedString.Key.foregroundColor: UIColor.gray, NSAttributedString.Key.font: UIFont.systemFont(ofSize: 15)])

/**
 * 设置对齐方式
 */
textFeild.textAlignment = .left // 水平方式
textFeild.contentVerticalAlignment = .center // 竖直方式

/**
 * 添加下划线
 * 利用边框样式，为边框添加下划线
 * 可以直接添加一条height为1的 UIView 来实现
 */
textFeild.borderStyle = UITextField.BorderStyle.none
textFeild.layer.backgroundColor = UIColor.white.cgColor
textFeild.layer.masksToBounds = false
textFeild.layer.shadowColor = UIColor.gray.cgColor
textFeild.layer.shadowOffset = CGSize(width: 0, height: 1.0)
textFeild.layer.shadowOpacity = 1.0
textFeild.layer.shadowRadius = 0.0
```