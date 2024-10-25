function processAvatars() {
    const avatarStacks = document.querySelectorAll('.Box .AvatarStack-body');

    avatarStacks.forEach((stack, index) => {
        const avatarLinks = stack.querySelectorAll('a.avatar');

        const names = [];

        avatarLinks.forEach(avatarLink => {
            const avatar = avatarLink.querySelector('img.avatar-user');
            if (avatar) {
                names.push(avatar.alt.replace('@', ''));
            }
        });

        const concatenatedAltText = names.join(', ');

        if (concatenatedAltText && !stack.querySelector('.avatar-alt-text')) {
            // Create the alt text element
            const altText = document.createElement('div');
            altText.classList.add('avatar-alt-text');
            altText.textContent = concatenatedAltText.trim();

            // Insert the alt text before the first avatar link
            stack.insertBefore(altText, avatarLinks[0]);
        }
    });
}

// Run the function when the page loads
processAvatars();
