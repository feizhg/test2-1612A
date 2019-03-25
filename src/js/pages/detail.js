define(['mui','util'], (mui,util) =>{
	const comment = document.getElementById('comment');
	function init() {
		mui.init();
		let _id = util.getParam()._id; // 获取商品ID
		// 获取商品详情数据
		getDetail(_id);
		// 获取评论数据
		getComment(_id);
		// 调用绑定事件
		addEvent(_id);
	}
	function getDetail(_id) {
		
		mui.ajax('/api/getDetail',{
			data:{"_id":_id},
			success(rs){
				if(!rs.code){
					return;
				}
				render(rs.data)
			}
		})
	}
	function getComment(p_id) {
		mui.ajax('/api/getComment',{
			data:{"p_id":p_id},
			success(rs){
				if(!rs.code){
					return;
				}
				// console.log(rs);
				renderComment(rs.data)
			}
		})
	}
	function render(data){
		const wrap = document.getElementById('wrap');
		wrap.innerHTML = data.map((item) => {
			return `<div class="mui-card">						
					 <div class="mui-card-header">${item.name}</div> 					
					 <div class="mui-card-content">
							<img src="img/1.jpg" alt="">
					</div>
					 <div class="mui-card-footer">
							<span>点赞</span>
							<span>评论</span>
							<span>转发</span>
						</div> 
					 </div> `;
		}).join('');
	}
	function renderComment(data){
		
		comment.innerHTML = data.map((item) => {
			return `<li class="mui-table-view-cell">${item.content}</li>`;
		}).join('');
	}
	function addEvent(_id) {
		const submit = document.getElementById('submit');
		const inp = document.getElementById('inp');
		submit.addEventListener('tap',function () {
			let val = inp.value.trim();
			// 非空验证
			if(!val){
				alert('请输入内容');
				return;
			}
			mui.ajax('/api/addComment',{
				type:'post',
				data:{
					"p_id":_id,
					"content":val
				},
				success(rs){
					inp.value = '';
					if(!rs.code){
						return;
					}
					// 添加一行最上面
					addItem(val);
				}
			})
		})
	}
	function addItem(data){
		// 创建LI
		let liNode = document.createElement('li');
		liNode.innerHTML = data;
		comment.insertBefore(liNode,comment.children[0]);
	}
	init();
})