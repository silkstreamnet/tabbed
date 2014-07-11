(function($){

    var defaults = {
        selector:'>*',
        animateOnLoad:false
    };

    $.fn.Tabbed = function(options)
    {
        var settings = $.extend({},defaults,options);
        process(this,settings);
    };

    function getAttr(obj,attr)
    {
        var attrval = obj.attr(attr);
        if (typeof attrval === 'undefined' || attrval === false || attrval === '') attrval = '';
        return attrval;
    }

    function setAttr(obj,attr,val)
    {
        obj.attr(attr,val);
    }

    function applyDataSettings(object,settings)
    {
        for (var p in defaults)
        {
            if (defaults.hasOwnProperty(p))
            {
                var attr = getAttr(object,'data-'+ p.toLowerCase());
                if (attr)
                {
                    settings[p] = attr;
                }
            }
        }
    }

    function process(_tabbedContainers,settings)
    {
        if (_tabbedContainers && _tabbedContainers.length > 0)
        {
            _tabbedContainers.each(function()
            {
                var foundTabs = [];
                var _tabbedContainer = $(this);

                var t_settings = $.extend({},settings);
                applyDataSettings(_tabbedContainer,t_settings);

                _tabbedContainer.find(t_settings.selector).each(function()
                {
                    var tabId = foundTabs.length+1;
                    var tabTitle = getAttr($(this),'data-title');
                    var tabClass = getAttr($(this),'data-class');

                    if (tabTitle == '') tabTitle = 'Tab '+tabId;

                    foundTabs.push({
                        id:tabId,
                        title:tabTitle,
                        class_:tabClass
                    });

                    setAttr($(this),'data-tabbedid',tabId);
                });

                if (foundTabs.length)
                {
                    var start_tab_shown = false;

                    var LITabs = '';
                    for (var j=0; j<foundTabs.length; j++)
                    {
                        LITabs += '<li class="'+foundTabs[j].class_+'"><a href="#" class="tabbedMenuButton" data-tabbedid="'+foundTabs[j].id+'">'+foundTabs[j].title+'</a></li>';
                    }
                    _tabbedContainer.before('<div class="tabbedMenu" style="display:none;"><ul>'+LITabs+'</ul></div>');

                    var defaultShowID = '0';
                    var _defaultShowOb = _tabbedContainer.find(t_settings.selector+'[data-default="true"]');
                    if (_defaultShowOb.length > 0)
                    {
                        defaultShowID = getAttr(_defaultShowOb,'data-tabbedid');
                    }

                    var _tabbedMenu = _tabbedContainer.prev();
                    _tabbedMenu.find('a.tabbedMenuButton').each(function(){

                        var _tabbedMenuButton = $(this);
                        var ftid = getAttr(_tabbedMenuButton,'data-tabbedid');

                        if (ftid != '')
                        {
                            var _tabbedContentItem = _tabbedContainer.find(t_settings.selector+'[data-tabbedid="'+ftid+'"]');

                            if (start_tab_shown || (defaultShowID != '0' && ftid != defaultShowID))
                            {
                                _tabbedContentItem.hide().removeClass('on');
                            }
                            else if (defaultShowID == '0' || ftid == defaultShowID)
                            {
                                _tabbedContentItem.show().addClass('on');
                                _tabbedMenuButton.parent().addClass('on');
                                start_tab_shown = true;
                            }
                            
                            _tabbedMenuButton.click(function(e){

                                if (!_tabbedMenuButton.parent().hasClass('on'))
                                {
                                    _tabbedContainer.find(t_settings.selector).each(function(){
                                        if ($(this).attr('data-tabbedid') != ftid)
                                        {
                                            $(this).hide().removeClass('on');
                                        }
                                    });
                                    _tabbedMenu.find('a.tabbedMenuButton').each(function(){
                                        if ($(this).attr('data-tabbedid') != ftid)
                                        {
                                            $(this).parent().removeClass('on');
                                        }
                                    });

                                    _tabbedContainer.find(t_settings.selector+'[data-tabbedid="'+ftid+'"]').show().addClass('on');
                                    _tabbedMenuButton.parent().addClass('on');
                                }
                                e.preventDefault();
                            });
                        }
                    });

                    if (t_settings.animateOnLoad === true || t_settings.animateOnLoad == 'true') _tabbedMenu.slideDown(500);
                    else _tabbedMenu.show();
                }
            });
        }
    }

    process($('.tabbed'),defaults);

})(jQuery);