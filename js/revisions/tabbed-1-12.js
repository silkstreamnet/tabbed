(function($){

    var defaults = {
        selector:'>*',
        animate_on_load:false,
        onChange:false,
        afterChange:false
    };

    $.fn.Tabbed = function(options)
    {
        var settings = $.extend({},defaults,options);
        process(this,settings);
    };

    function getAttrString(obj,attr)
    {
        var attrval = obj.attr(attr);
        if (typeof attrval === 'undefined' || attrval === false || attrval === '') attrval = '';
        return attrval;
    }

    function applyDataSettings(object,defaults,settings,stage)
    {
        stage = stage || '';

        for (var p in defaults)
        {
            if (defaults.hasOwnProperty(p))
            {
                if (typeof defaults[p] === 'object')
                {
                    if (typeof settings[p] !== 'object') settings[p] = {};
                    applyDataSettings(object,defaults[p],settings[p],stage+p.toLowerCase().replace('_','-')+'-');
                }
                else
                {
                    var data = object.data(stage+p.toLowerCase().replace('_','-'));
                    if (typeof data !== 'undefined')
                    {
                        var datafloat = parseFloat(data);
                        if (data == 'true') data = !0;
                        else if (data == 'false') data = !1;
                        else if (datafloat == data) data = datafloat;

                        settings[p] = data;
                    }
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
                applyDataSettings(_tabbedContainer,defaults,t_settings);

                _tabbedContainer.find(t_settings.selector).each(function()
                {
                    var tabId = foundTabs.length+1;
                    var tabTitle = getAttrString($(this),'data-title');
                    var tabClass = getAttrString($(this),'data-class');

                    if (tabTitle == '') tabTitle = 'Tab '+tabId;

                    foundTabs.push({
                        id:tabId,
                        title:tabTitle,
                        class_:tabClass
                    });

                    $(this).attr('data-tabbed-id',tabId);
                });

                if (foundTabs.length)
                {
                    var start_tab_shown = false;

                    var LITabs = '';
                    for (var j=0; j<foundTabs.length; j++)
                    {
                        LITabs += '<div class="tabbed-menu-btn '+foundTabs[j].class_+'"><a href="#" data-tabbed-id="'+foundTabs[j].id+'">'+foundTabs[j].title+'</a></div>';
                    }
                    _tabbedContainer.before('<div class="tabbed-menu" style="display:none;"><div class="tabbed-menu-wrap">'+LITabs+'</div></div>');

                    var defaultShowID = '0';
                    var _defaultShowOb = _tabbedContainer.find(t_settings.selector+'[data-default="true"]');
                    if (_defaultShowOb.length > 0)
                    {
                        defaultShowID = _defaultShowOb.data('tabbed-id');
                    }

                    var _tabbedMenu = _tabbedContainer.prev();
                    _tabbedMenu.find('.tabbed-menu-btn a').each(function(){

                        var _tabbedMenuButton = $(this),
                            ftid = _tabbedMenuButton.data('tabbed-id');

                        if (ftid != '')
                        {
                            var _tabbedContentItem = _tabbedContainer.find(t_settings.selector+'[data-tabbed-id="'+ftid+'"]');

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
                        }
                    });

                    _tabbedMenu.on('click','.tabbed-menu-btn a',function(e){
                        e.preventDefault();
                        var _tabbedMenuButton = $(this),
                            ftid = _tabbedMenuButton.data('tabbed-id'),
                            $tab = _tabbedContainer.find(t_settings.selector+'[data-tabbed-id="'+ftid+'"]');

                        if (!_tabbedMenuButton.parent().hasClass('on'))
                        {
                            if (typeof t_settings.onChange === 'function') t_settings.onChange($tab,_tabbedMenuButton,ftid);

                            _tabbedContainer.find(t_settings.selector).each(function(){
                                var $tabbed_container_item = $(this);
                                if ($tabbed_container_item.data('tabbed-id') != ftid)
                                {
                                    $tabbed_container_item.hide().removeClass('on');
                                }
                            });

                            _tabbedMenu.find('.tabbed-menu-btn a').each(function(){
                                var $tabbed_menu_item = $(this);
                                if ($tabbed_menu_item.data('tabbed-id') != ftid)
                                {
                                    $tabbed_menu_item.parent().removeClass('on');
                                }
                            });

                            $tab.show().addClass('on');
                            _tabbedMenuButton.parent().addClass('on');

                            if (typeof t_settings.afterChange === 'function') t_settings.afterChange($tab,_tabbedMenuButton,ftid);
                        }
                        return false;
                    });

                    if (t_settings.animate_on_load) _tabbedMenu.slideDown(500);
                    else _tabbedMenu.show();
                }
            });
        }
    }

    process($('.tabbed'),defaults);

})(jQuery);