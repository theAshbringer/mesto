export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderItems(items) {
    items.forEach(async (item) => {
      const renderedItem = await this._renderer(item);
      this.addItem(renderedItem);
    });
  }
}
