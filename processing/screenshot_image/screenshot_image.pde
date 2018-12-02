void shot(){
  int count = 1 ;
  //デスクトップのパスを所得
  String mypath  = System.getProperty("user.home") ;
  String path = mypath + "/Desktop/save/screenshot" + count + ".jpg" ;

  save(path) ;
  count++ ;
  println("screen saved:" + path) ;
}
