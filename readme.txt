Tabbed.js

Supports multiple tabbed instances.

Example Tabs HTML:
<div class="tabbed">
  <div data-title="The First Tab" data-class="buttonclass">This is some spare text that was found recently.</div>
  <div data-title="The Second Tab" data-default="true">This is a second line of random text.</div>
  <div data-title="The Third Tab">A third tab to show amazing.</div>
</div>

Settings:
- selector : '>*' : specify the selector for tabs under the tabbed container
- animate_on_load : false : (true=slide the tab buttons into view) (false=show)
- on_change : null : specify a function for the event,
- after_change : null : specify a function for the event,
- empty_tab_titles : false : (true=allow empty tab titles) (false=force a tab title based on the id)

Tab Element Attributes:
- data-title : apply a description to the button
- data-class : apply a class to the button
- data-default : make this tab the first one to show

Hash Checker:
- Create links to show tabs by specifying a hash as: #tabbed-show-[tab title or id] e.g. #tabbed-show-3 or #tabbed-show-Reviews
- If using the title for the hash, a plain match is checked first then a check is made where hyphens are changed to spaces.

To switch tabs dynamically, you can change the hash of the location or you can grab a tabbed menu btn and trigger a click event on it.


@@@@@@@@@@@@@
Things to Add
@@@@@@@@@@@@@

- Ability to add tabs
- Ability to remove tabs


@@@@@@@
Updates
@@@@@@@

=== v1-13 ===
- added emptyTabTitles setting.
- changed the name of onChange setting to on_change.
- changed the name of afterChange setting to after_change.
- added hash checker functionality including onhashchange event.

=== v1-12 ===
- changed animateOnLoad to animate_on_load.
- added onChange event function option.
- added afterChange event function option.
- updated data settings parsing method.
- changed menu ul li structure to divs. classes are still the same.

=== v1-11 ===
- changed data names and class attributes to hyphenated.

=== v1-10 ===
- removed checkSettings function (redundant)
- added applyDataSettings function to get settings from .tabbed data attribute on container element.
- modified the way settings are handled to be unique between each tabbed.
- added tab data attribute "class" to apply a class to the li of the associated tab button.
- added "animateOnLoad" setting.
- changed "tabselector" setting to "selector".

=== v1-02 ===
- Can now use data-default attribute to specify which tab you want to display first.
- There is currently no feature for specifying default or tab titles through javascript initialisation.

=== v1-01 ===
- Can now have multiple instances of Tabbed on one page.
- Fixed problems with using ids, now is completely class based.

=== v1-00 ===
- Initial creation.
- Tabbed can be initialised using the class of "tabbed" on the container.
- Automatically uses one element with a class of "tabbed", selects any directly sub items and turns them into tabs.
- Uses data-title attribute for tab description.
- The tab navigation is generated dynamically.