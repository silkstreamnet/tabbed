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
- animateOnLoad : false : (true=slide the tab buttons into view) (false=show)

Tab Element Attributes:
- data-title : apply a description to the button
- data-class : apply a class to the button
- data-default : make this tab the first one to show



@@@@@@@
Updates
@@@@@@@

=== v1-10 ===
- removed checkSettings function (redundant)
- added applyDataSettings function to get settings from .tabbed data attribute on container element.
- modified the way settings are handled to be unique between each tabbed.
- added tab data attribute "class" to apply a class to the li of the associated tab button.
- added "animateOnLoad" setting.
- changed "tabselector" setting to "selector".

=== v1-00 to v1-02 is undocumented  ===
- information unknown, possible retrieval from svn.