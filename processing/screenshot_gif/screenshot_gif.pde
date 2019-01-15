import gifAnimation.* ;
GifMaker gifExport;
int fcount = 0 ;
void shot_gif(){

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
  String path = mypath + "/Desktop/save/" + fullpath + "[" + time + "].gif" ;
  gifExport = new GifMaker(this, path); // GifMakerオブジェクトを作る、第2引数にファイル名
  gifExport.setRepeat(0) ; // エンドレス再生
  gifExport.setQuality(10) ; // クオリティ(デフォルト10)
  gifExport.setDelay(20) ; // アニメーションの間隔を20ms(50fps)に

}

void frame(){
  if(fcount>0){
    if(frameCount <= 50){//どこでgifを切るか決める
      gifExport.addFrame(); // フレームを追加
      } else {
        gifExport.finish(); // 終了してファイル保存
        exit() ;
      }
    }
    fcount++ ;
  }
