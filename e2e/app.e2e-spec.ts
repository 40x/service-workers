import { SwPage } from './app.po';

describe('sw App', () => {
  let page: SwPage;

  beforeEach(() => {
    page = new SwPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
