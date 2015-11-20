import webdriver from 'selenium-webdriver';

export function check(done, func) {
  try {
    func();
  } catch (ex) {
    done(ex);
  }
}

export function doBefore(done, action, load = './build/extension', port = 9515, browser = 'chrome') {
  this.driver = new webdriver.Builder()
    .usingServer(`http://localhost:${port}`)
    .withCapabilities({
      chromeOptions: {
        args: [
          '--disable-gpu',
          '--disable-impl-side-painting',
          '--disable-gpu-sandbox',
          '--no-sandbox',
          `load-extension=${load}`
        ]
      }
    })
    .forBrowser(browser)
    .build();
  action().then(() => done());
}

export function doAfter(done, timeout = 20000) {
  this.timeout(timeout);
  this.driver.quit().then(done);
}
