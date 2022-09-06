export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  prependItem(item) {
    this._container.prepend(item);
  }

  appendItem(item) {
    this._container.append(item);
  }

  renderItems(items) {
    items.forEach((item) => {
      const renderedItem = this._renderer(item);
      this.appendItem(renderedItem);
    });
  }
}
