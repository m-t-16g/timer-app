'use strict';
///////////////////////////////
//start,stopボタンは利便性を考え
//タイマー作動中は両方一時停止、再開の機能を持たせています
//////////////////////////////

// 表示部分を取得
const timer = document.querySelectorAll('.time');
// インプットボックスを取得
const inputbox = document.querySelectorAll('.input');
// コントロールボタンを取得
const control = document.querySelectorAll('.button');
const start = control[0];
const stop = control[1];
const reset = control[2];
// 一時停止用の変数
let settimer = false;
// 時間を格納するための変数
let targettime;
// 背景点滅のための変数、resetボタンを押したときに初期化するためglobalで宣言
let background;
// 入力欄のチェック用関数
console.log(checknum(''));
function checknum(num) {
  // 全て未入力の場合をはじく
  if (num !== '') {
    const pattern = /^\d*$/;
    return pattern.test(num);
  } else {
    return false;
  }
}
// textboxがクリックされた時に、変化をさせる
for (let i of inputbox) {
  i.onclick = () => {
    i.classList.remove('resetted');
    i.value = '';
  };
  // フォーカスアウトした時に数字以外が入力されていたらリセット時に戻す
}
// 残り時間を秒数に変換する関数
function getinputtime(h, m, s) {
  return h * 3600 + m * 60 + s;
}
// 一時停止用の関数
function pause() {
  if (settimer) {
    settimer = false;
    for (let i of timer) {
      i.classList.add('pause');
    }
  } else {
    settimer = true;
    for (let i of timer) {
      i.classList.remove('pause');
    }
    recalc();
  }
}
// startが押された時の処理
start.onclick = () => {
  const inputh = inputbox[0].value;
  const inputm = inputbox[1].value;
  const inputs = inputbox[2].value;
  // 数値がセットされているか確認
  if (!targettime) {
    // なければ判定して取りに行く
    if (checknum(inputh) || checknum(inputm) || checknum(inputs)) {
      // 文字は0として秒数に変換
      targettime = getinputtime(parseInt(inputh) || 0, parseInt(inputm) || 0, parseInt(inputs) || 0);
      // カウントダウン処理を開始
      settimer = true;
      timedisplay();
    } else {
      // いずれも数値が入力されていない場合
      window.alert('入力欄のいずれかには数字を入力してください');
      resetall();
    }
  } else {
    // 数値がセットされてる場合タイマーを再始動する
    pause();
  }
};
// ストップボタンが押された時の処理、
stop.onclick = () => {
  // ストップボタンが押された時タイマーを一時停止、カウントダウン完了しているときはリセット
  targettime <= 0 ? resetall() : pause();
};
// リセットボタンが押された時の処理
reset.onclick = () => {
  resetall();
};
// 画面初期化の関数
function resetall() {
  settimer = false;
  targettime = null;
  for (let i of inputbox) {
    i.classList.add('resetted');
  }
  for (let i of timer) {
    i.classList.remove('pause');
  }
  inputbox[0].value = 'h';
  inputbox[1].value = 'm';
  inputbox[2].value = 's';
  for (let i of timer) {
    i.textContent = '00';
  }
  document.body.style = 'background:#222;';
  background = false;
}
// 秒数をカウントダウンする関数
function timedisplay() {
  if (settimer === true) {
    if (targettime >= 0) {
      console.log(targettime);
      const vsec = targettime % 60;
      const vmin = Math.floor(targettime / 60) % 60;
      const vhour = Math.floor(targettime / 3600);
      timer[0].textContent = String(vhour).padStart(2, '0');
      timer[1].textContent = String(vmin).padStart(2, '0');
      timer[2].textContent = String(vsec).padStart(2, '0');
      targettime--;
      recalc();
    } else {
      finish();
    }
  }
}
// タイマーが動いているとき一秒ごとに回す、一時停止から再始動した時もここへ
// タイマー終了時もここをつかって画面点滅を回す
function recalc() {
  if (settimer === true) {
    if (targettime >= 0) {
      setTimeout(timedisplay, 1000);
    } else {
      setTimeout(finish, 250);
    }
  }
}
// 時間終了時に背景を点滅させる処理
function finish() {
  if (background) {
    document.body.style = 'background:#222;';
    background = false;
  } else {
    document.body.style = 'background:#FF0;';
    background = true;
  }
  recalc();
}
resetall();
