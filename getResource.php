<?php 
	$barrage = array(
				0 => array('barrage' => '这个不错' ,
							 'src' => 'images/1.jpg'),
				1 => array('barrage' => '看起来可以' ,
							 'src' => 'images/2.jpg'),
				2 => array('barrage' => '哇哇哇哇哇啊哇这个好萌啊啊啊' ,
							 'src' => 'images/3.jpg')
				// 3 => array('name' => '黄胖子24' ,
				// 			 'src' => 'images/4.jpg'),
				// 4 => array('name' => '黄胖子25' ,
				// 			 'src' => 'images/5.jpg'),
				// 5 => array('name' => '黄胖子26' ,
				// 			 'src' => 'images/6.jpg'),
				// 6 => array('name' => '黄胖子27' ,
				// 			 'src' => 'images/7.jpg'),
				// 7 => array('name' => '黄胖子28' ,
				// 			 'src' => 'images/8.jpg')
				);
	echo json_encode($barrage);
?>