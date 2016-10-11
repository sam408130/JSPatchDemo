autoConvertOCType(1)
include('CommonDefine.js')
include('DBDataSource.js')
include('TimelineController.js')

defineClass('AppDelegate',{
	initRootViewController:function(){
		var tableViewCtrl = TimelineController.alloc().init();
		var navCtrl = require('UINavigationController').alloc().initWithRootViewController(tableViewCtrl);
        self.window().setRootViewController(navCtrl);
	}
})

