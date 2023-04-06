var version = '1.7';

class ChangelogSection {
    constructor(header, updateItem1, updateItem2, updateItem3) {
        this.Draw(header, updateItem1, updateItem2, updateItem3);
    };
    Draw(header, updateItem1, updateItem2, updateItem3) {
        const updateSection = document.createElement('div');
        updateSection.style.marginBottom = '1%';
        updateSection.style.fontFamily = 'Mukta Vaani';

        const updateHeader = document.createElement('plaintext');
        updateHeader.innerHTML = header;
        updateHeader.style.fontWeight = 'bold';
        updateHeader.style.fontSize = '16px';
        updateHeader.style.marginLeft = '5%';
        updateHeader.style.fontFamily = 'Mukta Vaani';

        const updateContent = document.createElement('ul');
        updateContent.style.listStyleType = 'none';
        updateContent.style.marginLeft = '5%';
        updateContent.style.fontFamily = 'Mukta Vaani';

        const itemOne = document.createElement('li');
        itemOne.innerHTML = updateItem1;
        itemOne.style.fontFamily = 'Mukta Vaani';

        const itemTwo = (updateItem2 !== null) ? document.createElement('li') : null;
        (itemTwo == null) ? null : itemTwo.innerHTML = updateItem2;
        (itemTwo == null) ? null : itemTwo.style.fontFamily = 'Mukta Vaani';

        const itemThree = (updateItem3 !== null) ? document.createElement('li') : null;
        (itemThree == null) ? null : itemThree.innerHTML = updateItem3;
        (itemThree == null) ? null : itemThree.style.fontFamily = 'Mukta Vaani';

        updateSection.appendChild(updateHeader);
        updateContent.appendChild(itemOne);
        (itemTwo == null) ? null : updateContent.appendChild(itemTwo);
        (itemThree == null) ? null : updateContent.appendChild(itemThree);
        updateSection.appendChild(updateContent);
        const changelogContent = document.getElementById('changelogContent');
        changelogContent.appendChild(updateSection);
    };
};

class Announcement {
    constructor(title, content) {
        this.Draw(title, content);
    };
    Draw(title, content) {
        const announcementBox = document.createElement('div');
        announcementBox.id = 'announcementBox';
        announcementBox.style.zIndex = 10;
        announcementBox.style.position = 'absolute';
        announcementBox.style.left = '50%';
        announcementBox.style.top = '50%';
        announcementBox.style.width = '40%';
        announcementBox.style.height = 'flex';
        announcementBox.style.minHeight = '10%';
        announcementBox.style.transform = 'translate(-50%, -50%)';
        announcementBox.style.border = '2px solid darkorange';
        announcementBox.style.borderRadius = '5px';
        announcementBox.style.backgroundColor = 'orange';
        announcementBox.style.fontFamily = 'Mukta Vaani';

        const announcementTitle = document.createElement('plaintext');
        announcementTitle.innerHTML = title;
        announcementTitle.style.textAlign = 'center';
        announcementTitle.style.fontWeight = 'bold';
        announcementTitle.style.fontSize = '20px';
        announcementTitle.style.marginBottom = '1%';
        announcementTitle.style.fontFamily = 'Mukta Vaani';

        const announcementContent = document.createElement('plaintext');
        announcementContent.innerHTML = content;
        announcementContent.style.textAlign = 'center';
        announcementContent.style.fontFamily = 'Mukta Vaani';

        const closeButton = document.createElement('plaintext');
        closeButton.innerHTML = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = 0;
        closeButton.style.right = '1%';
        closeButton.style.fontWeight = 'bold';
        closeButton.style.fontFamily = 'Mukta Vaani';
        closeButton.style.pointerEvents = 'click';
        closeButton.onclick = () => {
            announcementBox.style.display = 'none';
            localStorage.setItem('announcementShown', true);
        };

        announcementBox.appendChild(announcementTitle);
        announcementBox.appendChild(announcementContent);
        announcementBox.appendChild(closeButton);
        document.body.appendChild(announcementBox);
    };
};

class Version {
    constructor() {
        this.Draw();
    };
    Draw() {
        const versionText = document.createElement('plaintext');
        versionText.innerHTML = 'Version ' + version;
        versionText.style.position = 'absolute';
        versionText.style.bottom = 0;
        versionText.style.right = '5px';
        versionText.style.fontSize = '15px';
        versionText.style.fontFamily = 'Mukta Vaani';

        document.body.appendChild(versionText);
    };
};