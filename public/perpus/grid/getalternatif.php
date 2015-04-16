<?php
/*
	$page = isset($_POST['page']) ? intval($_POST['page']) : 1;
	$rows = isset($_POST['rows']) ? intval($_POST['rows']) : 10;
    $sort = isset($_POST['sort']) ? strval($_POST['sort']) : 'username';  
    $order = isset($_POST['order']) ? strval($_POST['order']) : 'asc';  
	$offset = ($page-1)*$rows;  
	$result = array(); 
*/

	include 'konek_perpus.php';
	$qry="select count(*) from alternatif";
	$rs = mysql_query($qry);
	$row = mysql_fetch_row($rs);
	$result["total"] = $row[0];
/*    $query="select id,username,des_decrypt(password) `password`,hak from users order by $sort $order limit $offset,$rows";
	$rs = mysql_query($query);   //,md5(password) `password`
*/	
	$query="select * from alternatif";
	$rsa=mysql_query($query);
	$items = array();
	while($row = mysql_fetch_object($rsa)){
		//$items[]=('username:'.$row->username);
        $items[]=$row;
	}
	$result["rows"] = $items;
	echo json_encode($result);
    //echo $query;

?>