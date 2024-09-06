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
        copyButton.textContent = 'Copy';
        copyButton.className = 'snippet-clipboard-copy-button';
        copyButton.id = 'snippet-clipboard-copy-button-' + index;
        wrapper.appendChild(copyButton);

        // Add click event listener to the copy button
        copyButton.addEventListener('click', function() {
            var code = codeBlock.textContent;
            navigator.clipboard.writeText(code).then(function() {
                copyButton.textContent = 'Copied!';
                setTimeout(function() {
                    copyButton.textContent = 'Copy';
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy: ', err);
            });
        });
    });
});
