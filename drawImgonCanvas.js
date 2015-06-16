(function() {
  var print_img_id = 'print_img';
  var print_DataURL_id = 'print_DataURL';
  var canvas = document.getElementById('mycanvas');
  if ( checkFileApi() && checkCanvas(canvas) ){
    //ファイル選択
    var file_image = document.getElementById('file-image');
    file_image.addEventListener('change', selectReadfile, false);

    //ドラッグオンドロップ
    var dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleDragDropFile, false);
  }

  //canvas に対応しているか
  function checkCanvas(canvas){
    if (!canvas || !canvas.getContext){
      return false;
    }
    return true;
  }

  // FileAPIに対応しているか
  function checkFileApi() {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
      return true;
    }
    alert('The File APIs are not fully supported in this browser.');
    return false;
  }

  //ファイルが選択されたら読み込む
  function selectReadfile(e) {
    var file = e.target.files;
    var reader = new FileReader();
    //dataURL形式でファイルを読み込む
    reader.readAsDataURL(file[0]);
    //ファイルの読込が終了した時の処理
    reader.onload = function(){
      readDrawImg(reader, canvas, 0, 0);
    }
  }

  //ドラッグオンドロップ
  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }
  function handleDragDropFile(e) {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files; // FileList object.
    var file = files[0];
    var reader = new FileReader();
    //dataURL形式でファイルを読み込む
    reader.readAsDataURL(file);

    //ファイルの読込が終了した時の処理
    reader.onload = function(){
      readDrawImg(reader, canvas, 0, 0);
    }

  }

  function readDrawImg(reader, canvas, x, y){
    var img = readImg(reader);
    drawImgOnCav(canvas, img, x, y);
  }

  //ファイルの読込が終了した時の処理
  function readImg(reader){
    //ファイル読み取り後の処理
    var result_dataURL = reader.result;
    var img = new Image();
    img.src = result_dataURL;
    return img;
  }

  //キャンバスにImageを表示
  function drawImgOnCav(canvas, img, x, y) {
    img.onload = function(){
      var ctx = canvas.getContext('2d');
      var wrapper= document.getElementById("print_img");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, x, y, img.width, img.height);
      printWidthHeight( "width-height", img.width, img.height )
    }
  }

  //width, height表示
  function printWidthHeight( width_height_id, width, height ) {
    var w = width;
    var h = height;
    document.getElementById(width_height_id).innerHTML = 'width:' + w + ' height:' + h;
  }
})();
