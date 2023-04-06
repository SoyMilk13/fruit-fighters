new ChangelogSection('Version 1.7 Update:', 'Added announcements', 'General bug fixes and background optimizations.', null)
new ChangelogSection('Version 1.6 Update:', 'Added animations when bombs are clicked.', null, null);
new ChangelogSection('Version 1.5 Update:', 'Fixed bug where peppers acted as bombs.', 'Updated fruit scale-- They should now appear larger on-screen.', null);
new ChangelogSection('Version 1.4 Update:', 'Added "Peppers;" when clicked, they will grant you double points for ten seconds.', 'Added "Strawberries"', null);
new ChangelogSection('Version 1.3 Update:', 'Added "How to Play" section.', null, null);
new ChangelogSection('Version 1.2 Update:', 'Added "Changelog"', null, null);
new ChangelogSection('Version 1.1 Update:', 'Added "Watermelons"', 'Fixed bug where fruits spawned off-screen.', null);

new Announcement('Version 1.7 Update!', null);
window.onload = () => {
    let shown = localStorage.getItem('announcementShown') === 'true';
    if (shown) {
        document.getElementById('announcementBox').style.display = 'none';
    }
};

new Version;