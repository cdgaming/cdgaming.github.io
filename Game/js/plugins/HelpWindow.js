//=============================================================================
// HelpWindow.js
// PUBLIC DOMAIN
//=============================================================================

/*:
 * @plugindesc gui show
 * @author
 *
 * @help
 * 
 */

(function() {
	'use strict';
	var visible = true;
	var text = '\\}\\c[2][Z/Ent]:Action　[X]:Cancel [H]:Help [L]:Log　[Space]:Chat　[O]:Option';
	hook(Scene_Map, 'createAllWindows', function() {
		var origin = arguments[arguments.length - 1];
		origin.apply(this, arguments);
		this.createHelpWindow();
		this.createChatLogWindow();
	});

	Scene_Map.prototype.createHelpWindow = function() {
//		this._helpWindow = new Window_Base(0, 0, Graphics.boxWidth, Graphics.boxHeight);
		this._helpWindow = new Window_Base(0, 0, Graphics.boxWidth, 150);
		this._helpWindow.height = this._helpWindow.fittingHeight(1);
		this._helpWindow.drawTextEx(text, 4, 0);
//		this._helpWindow.fontSize = 2;
		this._helpWindow.visible = visible;
		this._helpWindow.update = function() {
			Window_Base.prototype.update.call(this);
			var w = SceneManager._scene._chatLogWindow;
			if ($gameMap.isEventRunning() && w.visible) {
				w.visible = false;
				w.deactivate();
			}
			if (!$gameMap.isEventRunning() && !w.visible) {
				w.visible = true;
				w.activate();
			}
			if (TouchInput.isTriggered() && Window_Selectable.prototype.isTouchedInsideFrame.call(this)) {
				SceneManager._scene.switchHelpWindow();
			}
		};
		this.addWindow(this._helpWindow);
	};

	Scene_Map.prototype.switchHelpWindow = function() {
		this._helpWindow.visible = visible = !visible;
	};

	Scene_Map.prototype.createChatLogWindow = function() {
		var y = this._helpWindow.height;
		//chatbox pos
		var rect = new Rectangle(0, 550, Graphics.boxWidth, Graphics.boxHeight - 550);
		//log box width
		var exRect = new Rectangle(0, y, Graphics.boxWidth, 550 - y);
		this._chatLogWindow = new Window_Chat(rect, exRect);
		this._chatLogWindow.setChatHandler(function(message) {
			v(3, message);
			Game_Interpreter.prototype.pluginCommand('namePop', ['-1', '\\V[3]']);
			Game_Interpreter.prototype.pluginCommand('online', ['3', 'to', 'chat']);
			ChatLogManager.chat(3, $gamePlayer);
			//show timer
			v(2, 300);
		}.bind(this));
		this.addWindow(this._chatLogWindow);
	};
//mapcheck
	hook(Scene_Map, 'isMapTouchOk', function() {
		var origin = arguments[arguments.length - 1];
		return origin.apply(this, arguments) && !this._chatLogWindow._isExpanded;
	});
})();