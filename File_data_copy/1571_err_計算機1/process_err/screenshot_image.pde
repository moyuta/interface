void shot(){
  //デスクトップのパスを所得
  String mypath  = System.getProperty("user.home") ;
  String fullpath = sketchPath() ;
  String save = "/Users/motegiyuta/Desktop/interface/File_data_copy/" ;
  fullpath = fullpath.replaceAll(save, "");

  int y = year() ;
  int mo = month() ;
  int d = day() ;
  int h = hour() ;
  int mi = minute() ;
  int s = second() ;

  String time = y + "時" + mo + "月" + d + "日" + h + "時" + mi + "分" + s + "秒" ;
  print(time) ;
  String path = mypath + "/Desktop/save/" + fullpath + "[" + time + "].jpg" ;
  save(path) ;
  println("screen saved:" + path) ;
}
//
