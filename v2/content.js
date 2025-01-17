function processAvatars() {
    const avatarStacks = document.querySelectorAll('.pc-AvatarStackBody');

    avatarStacks.forEach((stack, index) => {
        const avatarLinks = stack.querySelectorAll('a.pc-AvatarItem');

        const names = [];

        avatarLinks.forEach(avatarLink => {
            const avatar = avatarLink.querySelector('img');
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

// Create a MutationObserver to watch for DOM changes
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
            const hasAvatarStack = [...mutation.addedNodes].some(node => 
                node.querySelector && node.querySelector('.pc-AvatarStackBody')
            );
            
            if (hasAvatarStack) {
                // Small delay to ensure avatars are fully loaded
                setTimeout(processAvatars, 100);
            }
        }
    }
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial run for any avatars already in the page
processAvatars();
