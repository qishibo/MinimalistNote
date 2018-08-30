/**
 * Created on : 2018-02-11 08:49:00 星期日
 * Encoding   : UTF-8
 * Description: 最简单的便签应用，呼哈哈哈哈
 *
 * @author    @qii404 <qii404.me>
 */

var qii404 = {
    /**
     * container last height
     */
    lastHeight: 0,

    /**
     * last save time
     */
    lastTime: 0,

    /**
     * time interval since last storage [ms]
     */
    storageInterval: 1000,

    /**
     * storage key
     */
    storageKey: 'qii404_easy_note',

    /**
     * init
     */
    init: function() {
        this.resize();
        this.bindResize();
        this.renderContent();
        this.bindInput();
        this.bindBlur();
    },

    /**
     * bind action
     */
    bindResize: function() {
        var this_ = this;
        chrome.app.window.current().onBoundsChanged.addListener(function() {
            this_.resize();
        });
    },

    /**
     * bing textarea input action
     */
    bindInput: function() {
        var this_ = this;
        document.getElementById('main-content').oninput = function(e) {
            this_.storageContent(e.srcElement.value);
        }
    },

    /**
     * bind lose focus action
     */
    bindBlur: function() {
        var this_ = this;
        document.getElementById('main-content').onblur = function(e) {
            this_.storageContent(e.srcElement.value, true);
        }
    },

    /**
     * resize container
     */
    resize: function() {
        var nowHeight = chrome.app.window.current().innerBounds.height;

        if (nowHeight == this.lastHeight) {
            return;
        }

        this.lastHeight = nowHeight;
        document.getElementById('main-content').style.height = nowHeight - 5 + 'px';
    },

    /**
     * render content when load
     */
    renderContent: function() {
        var this_ = this;

        chrome.storage.sync.get(this.storageKey, function(data) {
            console.log('get data from sync...' , data);

            var lastContent = data[this_.storageKey];

            if (lastContent == undefined) {
                document.getElementById('main-content').value = '';
                return;
            }

            document.getElementById('main-content').value = lastContent;
        });
    },

    /**
     * store
     *
     * @param      {<type>}  value   The value
     * @param      {<type>}  force   The force
     */
    storageContent: function(value, force) {
        var nowTime = Date.parse(new Date());

        if (!force && (nowTime - this.lastTime < this.storageInterval)) {
            return;
        }

        // 保险措施，防止意外情况下清空内功
        if (!value || !value.replace(/\s/g, '')) {
            return;
        }

        this.lastTime = nowTime;

        chrome.storage.sync.set({[this.storageKey]: value}, function() {
            console.log('save success!')
        });
    }
};

qii404.init();
