/*:
 * @plugindesc バージョン表記機能
 * @author codez
 *
 * @help æ–‡å­—åˆ—ã‚’è¡¨è¨˜ã™ã‚‹ã ã‘ãªã®ã§ã€ãƒãƒ¼ã‚¸ãƒ§ãƒ³ã§ãªãã¦ã‚‚ä½¿ãˆã¾ã™ã€‚
 * 
 * ================================
 * åˆ¶ä½œ : æœ¨æ˜Ÿãƒšãƒ³ã‚®ãƒ³
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param version
 * @desc è¡¨ç¤ºã™ã‚‹æ–‡å­—åˆ—
 * @default Version 1.0.0
 *
 * @param fontSize
 * @desc æ–‡å­—ã‚µã‚¤ã‚º
 * @default 20
 *
 * @param fontColor
 * @desc æ–‡å­—è‰²
 * @default rgb(255, 255, 255)
 *
 * @param windowX
 * @desc è¡¨ç¤ºä½ç½® X åº§æ¨™
 * @default 540
 *
 * @param windowY
 * @desc è¡¨ç¤ºä½ç½® Y åº§æ¨™
 * @default 560
 *
 */

(function() {
    
    var parameters = PluginManager.parameters('VersionSpecified');
    var version = parameters['version'];
    var fontSize = Number(parameters['fontSize']);
    var fontColor = parameters['fontColor'] || 'rgb(255, 255, 255)';
    var windowX = Number(parameters['windowX']);
    var windowY = Number(parameters['windowY']);
    
    //-----------------------------------------------------------------------------
    // Window_Version
    
    function Window_Version() {
        this.initialize.apply(this, arguments);
    }

    Window_Version.prototype = Object.create(Window_Base.prototype);
    Window_Version.prototype.constructor = Window_Version;

    Window_Version.prototype.initialize = function() {
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, windowX, windowY, 160, height);
        this.width = this.windowWidth();
        this.opacity = 0;
        this.refresh();
    };

    Window_Version.prototype.windowWidth = function() {
        return this.drawTextEx(version, 0, fontSize) + this.standardPadding()* 6;
    };

    Window_Version.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };

    Window_Version.prototype.lineHeight = function() {
        return fontSize + 4;
    };

    Window_Version.prototype.refresh = function() {
        this.createContents();
        this.contents.fontSize = fontSize;
        this.contents.textColor = fontColor;
        if (version) {
            var width = this.contentsWidth();
            this.drawBackground(0, 0, width, this.lineHeight());
            this.drawText(version, 0, 0, width, 'center');
        }
    };

    Window_Version.prototype.drawBackground = function(x, y, width, height) {
        var color1 = this.dimColor1();
        var color2 = this.dimColor2();
        this.contents.gradientFillRect(x, y, width / 2, height, color2, color1);
        this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
    };
    
    //-------------------------------------------------------------------------
    // Scene_Title
    
    var _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);
        this.createVersionWindow();
    };

    Scene_Title.prototype.createVersionWindow = function() {
        this._versionWindow = new Window_Version();
        this.addWindow(this._versionWindow);
    };
    
})();