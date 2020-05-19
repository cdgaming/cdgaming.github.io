//=============================================================================
// DataCacheBlocker.js
// PUBLIC DOMAIN
//=============================================================================

/*:
 * @plugindesc dataフォルダキャッシュ阻止
 * @author user1
 *
 * @help
 * アップデート時のキャッシュによる誤動作防止
 */

(function() {
	'use strict';
	var _DataManager_loadDataFile = DataManager.loadDataFile;
	DataManager.loadDataFile = function(name, src) {
		_DataManager_loadDataFile.call(this, name, src + '?' + Date.now());
	};

	SceneManager.initAudio = function() {
		var noAudio = Utils.isOptionValid('noaudio');
		if (!WebAudio.initialize(noAudio) && !noAudio) {
			var ua = navigator.userAgent.toLowerCase();
			if (ua.indexOf('msie') > -1 || ua.indexOf('trident/7') > -1) throw new Error('このゲームはInternet Explorerでは遊べません。他のブラウザで遊んでね！');
			else throw new Error('Your browser does not support Web Audio API.');
		}
	};
})();