import gifAnimation.* ;
GifMaker gifExport;
int fcount = 0 ;
void shot_gif(){
  int count = 0 ;
  String mypath  = System.getProperty("user.home") ;
  String path = mypath + "/Desktop/save/screenshot" + count + ".gif" ;
  gifExport = new GifMaker(this, path); // GifMakerオブジェクトを作る、第2引数にファイル名
  gifExport.setRepeat(0) ; // エンドレス再生
  gifExport.setQuality(10) ; // クオリティ(デフォルト10)
  gifExport.setDelay(20) ; // アニメーションの間隔を20ms(50fps)に
  count++ ;
}



void frame(){
  if(fcount>0){
  if(frameCount <= 50*3){
    gifExport.addFrame(); // フレームを追加
    } else {
     gifExport.finish(); // 終了してファイル保存
    }
  }
  fcount++ ;
}
