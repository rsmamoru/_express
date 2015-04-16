<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Alternatif</title>
<script type="text/javascript">
$(function () {
    $("#list").jqGrid({
        url: "grid/getalternatif.php",
        datatype: "json",
        mtype: "GET",
        colNames: ["ID Alt", "No. KK", "Nama KK", "Alamat"],
        colModel: [
            { name: "id_alt",sortable: false },
            { name: "no_kk", sortable: false},
            { name: "nm_kepala",sortable: false },
            { name: "alamat",sortable: false }
        ],
        pager: "#pager",
        rowNum: 10,
		rownumbers: true,
        rowList: [5, 10, 15],
		height: 'auto',
        width: '500',
		loadonce: true,
        caption: "Alternatif"
    }); 
}); 
</script>
 
</head>
<body>
    <table id="list"><tr><td></td></tr></table> 
    <div id="pager"></div> 
</body>
</html>