new ChangelogSection('Version 2.0 Update:', 'Replaced lives text with heart icons.', 'Updated double time text to "Double points!"', null);
new ChangelogSection('Version 2.0 (Beta) Update:', 'Added "Frozen Watermelons"', null, null);
new ChangelogSection('Version 1.9 Update:', 'Added pause feature, press "p" to use it.', 'Added announcements when a life is lost.', null);
new ChangelogSection('Version 1.8 Update:', 'Added the "Almanac"', null, null);
new ChangelogSection('Version 1.7 Update:', 'Added announcements', 'General bug fixes and background optimizations.', null);
new ChangelogSection('Version 1.6 Update:', 'Added animations when bombs are clicked.', null, null);
new ChangelogSection('Version 1.5 Update:', 'Fixed bug where peppers acted as bombs.', 'Updated fruit scale-- They should now appear larger on-screen.', null);
new ChangelogSection('Version 1.4 Update:', 'Added "Peppers;" when clicked, they will grant you double points for ten seconds.', 'Added "Strawberries"', null);
new ChangelogSection('Version 1.3 Update:', 'Added "How to Play" section.', null, null);
new ChangelogSection('Version 1.2 Update:', 'Added "Changelog"', null, null);
new ChangelogSection('Version 1.1 Update:', 'Added "Watermelons"', 'Fixed bug where fruits spawned off-screen.', null);

new Announcement('New link!', 'This link is now officially outdated. It will no longer be updated, as I plan to move all nwe content to Food Fighters. To play the new version, go to: https://soymilk13.github.io/food-fighters/.');

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
new AlmanacPage('images/fruit-pepper.png', 'Pepper', '5%', '10', 'When clicked, for 10 seconds, all fruits are worth double points.', 'The pepper was one of the most difficult fruits, (artistically), to create.');
new AlmanacPage('images/fruit-bomb-almanac-image.png', 'Bomb', '33%', '10', "When clicked, the user is deducted one life. (Don't do this!)", 'Watch out!');
new AlmanacPage('images/fruit-frozen-watermelon.png', 'Frozen Watermelon', '2%', '10', 'When clicked, all fruits on the sceen are frozen for five seconds.', 'Grown only in the harshest conditions, these legendary fruits are said to be able to freeze time itself.');
