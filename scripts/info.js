new ChangelogSection('Version 1.8 Update:', 'Added the "Almanac"', null, null);
new ChangelogSection('Version 1.7 Update:', 'Added announcements', 'General bug fixes and background optimizations.', null);
new ChangelogSection('Version 1.6 Update:', 'Added animations when bombs are clicked.', null, null);
new ChangelogSection('Version 1.5 Update:', 'Fixed bug where peppers acted as bombs.', 'Updated fruit scale-- They should now appear larger on-screen.', null);
new ChangelogSection('Version 1.4 Update:', 'Added "Peppers;" when clicked, they will grant you double points for ten seconds.', 'Added "Strawberries"', null);
new ChangelogSection('Version 1.3 Update:', 'Added "How to Play" section.', null, null);
new ChangelogSection('Version 1.2 Update:', 'Added "Changelog"', null, null);
new ChangelogSection('Version 1.1 Update:', 'Added "Watermelons"', 'Fixed bug where fruits spawned off-screen.', null);

new Announcement('Version 1.8 Update: The Almanac is Here!', 'Added the almanac, a place where you can view information on each different fruit type.');

new Version;

function socialInvite(value) {
    let discord = value == 0;
    if (discord) {
        location.replace('https://discord.gg/kASrYbpt4w');
    }
};

new AlmanacPage('images/fruit-orange.png', 'Orange', '33%', '10', 'None', 'The orange was the first fruit added to Fruit Fighters.');
new AlmanacPage('images/fruit-watermelon.png', 'Watermelon', '33%', '10', 'None', 'Legend has it that a watermelon variant may be coming soon...');
new AlmanacPage('images/fruit-strawberry.png', 'Strawberry', '33%', '10', 'None', "Strawberries are the developer's favorite fruit!");
new AlmanacPage('images/fruit-pepper.png', 'Pepper', '5%', '10', 'When clicked, for 10 seconds, all fruits are worth double points.', 'The pepper was one of the most difficult fruits to create.');
new AlmanacPage('images/fruit-bomb-almanac-image.png', 'Bomb', '33%', '10', "When clicked, the user is deducted one life. (Don't do this!)", 'The orange was the first fruit added to Fruit Fighters.');
