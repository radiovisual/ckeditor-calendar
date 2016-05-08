/* eslint-disable no-undef, new-cap  */

// Force required settings on your CKEditor environment
// This should normally be done in your own configuration file
CKEDITOR.config.allowedContent = true;
CKEDITOR.title = false;
CKEDITOR.config.enterMode = 2;
CKEDITOR.config.removePlugins = 'iframe,div,stylesheetparser';

CKEDITOR.plugins.add('calendar', {
	// Important: icon file must match the button name, in lowercase
	icons: 'calendar',
	init: function (editor) {
		// add the iframe-insulator styles to the editor
		editor.addContentsCss(this.path + 'css/editor.css');

		editor.addCommand('calendar', new CKEDITOR.dialogCommand('calendarDialog', {
			allowedContent: 'iframe{*}[*];'
		}));

		editor.ui.addButton('Calendar', {
			label: 'Embed Google Calendar',
			command: 'calendar',
			toolbar: 'insert'
		});

		// Tell the editor to load the dialog file when the button is clicked.
		CKEDITOR.dialog.add('calendarDialog', this.path + 'dialogs/cke_google_calendar.js');

		// load the context menu
		if (editor.contextMenu) {
			// separate your context menu from others by putting it in its own group
			editor.addMenuGroup('calendarGroup');
			editor.addMenuItem('calendarItem', {
				label: 'Edit Google Calendar',
				icon: this.path + 'icons/calendar.png',
				command: 'calendar',
				group: 'calendarGroup'
			});

			// add an event listener function that will be called whenever the context menu is fired.
			editor.contextMenu.addListener(function (element) {
				var div = element.getAscendant('div', true);
				if (div && div.hasClass('calendar-insulator')) {
					return {calendarItem: CKEDITOR.TRISTATE_OFF};
				}
				return false;
			});
		}
	}
});
