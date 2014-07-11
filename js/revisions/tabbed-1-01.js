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
                    var tabTitle = $(this).attr('data-title');

                    if (typeof tabTitle === 'undefined' || tabTitle === false || tabTitle === '') tabTitle = 'Tab '+tabId;

                    foundTabs.push({
                        id:tabId,
                        title:tabTitle
                    });

                    $(this).attr('data-tabbedid',tabId);
                });

                if (foundTabs.length)
                {
                    var onstate = false;

                    var LITabs = '';
                    for (var i=0; i<foundTabs.length; i++)
                    {
                        LITabs += '<li><a href="#" class="tabbedTopButton" data-tabbedid="'+foundTabs[i].id+'">'+foundTabs[i].title+'</a></li>';
                    }
                    _tabbedContainer.before('<div class="tabbedTop" style="display:none;"><ul>'+LITabs+'</ul></div>');

                    var _tabbedTop = _tabbedContainer.prev();
                    _tabbedTop.find('a.tabbedTopButton').each(function(){

                        var _tabbedTopButton = $(this);
                        var ftid = _tabbedTopButton.attr('data-tabbedid');

                        if (!!ftid && ftid != '')
                        {
                            if (onstate)
                            {
                                _tabbedContainer.find(settings.tabselector+'[data-tabbedid="'+ftid+'"]').hide().removeClass('on');
                            }
                            else
                            {
                                _tabbedContainer.find(settings.tabselector+'[data-tabbedid="'+ftid+'"]').show().addClass('on');
                                _tabbedTopButton.parent().addClass('on');
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
                        onstate = true;
                    });
                    //_tabbedTop.slideDown(500);
                    _tabbedTop.show();
                }
            });
        }
    }

    process($('.tabbed'),defaults);

})(jQuery);