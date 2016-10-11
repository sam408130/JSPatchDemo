var gap = 10;
var avatarSize = 40;
require('UILabel, UIColor, UIFont, UITextView');


defineClass('TimelineItemView: UIView',[
	'avatarImageView',
	'nameLabel',
	'contentImageBtn',
	'tapCallback'
],{
	init:function(){
		self = self.super().init();

		var imgGap = 5;
		var width = (SCREEN_WIDTH - 10 * 2);
		self.setFrame({x:0, y : 0, width : width, height: width * 3/4 + 30});
		self.setBackgroundColor(UIColor.whiteColor());

		var contentImageBtn = require('UIImageView')
									.alloc()
									.initWithFrame({x: 0, y: 0, width:width , height:(width)*3/4});

		self.addSubview(contentImageBtn);
		self.setContentImageBtn(contentImageBtn);
		
	    var avatarSize = 18;

	    var avatarImageView = require('UIImageView')
	                            .alloc()
	                            .initWithFrame({x:imgGap, y:contentImageBtn.frame().height + contentImageBtn.frame().y + imgGap + 2, width:avatarSize, height:avatarSize});
	    self.addSubview(avatarImageView);
	    self.setAvatarImageView(avatarImageView);

	    var nameLabel = UILabel
	                      .alloc()
	                      .initWithFrame({x: imgGap + avatarSize + 5, y:avatarImageView.frame().y, width:width - avatarSize - imgGap*2 - 5 , height:avatarSize});
	    nameLabel.setFont(UIFont.systemFontOfSize(12));
	    nameLabel.setTextColor(UIColor.grayColor());
	    self.addSubview(nameLabel);
	    self.setNameLabel(nameLabel);

	    return self;		
	},


	handleTap:function(){
		var cb = self.tapCallback();
		if(cb) cb();
	},

	renderWithItem:function(item){
        
	    self.contentImageBtn().sd__setImageWithURL(require('NSURL').URLWithString(item['images']['normal']));
	    self.avatarImageView().sd__setImageWithURL(require('NSURL').URLWithString(item['user']['avatar_url']));
	    self.nameLabel().setText(item['user']['name']);
	},

})


defineClass('TimelineViewCell:UITableViewCell',[
	'itemView',
	'tapCallback',
],{
	initWithStyle_reuseIdentifier:function(style, reuseIdentifier) {
		self = self.super().initWithStyle_reuseIdentifier(style,reuseIdentifier);
		if(self){
			self.setSelectionStyle(0);
			self.contentView().setBackgroundColor(UIColor.colorWithWhite_alpha(0.9,1));
			self._initItemView();
		}
		return self;
	},

	_initItemView:function(){
		var itemView = TimelineItemView.alloc().init();
		itemView.setFrame({x:gap, y: gap, width: itemView.frame().width, height: itemView.frame().height});
    	self.setItemView(itemView);
    	self.addSubview(itemView);

	},

	renderWithItems:function(item){
	       
        self.itemView().renderWithItem(item);
	    var weakSelf = __weak(self);
	    self.itemView().setTapCallback(function(){
	    	var cb = weakSelf.tapCallback();
	    	if(cb) cb(item);
	    })
	}
}
)



