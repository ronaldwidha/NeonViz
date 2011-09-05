///<reference path="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"/>

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

// change to array
var canvasInstance = null;

var findOrCreateVizCanvas = function (canvasName) {
    if (canvasInstance !== null) {
        return canvasInstance;
    }
    canvasInstance = new VizCanvas(canvasName);
    return canvasInstance;
};

var generateNodeName = function (groupName, itemName) {
    var nodeName = "node_" + groupName + "_" + this.name;
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

VizGroup.prototype.addItem = function (itemId, itemName, startPos, endPos) {

    // return model
    var item = new VizItem(itemId, itemName);

    // modify html
    var groupDOM = $('#' + this.htmlId);

    var innerItemsListId = this.generateInnerItemsID(itemId)

    if (this.items.length === 0) {
        groupDOM.append('<ol id="' + innerItemsListId + '"></ol>');
    }

    var innerItemsDOM = $('#' + innerItemsListId);

    innerItemsDOM.append('<li class="itemRow"><div class="legend">' + itemName + '</div><div class="node start' + startPos + ' length' + endPos + '">&nbsp;</div></li>');

    //groupDOM.append(item.html);

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
var VizItem = function (id, name) {
    this.id = id;
    this.name = name;
    this.node = null;
};
