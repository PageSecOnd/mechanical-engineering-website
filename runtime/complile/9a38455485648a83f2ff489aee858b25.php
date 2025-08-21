<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta name="renderer"  content="webkit">
  <title><?php echo CMSNAME;?>管理中心-V<?php echo APP_VERSION;?>-<?php echo RELEASE_TIME;?></title>
  <link rel="shortcut icon" href="<?php echo SITE_DIR;?>/favicon.ico" type="image/x-icon">
  <link rel="stylesheet" href="<?php echo APP_THEME_DIR;?>/layui/css/layui.css?v=v2.5.4">
  <link rel="stylesheet" href="<?php echo APP_THEME_DIR;?>/font-awesome/css/font-awesome.min.css?v=v4.7.0" type="text/css">
  <link rel="stylesheet" href="<?php echo APP_THEME_DIR;?>/css/comm.css?v=v3.0.6">
  <link href="<?php echo APP_THEME_DIR;?>/css/jquery.treetable.css" rel="stylesheet" type="text/css" />
  <script type="text/javascript" src="<?php echo APP_THEME_DIR;?>/js/jquery-1.12.4.min.js"></script>
  <script type="text/javascript" src="<?php echo APP_THEME_DIR;?>/js/jquery.treetable.js"></script>
</head>

<body class="layui-layout-body">

<!--定义部分地址方便JS调用-->
<div style="display: none">
	<span id="controller" data-controller="<?php echo C;?>"></span>
	<span id="url" data-url="<?php echo URL;?>"></span>
	<span id="preurl" data-preurl="<?php echo url('/admin',false);?>"></span>
	<span id="sitedir" data-sitedir="<?php echo SITE_DIR;?>"></span>
	<span id="mcode" data-mcode="<?php echo get('mcode');?>"></span>
</div>

<div class="layui-layout layui-layout-admin">
  <div class="layui-header">
    <div class="layui-logo">
    <a href="<?php echo \core\basic\Url::get('/admin/Index/home');?>">
    <img src="<?php echo APP_THEME_DIR;?>/images/logo.png" height="30">
	    <?php echo CMSNAME;?> 
	   	<?php if (LICENSE==3) {?>
	   		<span class="layui-badge">SVIP</span>
	   	<?php } else { ?>
	   		<span class="layui-badge layui-bg-gray">V<?php echo APP_VERSION;?></span>	
	   	<?php } ?>
    </a>
    </div>
    
    <ul class="menu">
    	<li class="menu-ico" title="显示或隐藏侧边栏"><i class="fa fa-bars" aria-hidden="true"></i></li>
	</ul>
	<?php if (!$this->getVar('one_area')) {?>
	<form method="post" action="<?php echo \core\basic\Url::get('/admin/Index/area');?>" class="area-select">
		<input type="hidden" name="formcheck" value="<?php echo $this->getVar('formcheck');?>" > 
		<div class="layui-col-xs8">
		   <select name="acode">
		       <?php echo $this->getVar('area_html');?>
		   </select>
		</div>
		<div class="layui-col-xs4">
		 	<button type="submit" class="layui-btn layui-btn-sm">切换</button>
		</div>
   	</form>
 	<?php } ?>

    <ul class="layui-nav layui-layout-right">
    
       <li class="layui-nav-item layui-hide-xs">
      	 <a href="<?php echo SITE_DIR;?>/" target="_blank"><i class="fa fa-home" aria-hidden="true"></i> 网站主页</a>
       </li>

       <li class="layui-nav-item layui-hide-xs">
       		<a href="<?php echo \core\basic\Url::get('/admin/DeleCache/index');?>"><i class="fa fa-trash-o" aria-hidden="true"></i> 清理缓存</a>
       </li>

       <li class="layui-nav-item layui-hide-xs">
	        <a href="javascript:;">
	          <i class="fa fa-user-circle-o" aria-hidden="true"></i> <?php echo session('realname');?>
	        </a>
	        <dl class="layui-nav-child">
	          <dd><a href="<?php echo \core\basic\Url::get('/admin/Index/ucenter');?>"><i class="fa fa-address-card-o" aria-hidden="true"></i> 密码修改</a></dd>
	          <dd><a href="<?php echo \core\basic\Url::get('/admin/Index/loginOut');?>"><i class="fa fa-sign-out" aria-hidden="true"></i> 退出登录</a></dd>
	          <?php if (session('ucode')==10001) {?>
	          	<dd><a href="<?php echo \core\basic\Url::get('/admin/Upgrade/index');?>"><i class="fa fa-cloud-upload" aria-hidden="true"></i> 在线更新</a></dd>
	          	<dd><a href="<?php echo \core\basic\Url::get('/admin/Index/clearSession');?>" class="ajaxlink"><i class="fa fa-trash-o" aria-hidden="true"></i> 清理会话</a></dd>
	          <?php } ?>
	        </dl>
      </li>
    </ul>
  </div>
  
  <div class="layui-side layui-bg-black">
    <div class="layui-side-scroll">
      <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
      <ul class="layui-nav layui-nav-tree" id="nav" lay-shrink="all">
	   <?php $num = 0;foreach ($this->getVar('menu_tree') as $key => $value) { $num++;?>
        <li class="layui-nav-item nav-item <?php if ($this->getVar('primary_menu_url')==$value->url) {?>layui-nav-itemed<?php } ?>">
          <a class="" href="javascript:;"><i class="fa <?php echo $value->ico; ?>" aria-hidden="true"></i><?php echo $value->name; ?></a>
          <dl class="layui-nav-child">
			<?php if ($value->mcode=='M130') {?>
				 <?php $num3 = 0;foreach ($this->getVar('menu_models') as $key3 => $value3) { $num3++;?>
				 	<?php if ($value3->type==1) {?>
						<dd><a href="<?php echo \core\basic\Url::get('/admin/Single/index/mcode/'.$value3->mcode.'');?>"><i class="fa fa-file-text-o" aria-hidden="true"></i><?php echo $value3->name; ?>内容</a></dd>
					<?php } ?>
					<?php if ($value3->type==2) {?>
						<dd><a href="<?php echo \core\basic\Url::get('/admin/Content/index/mcode/'.$value3->mcode.'');?>"><i class="fa fa-file-text-o" aria-hidden="true"></i><?php echo $value3->name; ?>内容</a></dd>
					<?php } ?>
				 <?php } ?>
			<?php } else { ?>
				<?php $num2 = 0;foreach ($value->son as $key2 => $value2) { $num2++;?>
					<?php if (!isset($value2->status)|| $value2->status==1) {?>
	            		<dd><a href="<?php echo \core\basic\Url::get(''.$value2->url.'');?>"><i class="fa <?php echo $value2->ico; ?>" aria-hidden="true"></i><?php echo $value2->name; ?></a></dd>
	            	<?php } ?>
				<?php } ?>
				
				<?php if ($value->mcode=='M101' && session('ucode')==10001) {?>
					<dd><a href="<?php echo \core\basic\Url::get('/admin/Upgrade/index');?>"><i class="fa fa-cloud-upload" aria-hidden="true"></i>在线更新</a></dd>
				<?php } ?>
		    <?php } ?>
          </dl>
        </li>
		<?php } ?>
		
		<li style="height:1px;background:#666" class="layui-hide-sm"></li>
		
		<li class="layui-nav-item layui-hide-sm">
		 <a href="<?php echo SITE_DIR;?>/" target="_blank"><i class="fa fa-home" aria-hidden="true"></i> 网站主页</a>
		</li>
		
		<li class="layui-nav-item layui-hide-sm">
          <a href="<?php echo \core\basic\Url::get('/admin/Index/ucenter');?>"><i class="fa fa-address-card-o" aria-hidden="true"></i> 资料修改</a>
        </li>
        
        <li class="layui-nav-item layui-hide-sm">
         <a href="<?php echo \core\basic\Url::get('/admin/DeleCache/index');?>"><i class="fa fa-trash-o" aria-hidden="true"></i> 清理缓存</a>
        </li>
        
        <li class="layui-nav-item layui-hide-sm">
         <a href="<?php echo \core\basic\Url::get('/admin/Index/loginOut');?>"><i class="fa fa-sign-out" aria-hidden="true"></i> 退出登录</a>
        </li>

      </ul>
    </div>
  </div>
  
<div class="layui-body">
	
	<?php if (!$this->getVar('dbsecurity')||!session('pwsecurity')) {?>
	<blockquote class="layui-elem-quote layui-text-red" id="note">
        <?php if (!$this->getVar('dbsecurity')) {?>
		<p>
			<i class="fa fa-info-circle" aria-hidden="true"></i>
			您的数据库文件存在安全隐患，可能被下载，请尽快修改数据库路径！<a class="layui-btn  layui-btn-sm" href="<?php echo \core\basic\Url::get('/admin/Index/home');?>&action=moddb">自动修改</a>
		</p>
		<?php } ?>
		<?php if ($this->getVar('currenturlnotsafe')) {?>
		<p>
			<i class="fa fa-info-circle" aria-hidden="true"></i>
			当前后台文件名为admin.php,不安全！不安全！不安全！请修改网站根目录的admin.php文件成只有自己知道的文件名。文件名修改后，后台新访问地址为：你的域名/你改的后台文件名.php
		</p>
		<?php } ?>
		
		<?php if (!session('pwsecurity')) {?>
		<p>
			<i class="fa fa-info-circle" aria-hidden="true"></i>
			 您的账号密码为初始密码，存在安全隐患，请尽快修改密码！<a class="layui-btn  layui-btn-sm" href="<?php echo \core\basic\Url::get('/admin/Index/ucenter');?>">立即修改</a>
		</p>
		<?php } ?>
    </blockquote>
    <?php } ?>
    
    <blockquote class="layui-elem-quote">
    	当前登录用户：<?php echo @$this->getVar('user_info')->username;?> <?php echo @$this->getVar('user_info')->realname;?>，登录时间：<?php echo @$this->getVar('user_info')->update_time;?>，登录IP：<?php echo long2ip($this->getVar('user_info')->last_login_ip);?>，累计登录次数：<?php echo @$this->getVar('user_info')->login_count;?>
    </blockquote>
	
	<fieldset class="layui-elem-field">
		<legend>快捷操作</legend>
		<div class="layui-field-box">	
			<div class="layui-row">
				<?php $num = 0;foreach ($this->getVar('model_msg') as $key => $value) { $num++;?>
				<div class="layui-col-xs6 layui-col-sm4 layui-col-md3 layui-col-lg2">
		    		<?php if ($value->type==1) {?>
		    		<a href="<?php echo \core\basic\Url::get('/admin/Single/index/mcode/'.$value->mcode.'');?>">
		    		<?php } else { ?>
		    		<a href="<?php echo \core\basic\Url::get('/admin/Content/index/mcode/'.$value->mcode.'');?>">
		    		<?php } ?>
			      		<dl class="deskbox center-block">
			      			 <dt><?php echo $value->name; ?></dt>
		                     <dd><?php echo $value->count; ?></dd>
		                 </dl>
		             </a>
		   	    </div>
	   	    	<?php } ?>
	   	    	
				<div class="layui-col-xs6 layui-col-sm4 layui-col-md3 layui-col-lg2">
		    		<a href="<?php echo \core\basic\Url::get('/admin/Message/index');?>">
			      		<dl class="deskbox center-block">
			      			 <dt>留言</dt>
		                     <dd><?php echo $this->getVar('sum_msg');?></dd>
		                 </dl>
		             </a>
		   	    </div>
	   	    </div>
		 </div>
	 </fieldset>
	 
	 <div class="layui-row layui-col-space10">
	 	<div class="layui-col-xs12 layui-col-md6">
			<table class="layui-table table-two">
				  <thead>
				  	<tr>
				  		<th colspan="2">系统信息</th>
				  	</tr>
				  </thead>
				  <tbody>
				     <tr>
				      	<th width="100">应用版本</th>
				      	<td>PbootCMS V<?php echo APP_VERSION;?>-<?php echo RELEASE_TIME;?> 
				      	 <?php if (session('ucode')==10001) {?>
				      		<a href="javascript:void(0)" onclick="Notice()" class="layui-btn layui-btn-xs" id="check">在线更新</a> <a class="layui-btn layui-btn-xs" href="https://www.adminbuy.cn/a/wenti/9580.html" target="_blank" style="background:#F00">安全防护（毕看）</a>
				         <?php } ?>
				      	</td>
				     </tr>
				     <tr>
				      	<th>主机系统</th>
				      	<td><?php echo @$this->getVar('server')->php_os;?></td>
				     </tr>
				     <tr>
				      	<th>主机地址</th>
				      	<td><?php echo @$this->getVar('server')->server_name;?>（<?php echo @$this->getVar('server')->server_addr;?>:<?php echo @$this->getVar('server')->server_port;?>）</td>
				     </tr>
				     <tr>
				      	<th>WEB软件</th>
				      	<td><?php echo @$this->getVar('server')->server_software;?></td>
				     </tr>
				     <tr>
				      	<th>PHP版</th>
				      	<td><?php echo @$this->getVar('server')->php_version;?></td>
				     </tr>
				     <tr>
				      	<th>数据库驱动</th>
				      	<td><?php echo @$this->getVar('server')->db_driver;?></td>
				     </tr>
				     <tr>
				      	<th>文件上传限制</th>
				      	<td><?php echo @$this->getVar('server')->upload_max_filesize;?></td>
				     </tr>
				     <tr>
				      	<th>表单提交限制</th>
				      	<td><?php echo @$this->getVar('server')->post_max_size;?></td>
				     </tr>
				  </tbody> 
			</table> 
	 	</div>
	 	
	 	<div class="layui-col-xs12 layui-col-md6">
			<table class="layui-table table-two">
				  <thead>
				  	<tr>
				  		<th colspan="2">开发信息</th>
				  	</tr>
				  </thead>
				 
				  <tbody>
				  	<tr>
	                    <th>系统名称</th>
	                    <td><?php echo CMSNAME;?>企业网站开发建设管理系统</td>
	                </tr>
	
	                
	                
				  	<tr>
	                    <th>模板下载</th>
	                    <td>
	                    	<a href="https://www.adminbuy.cn/" style="color:#666" target="_blank">www.adminbuy.cn</a>
	                    </td>
	                </tr>
	                
	                
	                
	                <tr>
	                    <th>图标下载</th>
	                    <td><a href="https://sc.adminbuy.cn" style="color:#666" target="_blank">sc.adminbuy.cn</a></td>
	                </tr>
	               
	                <tr>
	                    <th>js特效</th>
	                    <td><a href="https://js.adminbuy.cn" style="color:#666" target="_blank">js.adminbuy.cn</a></td>
	                </tr>
                    <tr>
	                    <th>在线工具</th>
	                    <td><a href="https://tool.adminbuy.cn" target="_blank" style="color:#666">tool.adminbuy.cn</a></td>
	                </tr>
                    <tr>
	                    <th>仿站制作</th>
	                    <td><a href="http://fang.adminbuy.cn" target="_blank" style="color:#666">fang.adminbuy.cn</a></td>
	                </tr>
	                <tr>
	                    <th>VIP赠品获取</th>
	                    <td><a href="https://www.adminbuy.cn/work/zp.html" target="_blank" style="color:#666">点击获取</a></td>
	                </tr>
                    <tr>
	                    <th>技术支持</th>
	                    <td><a href="https://wpa.qq.com/msgrd?v=3&uin=9490489&site=qq&menu=yes" target="_blank" style="color:#666">QQ：9490489</a>&nbsp;&nbsp;&nbsp;&nbsp;<a>微信号：wwwadminbuycn</a></td>
	                </tr>
				  </tbody>
			</table>
	 	</div>
	 </div>
</div>
<input type="hidden" id="do_check" data-url="<?php echo \core\basic\Url::get('/admin/Upgrade/check');?>">
<input type="hidden" id="do_down" data-url="<?php echo \core\basic\Url::get('/admin/Upgrade/down');?>">
<input type="hidden" id="do_update" data-url="<?php echo \core\basic\Url::get('/admin/Upgrade/update');?>">
<input type="hidden" id="check_version" data-url="/index.php?p=upgrade/check&version=<?php echo APP_VERSION;?>.<?php echo RELEASE_TIME;?>.<?php echo $this->getVar('revise');?>&branch=<?php echo $this->getVar('branch');?>&snuser=<?php echo $this->getVar('snuser');?>&site=<?php echo $this->getVar('site');?>">
<input type="hidden" id="check_cache" data-url="<?php echo \core\basic\Url::get('/admin/Upgrade/checkCache');?>">
</div>

<script type="text/javascript" src="<?php echo APP_THEME_DIR;?>/layui/layui.all.js?v=v2.5.4"></script>
<script type="text/javascript" src="<?php echo APP_THEME_DIR;?>/js/comm.js?v=v3.1.1"></script>
<script type="text/javascript" src="<?php echo APP_THEME_DIR;?>/js/mylayui.js?v=v3.1.0"></script>

<!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
<!--[if lt IE 9]>
  <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
  <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

</body>
</html>

<?php return array (
  0 => '/www/wwwroot/mykygcjx/apps/admin/view/default/common/head.html',
  1 => '/www/wwwroot/mykygcjx/apps/admin/view/default/common/foot.html',
); ?>