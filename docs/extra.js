document.addEventListener('DOMContentLoaded', function() {
    var codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(function(codeBlock, index) {
        // Wrap the code block in a div
        var wrapper = document.createElement('div');
        wrapper.className = 'snippet-clipboard-content';
        codeBlock.parentNode.insertBefore(wrapper, codeBlock);
        wrapper.appendChild(codeBlock);

        // Create the copy button
        var copyButton = document.createElement('button');
        copyButton.innerHTML = '<i class="fa-solid fa-copy"></i><i class="fa-solid fa-check"></i>';
        copyButton.className = 'snippet-clipboard-copy-button';
        copyButton.id = 'snippet-clipboard-copy-button-' + index;
        wrapper.appendChild(copyButton);

        // Create tooltip
        var tooltip = document.createElement('span');
        tooltip.textContent = 'Copied to clipboard!';
        tooltip.className = 'copy-tooltip';
        wrapper.appendChild(tooltip);  // Append to wrapper instead of button

        // Add click event listener to the copy button
        copyButton.addEventListener('click', function() {
            var code = codeBlock.textContent;
            navigator.clipboard.writeText(code).then(function() {
                copyButton.classList.add('copied');
                tooltip.classList.add('show');
                setTimeout(function() {
                    copyButton.classList.remove('copied');
                    tooltip.classList.remove('show');
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy: ', err);
            });
        });
    });
});
