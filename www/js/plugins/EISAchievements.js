"use strict";
//=============================================================================
// EISAchievements.js                                                         
//=============================================================================
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*:
*
* @author Kino
* @plugindesc This plugin enables achievements in your game.
*
* @param Achivement File Name
* @desc Achievement file name of your choice.
* @default Achievements
*
* @param Achievement System Title
* @desc The title in the achievement system scene; text codes supported.
* @default Achievements
*
* @param Achievement System Title Color
* @desc The color of the achievement system scene title window text
* (same as text color codes).
* @default 1
*
* @param Achievement Title Default Mask
* @text Achievement Title Default Mask [Compatability]
* @desc The text to use to hide an achievement's title when locked.
* @default ???????
*
* @param Achievement Description Default Mask
* @text Achievement Description Default Mask[Compatability]
* @desc The text to use to hide achievement's description when locked.
* @default ???????
*
* @param Achievement Icon Default Mask
* @description The default icon used for achievements that are not unlocked.
* (Right click to select icons).
* @default 1
*
* @param Achievement File Update Time
* @description The amount of time between updating the achievement
* file when a change occurs in seconds.
* @type number
* @default 30
*
* @param Update On Unlock
* @desc This will update the achievement file upon unlocking the achievement.
* @type boolean
* @default true
*
* @param autoUpdate
* @text Auto Update
* @desc Automatically updates achievement files.
* @default true
*
* @param notifications
* @text Pop up Notifications
* @desc Automatically shows the completed achievement on completion.
* @type boolean
* @default true
*
* @param categories
* @text Achievement Categories
* @desc Categories for your achievements
* @type text[]
*
* @param achievements
* @text Achievement List
* @type struct<Achievement>[]
*
*
* @help
* Version 1.1.0
//=============================================================================
// Introduction
//=============================================================================
*
* This plugin allows you to create, and monitor achievements in your game.
* You can view each achievement, apply masks, and give the player rewards
* upon completing one using common events.
*
* On PlayTesting for the first time an achievement file will be generated.
* The file will contain a single achievement with an example of the structure.
//=============================================================================
// JSON File Properties | Old
//=============================================================================
*
* Achievements
* _title: title of the achievement.
* _description: description of the achievement.
* _iconNumber: icon number index used with the achievement.
* _exclude: decides if the achievement shows up in the achievement scene.
* _global: decides if the achievement is kept between save files.
* _locked: decides if the achievement is locked or unlocked.
* _reward: a number to run a common event when the achievement is unlocked.
* _id: the id associated with the achievement.
* @: the type of achievement. Use: "Achievement" or "MaskedAchievement".
*
* MaskedAchievement Specific
* _masked: the type of mask used with the achievement.
* Use "title", "desc", or "both" to hide the title, description, or both.
//=============================================================================
// JSON File Properties | New
//=============================================================================
*
* Achievements
* title: title of the achievement.
* description: description of the achievement.
* iconNumber: icon number index used with the achievement.
* exclude: decides if the achievement shows up in the achievement scene.
* global: decides if the achievement is kept between save files.
* locked: decides if the achievement is locked or unlocked.
* reward: a number to run a common event when the achievement is unlocked.
* id: the id associated with the achievement.
* masked: the type of mask used with the achievement.
* Use "title", "desc", or "both" to hide the title, description, or both.
//=============================================================================
//  PluginCommands
//=============================================================================
*
* EISachUnlock idNumber
* This plugin command unlocks an achievement by id.
* Example: EISachUnlock 1
*
* EISachLock idNumber
* This plugin command locks an achievement by id.
* Example: EISachLock 1
*
* EISachRemove
* Removes an achievement from your file by id.
* Example: EISachRemove 1
*
* EISachExclude
* Excludes/Include an achievement from your file by id.
*
* Example 1: EISachExclude 1 true
* Example 2: EISachExclude 2 false
*
* EISachOpen
* Opens the achievement scene.
* Example: EISachOpen
*
* EISachOpenCategory
* Opens the achievement category scene.
* Example: EISachOpenCategory
*
//=============================================================================
// Script Calls
//=============================================================================
*
* EISAchieve.addAchievement(title, description, iconNumber)
* Adds a regular achievement to the JSON file.
*
* EISAchieve.addAchievement("First Achievement", "First game achievement", 33);
* This example creates an achievement with the title, description, and icon
* "First Achievement", "First game achievement", icon 33.
*
* EISAchieve.addMaskedAchievement(title, description, iconNumber, maskType)
* Adds a masked achievement to the JSON file.
*
* Example: EISAchieve.addMaskedAchievement("First Achievement",
* "First game achievement.", 33, "both")
*
* This example creates a masked achievement with the title, and
* description masked. You can mask the title or description by
* setting maskType to "title" or "desc".
*
* EISAchieve.excludeAchievement(id, boolean)
* Prevents/Allows an achievement to show up in the achievement scene.
*
* Example: EISAchieve.excludeAchievement(1, true)
*
* EISAchieve.removeAchievement(id)
* Removes an achievement from the JSON file.
*
* Example: EISAchieve.removeAchievement(1);
*
* EISAchieve.unlockAchievement(id, boolean);
* Unlocks/Locks an achievement and runs a common event when unlocked if set.
*
* Example: EISAchieve.unlockAchievement(1, true);
*
* EISAchieve.unlockAchievementWithCode(id, boolean, string);
* Unlocks/Locks an achievement and runs a common event when unlocked along
* with the JavaScript code.
*
* Example: EISAchieve.unlockAchievementWithCode(1, true,
  "$gameVariables.setValue(29, 10); $gameSwitches.setValue(1, true);");
//=============================================================================
// Contact Information
//=============================================================================
*
* Contact me via twitter: EISKino, or on the rpg maker forums.
* Username on forums: Kino.
*
* Forum Link: http://forums.rpgmakerweb.com/index.php?/profile/75879-kino/
* Twitter Link: https://twitter.com/EISKino
* Website: http://endlessillusoft.com/
*
* Hope this plugin helps, and enjoy!
* --Kino
*
*/
/*~struct~Achievement:
*
* @param title
* @text Achievement Title
* @desription The achievement title.
* @default Title
*
* @param description
* @text Achievement Description
* @description The achievement description.
* @default "An awesome achievement for my awesome game."
* @type note
*
* @param iconNumber
* @text Icon Number
* @description The achievement icon. (Right click to select icons).
* @default 0
*
* @param iconMask
* @text Icon Mask
* @description The achievement icon mask. (Right click to select icon)
* @default 0
*
* @param image
* @text Achievement Image
* @description An image to represent your achievement on the details screen.
* @type file
* @default img/pictures/
*
* @param category
* @text Category
* @description The achievement category.
* @default general
*
* @param masked
* @text Mask Type
* @description The type of mask to use for the achievement.
* Types are: none, description, title, both.
* @default both
*
* @param titleColor
* @text Achievement Text Color
* @description The achievement title color.
* @default 0
*
* @param titleMask
* @text Achievement Title Mask
* @default ???????
*
* @param descriptionMask
* @text Achievement Description Mask
* @description The description mask when an achievement is considered hidden.
* @default ???????
*
* @param reward
* @text Reward Common Event
* @description A common event linked to the achievement.
* @type number
* @default 0
*
* @param scriptBox
* @text Script Box
* @description A box that you can place JavaScript or RMMV script
* calls in when an achievement is complete.
* @type note
* @default " "
*
* @param global
* @text Achievement Not Linked To Save
* @description Determines if achievement is not linked to the player save.
* @type boolean
* @default true
*
*/
var EISAchieve = {};
(function ($) {
    var parameters = PluginManager.parameters("EISAchievements");
    var achievementParams = {
        fileName: String(parameters["Achivement File Name"]),
        titleText: String(parameters['Achievement System Title']),
        titleTextColor: Number(parameters['Achievement System Title Color']),
        titleMask: String(parameters['Achievement Title Default Mask']),
        updateTime: Number(parameters['Achievement File Update Time']),
        descriptionMask: String(parameters['Achievement Description Default Mask']),
        iconMask: parseInt(parameters['Achievement Icon Default Mask']),
        updateOnUnlock: String(parameters['Update On Unlock']),
        notifications: /true/ig.test(parameters['notifications']),
        categories: JSON.parse(parameters['categories'])
            .map(function (category) { return category.toLowerCase(); }),
        autoUpdate: /true/ig.test(parameters['autoUpdate']),
    };
    try {
        achievementParams['achievements'] = JSON.parse(parameters['achievements'])
            .map(function (achievement) { return JSON.parse(achievement); });
    }
    catch (err) {
        console.error(err);
        //do nothing
    }
    var Masks;
    (function (Masks) {
        Masks[Masks["both"] = 0] = "both";
        Masks[Masks["title"] = 1] = "title";
        Masks[Masks["description"] = 2] = "description";
    })(Masks || (Masks = {}));
    function setup($) {
        //=============================================================================
        //  Constants
        //=============================================================================
        var AchievementBroadcaster = new PIXI.utils.EventEmitter;
        var ImageCache = new Map();
        //=============================================================================
        // AchievementSystemInitializer                                                
        //=============================================================================
        var AchievementSystemInitializer = /** @class */ (function () {
            function AchievementSystemInitializer() {
            }
            AchievementSystemInitializer.initialize = function () {
                AchievementFileManager.initialize();
                AchievementObserver.initialize();
                AchievementLists.initialize();
                this.setupAchievementSystem();
            };
            AchievementSystemInitializer.setupAchievementSystem = function () {
                AchievementFileManager.setupAchievementFile();
                AchievementLists.setupLists();
                console.log("Achievement System Started");
            };
            return AchievementSystemInitializer;
        }());
        //=============================================================================
        // AchievementFileManager                                                     
        //=============================================================================
        var AchievementFileManager = /** @class */ (function () {
            function AchievementFileManager() {
            }
            AchievementFileManager.initialize = function () {
                this._fs = KR['FS'];
                this._fileName = achievementParams.fileName;
            };
            AchievementFileManager.setupAchievementFile = function () {
                if (!this.achievementFileExists()) {
                    var data = this.createBasicAchievementJSONStructure();
                    this.writeAchievementFile(data);
                }
                else {
                    var data = this.createBasicAchievementJSONStructure();
                    var data2 = this.readAchievementFile();
                    this.writeAchievementFile(Object.assign(data, data2));
                }
            };
            AchievementFileManager.createBasicAchievementJSONStructure = function () {
                if (achievementParams['achievements'] !== undefined) {
                    return achievementParams['achievements'].map(function (achievement, index) {
                        var tempAchievement = convenientParser(achievement);
                        tempAchievement.id = index + 1;
                        tempAchievement.description =
                            JSON.parse(tempAchievement.description);
                        tempAchievement.scriptBox = JSON.parse(tempAchievement.scriptBox);
                        tempAchievement.locked = true;
                        return tempAchievement;
                    });
                }
                else {
                    var fileStructure = [];
                    var achievement = createAchievement("First Achievement", "First game Achievement.", 30);
                    achievement.id = 1;
                    var maskedAchievement = createMaskedAchievement("Second Achievement", "Second in game Achievement", 33, "both");
                    maskedAchievement.id = 2;
                    fileStructure.push(achievement);
                    fileStructure.push(maskedAchievement);
                    return fileStructure;
                }
            };
            AchievementFileManager.achievementFileExists = function () {
                return this._fs.fileExists("data", this._fileName + ".json");
            };
            AchievementFileManager.updateAchievementFile = function (data) {
                this.writeAchievementFile(data);
                // console.log(`File Updated\n${achievementParams.fileName}.json`);
            };
            AchievementFileManager.writeAchievementFile = function (data) {
                this._fs.writeJson(this._fileName, data);
            };
            AchievementFileManager.readAchievementFile = function () {
                return this._fs.readJson(this._fileName);
            };
            return AchievementFileManager;
        }());
        //=============================================================================
        // AchievementRequester                                                      
        //=============================================================================
        var AchievementRequester = /** @class */ (function () {
            function AchievementRequester() {
            }
            AchievementRequester.addAchievement = function (title, description, iconNumber) {
                var achievement = createAchievement(title, description, iconNumber);
                AchievementLists.addAchievement(achievement);
            };
            AchievementRequester.unlockAchievement = function (id, boolean) {
                var achievement = AchievementLists.getAchievementById(id);
                var originalLock = achievement.locked;
                var tempAchievement = Object.assign(createAchievement("", "", 0), achievement);
                tempAchievement.locked = !boolean;
                if (achievement.scriptBox !== undefined) {
                    try {
                        Function(achievement.scriptBox)();
                    }
                    catch (err) {
                        console.error(err);
                    }
                }
                AchievementLists.updateAchievement(id, tempAchievement);
                if (originalLock === true && tempAchievement.locked === false) {
                    $gameTemp.reserveCommonEvent(tempAchievement.reward);
                    if (achievementParams.notifications === true)
                        AchievementBroadcaster
                            .emit("achievementUnlocked", tempAchievement.title);
                    if (/T/ig.test(achievementParams.updateOnUnlock))
                        this.requestFileUpdate();
                }
            };
            AchievementRequester.maskAchievement = function (id, mask) {
                var achievement = AchievementLists.getAchievementById(id);
                var tempAchievement = Object.assign(createAchievement("", "", 0), achievement);
                achievement.masked = mask;
                AchievementLists.updateAchievement(id, tempAchievement);
            };
            AchievementRequester.excludeAchievement = function (id, boolean) {
                var achievement = AchievementLists.getAchievementById(id);
                var tempAchievement = Object.assign(createAchievement("", "", 0), achievement);
                tempAchievement.exclude = boolean;
                AchievementLists.updateAchievement(id, tempAchievement);
            };
            AchievementRequester.requestFileUpdate = function (data) {
                if (data === void 0) { data = undefined; }
                if (data !== undefined)
                    AchievementFileManager.updateAchievementFile(data);
                else
                    AchievementFileManager
                        .updateAchievementFile(AchievementLists.publicList);
            };
            return AchievementRequester;
        }());
        //=============================================================================
        // AchievementObserver                                                        
        //=============================================================================
        var AchievementObserver = /** @class */ (function () {
            function AchievementObserver() {
            }
            AchievementObserver.initialize = function () {
                this._timer = new Timer(achievementParams.updateTime);
                this.update();
            };
            AchievementObserver.update = function () {
                if (this._timer.timeUp()) {
                    this.monitorChanges();
                    this._timer.resetTimer();
                }
                this.requestUpdate();
            };
            AchievementObserver.requestUpdate = function () {
                requestAnimationFrame(this.update.bind(this));
            };
            AchievementObserver.monitorChanges = function () {
                if (!AchievementLists.listsMatch()) {
                    AchievementLists.privateList = AchievementLists.publicList.slice();
                    AchievementFileManager
                        .updateAchievementFile(AchievementLists.privateList);
                }
            };
            return AchievementObserver;
        }());
        //=============================================================================
        // AchievementLists                                                             
        //=============================================================================
        var AchievementLists = /** @class */ (function () {
            function AchievementLists() {
            }
            AchievementLists.initialize = function () {
                this.privateList = null;
                this.publicList = null;
            };
            AchievementLists.setupLists = function () {
                var fileData = AchievementFileManager.readAchievementFile();
                fileData = this.prepareAchievements(fileData);
                this.privateList = fileData.slice();
                this.publicList = fileData.slice();
            };
            AchievementLists.addAchievement = function (achievement) {
                if (this.getAchievementById(achievement.id) === null) {
                    this.publicList.push(achievement);
                }
            };
            AchievementLists.removeAchievement = function (id) {
                var achievementIndex = this.getAchievementIndex(id);
                this.publicList.splice(achievementIndex, 1);
            };
            AchievementLists.getAchievementIndex = function (id) {
                var achievement = this.getAchievementById(id);
                return this.publicList.indexOf(achievement);
            };
            AchievementLists.getAchievementById = function (id) {
                var length = this.publicList.length;
                for (var i = 0; i < length; i++) {
                    if (this.publicList[i].id === id)
                        return this.publicList[i];
                }
                return null;
            };
            AchievementLists.updateAchievement = function (id, achievement) {
                var index = this.getAchievementIndex(id);
                delete this.publicList[index];
                this.publicList[index] = achievement;
            };
            AchievementLists.listsMatch = function () {
                this.sortListsForMatching();
                var length = this.publicList.length;
                var checker = false;
                for (var i = 0; i < length; i++) {
                    if (this.privateList[i] !== undefined &&
                        AchUtil.objectsEqual(this.publicList[i], this.privateList[i]))
                        checker = true;
                    else
                        checker = false;
                    if (checker === false)
                        return false;
                }
                return true;
            };
            AchievementLists.sortListsForMatching = function () {
                this.publicList = this.publicList.sort();
                this.privateList = this.privateList.sort();
            };
            AchievementLists.prepareAchievements = function (fileData) {
                var array = fileData;
                return fileData.map(function (data, index) {
                    data = convertToNewAchievement(data);
                    var achievement = (data.masked === undefined) ?
                        createAchievement(data.title, data.description, data.iconNumber)
                        : createMaskedAchievement(data.title, data.description, data.iconNumber, data.masked);
                    ImageCache.set(data.image, loadImage(data.image));
                    Object.assign(achievement, data);
                    return achievement;
                });
            };
            return AchievementLists;
        }());
        //=============================================================================
        //  Achievement
        //=============================================================================
        var Achievement = /** @class */ (function () {
            function Achievement(title, description, iconNumber) {
                this.title = title;
                this.description = description;
                this.iconNumber = iconNumber;
                this.iconMask = 0;
                this.exclude = false;
                this.image = '';
                this.global = true;
                this.locked = true;
                this.reward = -1;
                this.masked = 'none';
                this.category = 'general';
            }
            Achievement.prototype.setTitle = function (title) {
                this.title = title;
                return this;
            };
            Achievement.prototype.setDescription = function (description) {
                this.description = description;
                return this;
            };
            Achievement.prototype.setIconNumber = function (num) {
                this.iconNumber = num;
                return this;
            };
            Achievement.prototype.setExclude = function (exclude) {
                this.exclude = exclude;
                return this;
            };
            Achievement.prototype.setGlobal = function (global) {
                this.global = global;
                return this;
            };
            Achievement.prototype.setLocked = function (locked) {
                this.locked = locked;
                return this;
            };
            Achievement.prototype.setImage = function (image) {
                this.image = image;
                return this;
            };
            Achievement.prototype.setId = function (id) {
                this.id = id;
                return this;
            };
            Achievement.prototype.setMask = function (mask) {
                this.masked = mask.toLowerCase();
                return this;
            };
            return Achievement;
        }());
        //=============================================================================
        //  Functions
        //=============================================================================
        function createAchievement(title, description, iconNumber) {
            if (iconNumber === void 0) { iconNumber = 0; }
            return new Achievement(title, description, iconNumber);
        }
        function createMaskedAchievement(title, description, iconNumber, mask) {
            if (iconNumber === void 0) { iconNumber = 0; }
            return createAchievement(title, description, iconNumber).setMask(mask);
        }
        function convertToNewAchievement(achievementData) {
            var obj = {};
            Object.keys(achievementData).forEach(function (key) {
                var propName = key.charAt(0) === '_' ? key.slice(1) : key;
                obj[propName] = achievementData[key];
            });
            return obj;
        }
        function convenientParser(object) {
            'use strict';
            for (var prop in object) {
                var value = object[prop];
                if (!Number.isNaN(Number(value)) && value.trim().length > 0) {
                    object[prop] = Number(value);
                }
                else if (/true|false/i.test(value) && (value.trim().length < 6)) {
                    object[prop] = /true/i.test(value) ? true : false;
                }
                else {
                    try {
                        if (typeof JSON.parse(value) === 'object') {
                            object[prop] = convenientParser(JSON.parse(value));
                        }
                    }
                    catch (err) {
                        // console.log(err);
                    }
                }
            }
            return object;
        }
        function loadImage(path) {
            var splitPath = path.split("/");
            var folder = splitPath.slice(0, splitPath.length - 1).join("/") + "/";
            var file = splitPath[splitPath.length - 1];
            if (KR['FS'].fileExists(folder, file + ".png"))
                return {
                    path: path,
                    bitmap: ImageManager.loadBitmap(folder, file, 0, false)
                };
            else
                return null;
        }
        //=============================================================================
        //  Scene_Map
        //=============================================================================
        var _SceneMap_createAllWindows = Scene_Map.prototype.createAllWindows;
        Scene_Map.prototype.createAllWindows = function () {
            _SceneMap_createAllWindows.call(this);
            this.createAchievementNotificationWindow();
        };
        var _SceneMap_start = Scene_Map.prototype.start;
        Scene_Map.prototype.start = function () {
            var _this = this;
            _SceneMap_start.call(this);
            AchievementBroadcaster.on('achievementUnlocked', function (title) {
                _this._achievementNotificationWindow.setText("Unlocked: " + title);
                _this._achievementNotificationWindow.open();
            });
        };
        Object.assign(Scene_Map.prototype, {
            createAchievementNotificationWindow: function () {
                this._achievementNotificationWindow =
                    new Window_AchievementNotification(0, 0, 350, 75);
                this.addChild(this._achievementNotificationWindow);
            }
        });
        //=============================================================================
        //  Scene_Achievement
        //=============================================================================
        var Scene_Achievement = /** @class */ (function (_super) {
            __extends(Scene_Achievement, _super);
            function Scene_Achievement() {
                return _super.call(this) || this;
            }
            Scene_Achievement.prototype.create = function () {
                _super.prototype.create.call(this);
                this.createAllWindows();
            };
            Scene_Achievement.prototype.createAllWindows = function () {
                this.createAchievementTitleWindow();
                this.createAchievementWindow();
                this.createAchievementDetailWindow();
            };
            Scene_Achievement.prototype.createAchievementTitleWindow = function () {
                this._achievementTitleWindow =
                    new Window_AchievementTitle(0, 0, Graphics.width, 100);
                this.addWindow(this._achievementTitleWindow);
            };
            Scene_Achievement.prototype.createAchievementWindow = function () {
                this._achievementWindow =
                    new Window_Achievement(0, 100, Graphics.width, Graphics.height - 100);
                this._achievementWindow.setAchievements(AchievementLists.publicList);
                this._achievementWindow
                    .setHandler('achievement', this.openDetails.bind(this));
                this.addWindow(this._achievementWindow);
            };
            Scene_Achievement.prototype.createAchievementDetailWindow = function () {
                this._achievementDetailWindow =
                    new Window_AchievementDetail(0, 0, Graphics.width, Graphics.height);
                this.addWindow(this._achievementDetailWindow);
            };
            Scene_Achievement.prototype.update = function () {
                _super.prototype.update.call(this);
                this.exitProcessing();
            };
            Scene_Achievement.prototype.exitProcessing = function () {
                var _this = this;
                if (!this._achievementDetailWindow.isOpen()
                    && (Input.isTriggered('cancel') || TouchInput.isCancelled())) {
                    if (!(SceneManager._scene instanceof Scene_Map))
                        this.popScene();
                }
                if (this._achievementDetailWindow.isOpen()
                    && (Input.isTriggered('cancel') || TouchInput.isCancelled())) {
                    setTimeout(function () {
                        _this._achievementDetailWindow.close();
                        _this._achievementWindow.refresh();
                        _this._achievementWindow.activate();
                    }, 250);
                }
            };
            Scene_Achievement.prototype.openDetails = function () {
                this._achievementWindow.deactivate();
                var index = this._achievementWindow.index();
                var achievement = this._achievementWindow.getExt(index);
                var data = ImageCache.get(achievement.image);
                if (data !== null)
                    this._achievementDetailWindow
                        .setImage(data.bitmap);
                this._achievementDetailWindow.setAchievement(achievement);
                this._achievementDetailWindow.activate();
                this._achievementDetailWindow.open();
            };
            return Scene_Achievement;
        }(Scene_MenuBase));
        //=============================================================================
        //  Scene_AchievementCategory
        //=============================================================================
        var Scene_AchievementCategory = /** @class */ (function (_super) {
            __extends(Scene_AchievementCategory, _super);
            function Scene_AchievementCategory() {
                return _super.call(this) || this;
            }
            Scene_AchievementCategory.prototype.create = function () {
                _super.prototype.create.call(this);
                this.createAllWindows();
            };
            Scene_AchievementCategory.prototype.createAllWindows = function () {
                this.createAchievementTitleWindow();
                this.createAchievementWindow();
                this.createAchievementCategoryWindow();
                this.createAchievementDetailWindow();
            };
            Scene_AchievementCategory.prototype.createAchievementWindow = function () {
                this._achievementWindow =
                    new Window_Achievement(0, 170, Graphics.width, Graphics.height - 170);
                this._achievementWindow
                    .setHandler('achievement', this.openDetails.bind(this));
                this._achievementWindow.openness = 0;
                this.addWindow(this._achievementWindow);
            };
            Scene_AchievementCategory.prototype.createAchievementCategoryWindow = function () {
                var height = this._achievementTitleWindow.height;
                this._achievementCategoryWindow =
                    new Window_AchievementCategory(0, height);
                this._achievementCategoryWindow
                    .setHandler('category', this.commandCategory.bind(this));
                this.addWindow(this._achievementCategoryWindow);
            };
            Scene_AchievementCategory.prototype.commandCategory = function () {
                this._achievementCategoryWindow.deactivate();
                var category = this._achievementCategoryWindow.currentExt().category;
                var categoryAchievements = AchUtil.categoryAchievements(category, AchievementLists.publicList);
                this._achievementWindow.setAchievements(categoryAchievements);
                this._achievementWindow.refresh();
                this._achievementWindow.activate();
                this._achievementWindow.open();
            };
            Scene_AchievementCategory.prototype.exitProcessing = function () {
                var _this = this;
                if (!this._achievementDetailWindow.isOpen()
                    && !this._achievementWindow.isOpen()
                    && (Input.isTriggered('cancel') || TouchInput.isCancelled())) {
                    setTimeout(this.popScene.bind(this), 100);
                }
                if (this._achievementWindow.isOpen()
                    && (Input.isTriggered('cancel') || TouchInput.isCancelled())) {
                    setTimeout(function () {
                        _this._achievementWindow.close();
                        _this._achievementWindow.deactivate();
                        _this._achievementCategoryWindow.activate();
                    }, 150);
                }
                if (this._achievementDetailWindow.isOpen()
                    && (Input.isTriggered('cancel') || TouchInput.isCancelled())) {
                    setTimeout(function () {
                        _this._achievementDetailWindow.close();
                        _this._achievementWindow.activate();
                        _this._achievementWindow.refresh();
                        _this._achievementWindow.open();
                    }, 150);
                }
            };
            return Scene_AchievementCategory;
        }(Scene_Achievement));
        //=============================================================================
        // Window_AchievementTitle                                                    
        //=============================================================================
        var Window_AchievementTitle = /** @class */ (function (_super) {
            __extends(Window_AchievementTitle, _super);
            function Window_AchievementTitle(x, y, width, height) {
                return _super.call(this, x, y, width, height) || this;
            }
            Window_AchievementTitle.prototype.update = function () {
                _super.prototype.update.call(this);
                this.drawTitle();
            };
            Window_AchievementTitle.prototype.drawTitle = function () {
                var text = achievementParams.titleText;
                this.contents.fontSize = 30;
                var xPosition = (this.contentsWidth() / 2) - (this.textWidth(text) / 2);
                this.changeTextColor(this.textColor(achievementParams.titleTextColor));
                this.drawTextEx(text, xPosition, 10);
                this.resetFontSettings();
            };
            return Window_AchievementTitle;
        }(Window_Base));
        //=============================================================================
        //  Window_AchievementCategory
        //=============================================================================
        var Window_AchievementCategory = /** @class */ (function (_super) {
            __extends(Window_AchievementCategory, _super);
            function Window_AchievementCategory(x, y) {
                return _super.call(this, x, y) || this;
            }
            Window_AchievementCategory.prototype.windowWidth = function () {
                return Graphics.width;
            };
            Window_AchievementCategory.prototype.makeCommandList = function () {
                var _this = this;
                var categories = achievementParams.categories;
                categories
                    .map(AchUtil.capitalize)
                    .forEach(function (category) {
                    _this.addCommand(category, 'category', true, { category: category });
                });
            };
            return Window_AchievementCategory;
        }(Window_HorzCommand));
        //=============================================================================
        // Window_Achievement                                                         
        //=============================================================================
        var Window_Achievement = /** @class */ (function (_super) {
            __extends(Window_Achievement, _super);
            function Window_Achievement(x, y, width, height) {
                var _this = _super.call(this, x, y) || this;
                _this.initialize(x, y, width, height);
                return _this;
            }
            Window_Achievement.prototype.initialize = function (x, y, width, height) {
                this._windowWidth = width;
                this._windowHeight = height;
                this._achievementList = [];
                _super.prototype.initialize.call(this, x, y);
            };
            Window_Achievement.prototype.windowWidth = function () {
                return this._windowWidth;
            };
            Window_Achievement.prototype.windowHeight = function () {
                return this._windowHeight;
            };
            Window_Achievement.prototype.itemHeight = function () {
                return this.lineHeight() * 2;
            };
            Window_Achievement.prototype.makeCommandList = function () {
                var achievement = null;
                for (var i = 0; i < this._achievementList.length; i++) {
                    achievement = this._achievementList[i];
                    var enabled = (achievement.locked === true) ? false : true;
                    if (achievement.exclude === false)
                        this.addCommand(achievement.title, 'achievement', enabled, achievement);
                }
            };
            Window_Achievement.prototype.drawItem = function (index) {
                var rect = this.itemRectForText(index);
                var align = this.itemTextAlign();
                this.resetTextColor();
                this.changePaintOpacity(this.isCommandEnabled(index));
                var achievementInfo = this.getExt(index);
                var mask = this.processAchievementText(achievementInfo);
                this.drawTextEx(mask.title, rect.x, rect.y);
                this.drawTextEx(AchUtil.shorten(mask.description, 30), rect.x, rect.y + this.lineHeight());
                this.drawIcon(mask.iconNumber, rect.width - Window_Base._iconWidth, rect.y + 3);
            };
            Window_Achievement.prototype.processAchievementText = function (achievement) {
                var title = achievement.title;
                var description = achievement.description;
                var mask = achievement.masked;
                var iconNumber = achievement.iconNumber;
                if (achievement.locked === true) {
                    if (/title/ig.test(mask))
                        title = achievementParams.titleMask;
                    if (/desc/ig.test(mask))
                        description = achievementParams.descriptionMask;
                    if (/both/ig.test(mask)) {
                        title = achievementParams.titleMask;
                        description = achievementParams.descriptionMask;
                    }
                    iconNumber = achievement.iconMask > 0 ?
                        achievement.iconMask : achievementParams.iconMask;
                }
                return { title: title, description: description, iconNumber: iconNumber };
            };
            Window_Achievement.prototype.getExt = function (index) {
                return this._list[index].ext;
            };
            Window_Achievement.prototype.setAchievements = function (achievements) {
                this._achievementList = achievements;
                this.refresh();
            };
            return Window_Achievement;
        }(Window_Command));
        //=============================================================================
        // Window_AchievementDetail                                                    
        //=============================================================================
        var Window_AchievementDetail = /** @class */ (function (_super) {
            __extends(Window_AchievementDetail, _super);
            function Window_AchievementDetail(x, y, width, height) {
                return _super.call(this, x, y, width, height) || this;
            }
            Window_AchievementDetail.prototype.initialize = function (x, y, width, height) {
                _super.prototype.initialize.call(this, x, y, width, height);
                this.openness = 0;
                this._image = null;
            };
            Window_AchievementDetail.prototype.refresh = function () {
                if (this.contents) {
                    this.contents.clear();
                    if (this._achievement !== null)
                        this.drawAchievementDetails();
                }
            };
            Window_AchievementDetail.prototype.drawAchievementDetails = function () {
                var _a = this._achievement, title = _a.title, description = _a.description, category = _a.category, iconNumber = _a.iconNumber, locked = _a.locked, image = _a.image;
                this.drawText(title, 0, 0, this.contentsWidth(), 'center');
                this.drawIcon(iconNumber, 0, 0);
                this.drawTextEx(description, 0, AchUtil.lines(3));
                this.resetFontSettings();
                this.drawCategory(category, 0, AchUtil.lines(14));
                var isComplete = AchUtil.capitalize(AchUtil.yesOrNo(!locked));
                this.drawText("Complete: " + isComplete, 0, AchUtil.lines(14), this.contentsWidth(), 'right');
                if (this._image !== null)
                    this.drawImage(this._image);
            };
            Window_AchievementDetail.prototype.drawCategory = function (category, x, y) {
                var text = "Category: " + AchUtil.capitalize(category);
                this.drawText(text, x, y, this.contentsWidth(), 'left');
            };
            Window_AchievementDetail.prototype.drawImage = function (image) {
                var x = Graphics.width - 190;
                var y = AchUtil.lines(3);
                this.contents.fillRect(x - 4, y - 4, 154, 279, "black");
                this.contents.clearRect(x, y, 146, 271);
                this.contents
                    .blt(image, 0, 0, image.width, image.height, x, y, 150, 275);
            };
            Window_AchievementDetail.prototype.setAchievement = function (achievement) {
                this._achievement = achievement;
                this.refresh();
            };
            Window_AchievementDetail.prototype.setImage = function (image) {
                this._image = image;
            };
            return Window_AchievementDetail;
        }(Window_Base));
        //=============================================================================
        //  Window_AchievementNotification
        //=============================================================================
        var Window_AchievementNotification = /** @class */ (function (_super) {
            __extends(Window_AchievementNotification, _super);
            function Window_AchievementNotification(x, y, width, height) {
                var _this = _super.call(this, x, y, width, height) || this;
                _this._notificationText = '';
                _this.openness = 0;
                return _this;
            }
            Window_AchievementNotification.prototype.drawNotification = function () {
                this.drawText(this._notificationText, 0, 0, this.contentsWidth(), 'center');
            };
            Window_AchievementNotification.prototype.setNotificationText = function (text) {
                this._notificationText = text;
            };
            Window_AchievementNotification.prototype.open = function () {
                _super.prototype.open.call(this);
                this.drawNotification();
                setTimeout(this.close.bind(this), 5000);
            };
            Window_AchievementNotification.prototype.setText = function (text) {
                this._notificationText = text;
            };
            Window_AchievementNotification.prototype.close = function () {
                _super.prototype.close.call(this);
                this._notificationText = '';
                this.contents.clear();
            };
            return Window_AchievementNotification;
        }(Window_Base));
        //=============================================================================
        // Utility                                                             
        //=============================================================================
        var AchUtil = /** @class */ (function () {
            function AchUtil() {
            }
            AchUtil.objectsEqual = function (object1, object2) {
                var length1 = Object.keys(object1).length;
                var length2 = Object.keys(object2).length;
                for (var prop in object1) {
                    if (object1[prop] !== object2[prop])
                        return false;
                    if (length1 !== length2)
                        return false;
                }
                return true;
            };
            AchUtil.lines = function (number) {
                return Window_Base.prototype.lineHeight() * number;
            };
            AchUtil.yesOrNo = function (boolean) {
                return boolean === true ? 'yes' : 'no';
            };
            AchUtil.capitalize = function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            };
            AchUtil.shorten = function (string, number) {
                if (string.length > number) {
                    return string.slice(0, number - 3).concat("...");
                }
                else {
                    return string;
                }
            };
            AchUtil.toBoolean = function (string) {
                return string.toLowerCase().trim() === 'true';
            };
            AchUtil.categoryAchievements = function (category, list) {
                return list
                    .filter(function (achievement) {
                    return new RegExp(category.trim(), "ig").test(achievement.category);
                });
            };
            return AchUtil;
        }());
        //=============================================================================
        //  Timer                                                            
        //=============================================================================
        var Timer = /** @class */ (function () {
            function Timer(seconds) {
                this._originalTime = 60 * seconds;
                this._timer = 60 * seconds;
                this.update();
            }
            Timer.prototype.startTimer = function () {
                this.resetTimer();
            };
            Timer.prototype.setTimer = function (value) {
                this._timer = 60 * value;
                this._originalTime = 60 * value;
            };
            Timer.prototype.resetTimer = function () {
                this._timer = this._originalTime;
            };
            Timer.prototype.update = function () {
                if (this._timer > 0)
                    this._timer--;
                this.requestUpdate();
            };
            Timer.prototype.requestUpdate = function () {
                requestAnimationFrame(this.update.bind(this));
            };
            Timer.prototype.timeUp = function () {
                if (this._timer === 0)
                    return true;
                else
                    return false;
            };
            return Timer;
        }());
        //=============================================================================
        // Initialize                                                           
        //=============================================================================
        AchievementSystemInitializer.initialize();
        //=============================================================================
        //  PluginCommands
        //=============================================================================
        var _GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            _GameInterpreter_pluginCommand.call(this, command, args);
            var strippedArgs = args.map(function (arg) { return arg.trim(); });
            switch (command) {
                case 'EISachUnlock':
                    AchievementRequester.unlockAchievement(parseInt(strippedArgs[0]), true);
                    break;
                case 'EISachLock':
                    AchievementRequester.unlockAchievement(parseInt(strippedArgs[0]), false);
                    break;
                case 'EISachRemove':
                    AchievementLists.removeAchievement(parseInt(strippedArgs[0]));
                    break;
                case 'EISachExclude':
                    AchievementRequester
                        .excludeAchievement(parseInt(strippedArgs[0]), AchUtil.toBoolean(strippedArgs[1]));
                    break;
                case 'EISachOpen':
                    SceneManager['sceneAchievement']();
                case 'EISachOpenCategory':
                    SceneManager['sceneAchievementCategory']();
                default:
                //do nothing  
            }
        };
        //=============================================================================
        //  Exports
        //=============================================================================
        Object.assign(SceneManager, {
            gotoSceneAchievement: function () {
                this.push(Scene_Achievement);
            },
            gotoSceneAchievementCategory: function () {
                this.push(Scene_AchievementCategory);
            },
            sceneAchievement: function () {
                this.push(Scene_Achievement);
            },
            sceneAchievementCategory: function () {
                this.push(Scene_AchievementCategory);
            }
        });
        Object.assign($, {
            addAchievement: function (title, description, iconNumber) {
                AchievementLists.addAchievement(createAchievement(title, description, iconNumber));
            },
            addMaskedAchievement: function (title, description, iconNumber, maskType) {
                var achievement = createMaskedAchievement(title, description, iconNumber, maskType);
                AchievementLists.addAchievement(achievement);
            },
            excludeAchievement: function (id, exclude) {
                AchievementRequester.excludeAchievement(id, exclude);
            },
            removeAchievement: function (id) {
                AchievementLists.removeAchievement(id);
            },
            unlockAchievement: function (id, unlock) {
                AchievementRequester.unlockAchievement(id, unlock);
            }, unlockAchievementWithCode: function (id, unlock, code) {
                eval(code);
                AchievementRequester.unlockAchievement(id, unlock);
            }
        });
        if (Utils.isOptionValid("test")) {
            Object.assign($, {
                publicAchievements: function () {
                    return AchievementLists.publicList;
                },
                privateAchievements: function () {
                    return AchievementLists.privateList;
                }
            });
        }
    }
    if (KR['FS'])
        setup($);
})(EISAchieve);
