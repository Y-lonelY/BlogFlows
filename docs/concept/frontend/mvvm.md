# MVVM

MVVM的核心是数据驱动即ViewModel，ViewModel是View和Model的关系映射，怎么理解这句话？

- Model 层，用户从后端获取数据
- View 层，代表用户看到的视图
- ViewModel 则用来处理js对象和视图模版的映射关系，可以理解为数据的抽象画视图，ViewModel 充当着观察者的角色，当 view 或者 model 任一发生了改变，则会通知另一方作出相应的变化，即为数据的双向绑定

MVVM 最具有代表的特性是数据绑定，MVVM 的核心理念是通过声明式的数据绑定来实现 View 的分离，完全解耦 View