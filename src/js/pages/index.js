define(['mui'], () =>{
	
	function init() {
		mui.init();
		// 获取商品列表数据
		getProduct();
		// 调用绑定事件
		addEvent();
	}
	// 获取商品列表数据
	function getProduct() {
		mui.ajax('/api/getProduct', {
			success(rs) {
				if(!rs.code){
					return;
				}
				render(rs.data);
			}
		})
	}
	// 渲染商品
	function render(data){
		const content =document.getElementById('content');
		content.innerHTML = data.map((item) => {
			return `<li class="mui-table-view-cell mui-media li">
						<a href="javascript:;">
							<img class="mui-media-object mui-pull-left" src="img/1.jpg">
							<div class="mui-media-body">
								${item.name}
								<p class='mui-ellipsis'>${item.introduce}</p>
							</div>
						</a>
						<div class="btns">
							<button type="button" class="mui-btn mui-btn-danger" data-id="${item._id}">查看详情</button>
						</div>
					</li>`
		}).join('');
	}
	
	// 绑定事件
	function addEvent() {
		mui('#content').on('tap','.mui-btn', function ()  {
			// 进入到详情
			let _id = this.getAttribute('data-id');
			location.href ='detal.html?_id='+_id;
		})
	}
	init();
})