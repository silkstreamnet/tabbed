(function($){

    var defaults = {
        tabselector:'>*'
    };

    $.fn.Tabbed = function(options)
    {
        var settings = $.extend({},defaults,options);
        process(this,settings);
    };

    function checkSettings(settings)
    {
        if (!settings.tabselector) return false;
        return true;
    }

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

    function process(_tabbedContainers,settings)
    {
        if (_tabbedContainers && _tabbedContainers.length > 0 && checkSettings(settings))
        {
            _tabbedContainers.each(function(i)
            {
                var _tabbedContainer = $(this);
                var foundTabs = [];

                _tabbedContainer.find(settings.tabselector).each(function()
                {
                    var tabId = foundTabs.length+1;
                    var tabTitle = getAttr($(this),'data-title');

                    if (tabTitle == '') tabTitle = 'Tab '+tabId;

                    foundTabs.push({
                        id:tabId,
                        title:tabTitle
                    });

                    setAttr($(this),'data-tabbedid',tabId);
                });

                if (foundTabs.length)
                {
                    var start_tab_shown = false;

                    var LITabs = '';
                    for (var i=0; i<foundTabs.length; i++)
                    {
                        LITabs += '<li><a href="#" class="tabbedTopButton" data-tabbedid="'+foundTabs[i].id+'">'+foundTabs[i].title+'</a></li>';
                    }
                    _tabbedContainer.before('<div class="tabbedTop" style="display:none;"><ul>'+LITabs+'</ul></div>');

                    var defaultShowID = '0';
                    var _defaultShowOb = _tabbedContainer.find(settings.tabselector+'[data-default="true"]');
                    if (_defaultShowOb.length > 0)
                    {
                        defaultShowID = getAttr(_defaultShowOb,'data-tabbedid');
                    }

                    var _tabbedTop = _tabbedContainer.prev();
                    _tabbedTop.find('a.tabbedTopButton').each(function(){

                        var _tabbedTopButton = $(this);
                        var ftid = getAttr(_tabbedTopButton,'data-tabbedid');

                        if (ftid != '')
                        {
                            var _tabbedContentItem = _tabbedContainer.find(settings.tabselector+'[data-tabbedid="'+ftid+'"]');

                            if (start_tab_shown || (defaultShowID != '0' && ftid != defaultShowID))
                            {
                                _tabbedContentItem.hide().removeClass('on');
                            }
                            else if (defaultShowID == '0' || ftid == defaultShowID)
                            {
                                _tabbedContentItem.show().addClass('on');
                                _tabbedTopButton.parent().addClass('on');
                                start_tab_shown = true;
                            }
                            
                            _tabbedTopButton.click(function(e){

                                if (!_tabbedTopButton.parent().hasClass('on'))
                                {
                                    _tabbedContainer.find(settings.tabselector).each(function(){
                                        if ($(this).attr('data-tabbedid') != ftid)
                                        {
                                            $(this).hide().removeClass('on');
                                        }
                                    });
                                    _tabbedTop.find('a.tabbedTopButton').each(function(){
                                        if ($(this).attr('data-tabbedid') != ftid)
                                        {
                                            $(this).parent().removeClass('on');
                                        }
                                    });

                                    _tabbedContainer.find(settings.tabselector+'[data-tabbedid="'+ftid+'"]').show().addClass('on');
                                    _tabbedTopButton.parent().addClass('on');
                                }
                                e.preventDefault();
                            });
                        }
                    });
                    //_tabbedTop.slideDown(500);
                    _tabbedTop.show();
                }
            });
        }
    }

    process($('.tabbed'),defaults);

})(jQuery);