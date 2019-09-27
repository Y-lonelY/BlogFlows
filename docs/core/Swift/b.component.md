# UIKit Components

> 简单理解，UIKit 就是一个核心组件库，记录其常用的核心对象

## UISearchBar

系统自带搜索框组件，基于 UITextField 实现

```swift
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

```swift
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

## UITableView

> A view that presents data using rows arranged in a single column.

根据官方说明，是一种展示单列多行垂直滚动内容的视图控件，和HTML中的 table 标签还是有区别的

`class UITableView : UIScrollView` 继承至滚动视图

```Swift
/**
 * 表格的基类
 * 通过面向协议编程来为其添加扩展功能
 * 注意对其进行协议委托
 * 同时通过自定义 cell 来实现更多功能
 * 利用 tableView.reloadData() 来实现表格内容刷新
 */
import UIKit

class ContactListViewController: UIViewController {
    var data = [
        ("热门国家",[
            ["text": "中国", "key": "a"],
            ["text": "米国", "key": "b"]
        ])
    ]
    // 用于展示快速跳转的 index
    var sortArray = ["热"]
    var tableView: UITableView!
    let identifier = "reuseCell"

    fileprivate func initView() {
        // 布局相关...
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        initView()
        // 设置协议委托
        tableView.dataSource = self
        tableView.delegate = self
        // 注册自定义的 cell
        self.tableView.register(NormalizeTableCell.self, forCellReuseIdentifier: identifier)
    }
}

// 面向协议编程
extension ContactListViewController:UITableViewDelegate,UITableViewDataSource, UIScrollViewDelegate {
    // 表格继承至滑动组件，在滑动触发事件
    func scrollViewWillBeginDragging(_ scrollView: UIScrollView) {
    	// statement
    }
    
    // 在滑动停止时事件
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        // statement
    }
    
    // section 个数
    func numberOfSections(in tableView: UITableView) -> Int {
        return data.count
    }
    
    // 每个 section 内数据个数
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return data[section].1.count
    }
    
    // cell 内容
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    	// 自定义 cell
        let cell = tableView.dequeueReusableCell(withIdentifier: identifier) as! NormalizeTableCell
        cell.setCellValue(value: data[indexPath.section].1[indexPath.row], code: selectedCode)
        return cell
    }
    
    // 每行高度
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 48
    }
    
    // 每个 section 的 header 高度
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 30
    }
    
    // 每个 section 的view
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let view = UIView()
        viewLabel.text = data[section].0
        // 其他相关样式设置
        return view
    }
    
    // 索引值数组，用于展示右侧快速跳转列表，利用 index 寻找对应关系
    func sectionIndexTitles(for tableView: UITableView) -> [String]? {
        return self.sortArray
    }
    
    // 返回用户点击快速选择后的 index
    func tableView(_ tableView: UITableView, sectionForSectionIndexTitle title: String, at index: Int) -> Int {
        return index
    }
    
    // cell 点击事件
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        searchBar.resignFirstResponder()
        let code = data[indexPath[0]].1[indexPath[1]]["key"]
        self.selectedCode = code!
        tableView.reloadData()
        // 执行其他业务事件
    }
}
```

自定义的 cell 类，其继承至 **UITableViewCell**

```swift
import UIKit

class NormalizeTableCell: UITableViewCell {
    var label: UILabel!
    var iconView: UIImageView!
    var icon: UIImage = UIImage(named: "star")!
    var selectedLabel: UILabel!
    lazy var cellBox: UIView = UIView()
    
    fileprivate func initView() {
        // 布局相关...
    }
    
    func setCellValue(value: [String: String], code: String) -> Void {
        let keyCode = value["key"]
        label.text = value["text"]
        
        if keyCode == code {
            label.textColor = UIColor.black
            selectedLabel.text = "✓"
            cellBox.addSubview(selectedLabel)
            selectedLabel.snp.makeConstraints { (make) in
                make.trailing.equalToSuperview().inset(20)
                make.centerY.equalToSuperview()
            }
        }
    }
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        initView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    // 重新设置 cell 被按下时样式
    override func setHighlighted(_ highlighted: Bool, animated: Bool) {
        if highlighted {
            self.backgroundColor = UIColor.white
        }
    }
    
    // 在每次 cell reuse 的时候进行初始化，避免被重复使用的 cell 样式
    // 在 initview() 执行之后，setValue() 执行之前
    override func prepareForReuse() {
        label.textColor = nil
        selectedLabel.text = nil
    }
}
```


## UIImageView

Swift 内通过 `UIImage` 来加载图片，通过 `UIImageView()` 来创建图片视图，介绍一些其基本用法：

```Swift
// 加载图片
let image = UIImage(named: "IMG_0673")
// 创建一个图像视图
let imgView = UIImageView(image: image)
// 设置图像展示区域
imgView.frame = CGRect(x: 27, y: 60, width: 360, height: 760)
// 设置 border width && color
imgView.layer.borderWidth = 10
imgView.layer.borderColor = UIColor.lightGray.cgColor
// 添加圆角
imgView.layer.cornerRadius = 30
// 设置图层遮照覆盖属性，进行边界裁边
imgView.layer.masksToBounds = true
```

通过 `imgView.image = UIImage(name: "else images")` 来更新图片


## UILabel

Swift 内通过 `UILabel` 来展示文本内容

```Swift
let label = UILabel()
box1.addSubview(label)
// 添加文本内容
label.text = "Hello World!"
// 添加font-size && font-weight
label.font = UIFont.boldSystemFont(ofSize: 20)
// 设置 color，withAlphaComponent 设置透明度
label.textColor = UIColor.black.withAlphaComponent(0.75)
// 设置文本块的背景色
label.backgroundColor = UIColor.white
// 设置文字阴影
label.shadowColor = UIColor.green
label.shadowOffset = CGSize(width: 2, height: 3)
```


## UIButton

Swift 内通过 `UIButton` 来实现按钮

```Swift
let updateBtn = UIButton(frame: CGRect(x: 40, y: 40, width: 325, height: 44))
self.view.addSubview(updateBtn)
// 设置背景
updateBtn.backgroundColor = UIColor.gray
// 设置文本大小
updateBtn.titleLabel?.font = UIFont.systemFont(ofSize: 16)
// 设置圆角
updateBtn.layer.cornerRadius = 8
// 设置文本颜色
updateBtn.setTitleColor(UIColor.red, for: UIControl.State.normal)
// 设置文本
updateBtn.setTitle("点击", for: UIControl.State())
```