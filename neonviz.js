///<reference path="jquery-1.6.2.min.js"/>

// ENTRY POINTS: plugin entry points
(function ($) {
    $.fn.addGroup = function (groupId, groupName) {
        var vizCanvas = findOrCreateVizCanvas(this.selector);
        return vizCanvas.addGroup(groupId, groupName);
    };
})(jQuery);

(function ($) {
    $.fn.findGroup = function () {
        findOrCreateVizCanvas(this.selector);
    };
})(jQuery);

// GLOBAL
// todo: change to array
var canvasInstance = null;

var findOrCreateVizCanvas = function (canvasName) {
    if (canvasInstance !== null) {
        return canvasInstance;
    }
    canvasInstance = new VizCanvas(canvasName);
    return canvasInstance;
};

/* MODEL: canvas */
var VizCanvas = function (name) {
    this.name = name;
};

VizCanvas.prototype.addGroup = function (groupId, groupName) {
    // return model
    var group = new VizGroup(groupId, groupName);

    // modify html
    var htmlInstance = $(this.name);
    htmlInstance.append(group.html);

    return group;
};

VizCanvas.prototype.findGroup = function (groupName) {
};

/* MODEL: Group */
var VizGroup = function (id, name) {
    this.id = id;
    this.name = name;
    this.items = [];
    this.htmlId = this.generateListItemID();
    this.html = '<li id="' + this.htmlId + '" class="itemRow"><div class="legend groupHeader">' + this.name + '</div></li>';
};

VizGroup.prototype.addItem = function (itemId, itemName, startPos, length) {

    // return model
    var item = new VizItem(itemId, itemName, startPos, length);

    // modify html
    var groupDOM = $('#' + this.htmlId);

    var innerItemsListId = this.generateInnerItemsID(itemId)

    if (this.items.length === 0) {
        groupDOM.append('<ol id="' + innerItemsListId + '"></ol>');
    }

    var innerItemsDOM = $('#' + innerItemsListId);

    innerItemsDOM.append(item.html());

    this.items.push(item);

    return item;
};

VizGroup.prototype.generateListItemID = function () {
    return "li_group_" + this.id;
};

VizGroup.prototype.generateInnerItemsID = function (itemId) {
    return "ol_item_" + this.generateListItemID();
};

/* MODEL: Item */
var VizItem = function (id, name, startPos, length) {
    this.id = id;
    this.name = name;
    this.node = null;
    this.startPos = startPos;
    this.length = length;
};

VizItem.prototype.html = function () {
    return '<li class="itemRow"><div class="legend">' + this.name + '</div><div class="node start' + this.startPos + ' length' + this.length + '">&nbsp;</div></li>';
};