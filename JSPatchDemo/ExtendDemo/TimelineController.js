include('TimelineView.js')


defineClass('TimelineController:UITableViewController',[
	'loadingView',
	'isLoading',
	'shots',
	'currPage'
],{
	init:function(){
		self = self.super().init();

		var loadingView = require('UIActivityIndicatorView').alloc().initWithActivityIndicatorStyle(2);
		loadingView.setFrame({x: (SCREEN_WIDTH - 40) / 2 , y: (SCREEN_HEIGHT - 40 - 64) / 2 , width:40, height:40});
		loadingView.startAnimating();
		self.view().addSubview(loadingView);
		self.setLoadingView(loadingView);


		self.tableView().setBackgroundColor(UIColor.colorWithWhite_alpha(0.9,1));
		self.tableView().setSeparatorStyle(0);
		self.tableView().registerClass_forCellReuseIdentifier(TimelineViewCell.class(), "picell");
		self.setTitle('ExtendDemo');

		self.setShots([]);
		self.setCurrPage(1);
		self._loadShots();

		return self;
	},


	_loadShots:function(){

		self.setIsLoading(1)
		var perPage = 20;
		var slf = self;

		DBDataSource.shareInstance().loadPublicShots(self.currPage(), perPage, function(shots){
			slf.loadingView().removeFromSuperview();
			slf.setShots(slf.shots().concat(shots));
			slf.setCurrPage(slf.currPage() + 1);
			slf.setIsLoading(0);

			slf.tableView().reloadData();
		},function(){
			//fail
		})

	},

	numberOfSectionsInTableView:function(tableView){
		return 1;
	},

	tableView_numberOfRowsInSection:function(tableView,seciton){
		return self.shots().length ;
	},

	tableView_cellForRowAtIndexPath:function(tableView,indexPath){
		var cell = tableView.dequeueReusableCellWithIdentifier_forIndexPath("picell",indexPath);
		cell.setSelectionStyle(0);
		var weakSelf = __weak(self);

		cell.renderWithItems(self.shots()[indexPath.row()]);
		return cell;
	},

	tableView_heightForRowAtIndexPath:function(tableView,indexPath){
		return (SCREEN_WIDTH - 10 * 2) * 3/4 + 50;
	},

	_handleGotoItem:function(item){
		//跳转
        console.log(item);
	}

})
