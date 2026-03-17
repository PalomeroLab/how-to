/**
 * @class ClipboardButton
 * @brief A class to create a clipboard copy button with a tooltip for code blocks.
 *
 * This class provides functionality to create a button for copying code blocks to the clipboard. It also displays a tooltip to indicate that the code has been copied.
 *
 * @param {HTMLElement} codeBlock - The code block element (usually a <pre> tag) to which the clipboard button will be attached.
 */
class ClipboardButton {
  /**
   * @constructor
   * @param {HTMLElement} codeBlock - The code block element to which the clipboard button will be attached.
   */
  constructor(codeBlock) {
    this.codeBlock = codeBlock;
    this.button = this.createButton();
    this.tooltip = this.createTooltip();
    this.wrapper = this.wrapCodeBlock();
    this.isClicked = false;
    this.isHovered = false;
    this.setupEventListeners();
  }

  /**
   * @method createButton
   * @brief Creates a button element for the clipboard.
   * @return {HTMLElement} The button element with the appropriate class and icon.
   */
  createButton() {
    const button = document.createElement("button");
    button.className = "clipboard-button";
    button.innerHTML = '<i class="fa-regular fa-copy"></i>';
    return button;
  }

  /**
   * @method createTooltip
   * @brief Creates a tooltip element for showing the copy status.
   * @return {HTMLElement} The tooltip element with the appropriate class.
   */
  createTooltip() {
    const tooltip = document.createElement("span");
    tooltip.className = "clipboard-tooltip";
    return tooltip;
  }

  /**
   * @method wrapCodeBlock
   * @brief Wraps the code block element with a new wrapper div and appends the button and tooltip.
   * @return {HTMLElement} The wrapper element that contains the code block, button, and tooltip.
   */
  wrapCodeBlock() {
    const wrapper = document.createElement("div");
    wrapper.className = "clipboard-wrapper";
    this.codeBlock.parentNode.insertBefore(wrapper, this.codeBlock);
    wrapper.appendChild(this.codeBlock);
    wrapper.appendChild(this.button);
    wrapper.appendChild(this.tooltip);
    return wrapper;
  }

  /**
   * @method setupEventListeners
   * @brief Sets up event listeners for the button element.
   *
   * Adds listeners for 'mouseenter', 'mouseleave', and 'click' events to handle hover and click actions.
   */
  setupEventListeners() {
    this.button.addEventListener("mouseenter", () => this.handleHover(true));
    this.button.addEventListener("mouseleave", () => this.handleHover(false));
    this.button.addEventListener("click", () => this.copyCode());
  }

  /**
   * @method handleHover
   * @brief Handles the hover state of the button.
   * @param {boolean} isHovered - Indicates whether the button is hovered.
   */
  handleHover(isHovered) {
    this.isHovered = isHovered;
    this.updateButtonIcon();
  }

  /**
   * @method updateButtonIcon
   * @brief Updates the button icon based on the current hover and click states.
   */
  updateButtonIcon() {
    if (this.isClicked) {
      this.button.innerHTML = this.isHovered
        ? '<i class="fa-solid fa-check"></i>'
        : '<i class="fa fa-check"></i>';
    } else {
      this.button.innerHTML = this.isHovered
        ? '<i class="fa-solid fa-copy"></i>'
        : '<i class="fa-regular fa-copy"></i>';
    }
  }

  /**
   * @method copyCode
   * @brief Copies the code block content to the clipboard and shows the tooltip.
   */
  copyCode() {
    const code = this.codeBlock.textContent;
    navigator.clipboard
      .writeText(code)
      .then(() => {
        this.isClicked = true;
        this.updateButtonIcon();
        this.showTooltip(code);
        setTimeout(() => {
          this.isClicked = false;
          this.updateButtonIcon();
          this.hideTooltip();
        }, 1500);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  }

  /**
   * @method showTooltip
   * @brief Shows the tooltip with the copied content information.
   * @param {string} code - The code that was copied to the clipboard.
   */
  showTooltip(code) {
    const byteSize = new Blob([code]).size;
    this.tooltip.textContent = `Copied ${byteSize} bytes to clipboard!`;
    this.tooltip.classList.add("show");
  }

  /**
   * @method hideTooltip
   * @brief Hides the tooltip.
   */
  hideTooltip() {
    this.tooltip.classList.remove("show");
  }
}

/**
 * @function
 * @brief Initializes ClipboardButton instances for all <pre> elements on document load.
 */
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll("pre")
    .forEach((codeBlock) => new ClipboardButton(codeBlock));
});
