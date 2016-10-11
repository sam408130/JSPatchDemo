var _dataSourceShareInstance;

defineClass('DBDataSource',{
	init:function(){
		this.host = 'https://api.dribbble.com/v1';
		this.requestManager = require('AFHTTPRequestOperationManager').manager();
    	this.requestManager.requestSerializer().setValue_forHTTPHeaderField('Bearer deeb37c0823d3866650db12df9e36730a0453a5a7b8e6493e0ac5ece15929613', 'Authorization');
    	return this;
	},

	_get:function(path,params,succ,fail){
		var url = this.host + path;
		this.requestManager.GET_parameters_success_failure(url,params,
			block('AFHTTPRequestOperation *, id', function(operation, responseObject){
				if(succ) succ(responseObject);
			}),

			block('AFHTTPRequestOperation *, NSError *', function(operation, error){
				if(fail) fail(error);
			})

		);
	},

	loadPublicShots:function(page,per_page,succ,fail){
		var path = '/shots';
		this._get(path,{page:page, per_page:per_page},succ,fail);
	},


}, {
	shareInstance:function(){
		if(!_dataSourceShareInstance){
			_dataSourceShareInstance = DBDataSource.alloc().init();
		}
		return _dataSourceShareInstance;
	},
})
