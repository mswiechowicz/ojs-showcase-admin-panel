import './Modal.scss';
import { o, oRender, oRef } from 'ojs-core';

class Modal {
  constructor(title) {
    this.title = title;
    this.modalRef = oRef();
  }

  close() {
    this.unmount();
  }

  build(body) {
    return o('div').class('modal').ref(this.modalRef)
      .add(
        o('div').class('modal__background').click(() => this.close()),
        o('div').class('modal__window')
          .add(
            o('div').class('modalWindow__header').add(
              o('h2').text(this.title),
              o('button').html('&#x2715').click(() => this.close()),
            ),
            o('div').class('modalWindow__body')
              .add(
                body,
              ),
          ),
      );
  }

  unmount() {
    this.modalRef.target.remove();
    document.body.classList.remove('scroll-block');
  }

  mount(body) {
    const html = this.build(body);
    oRender(document.body, html);
    document.body.classList.add('scroll-block');
  }
}

export { Modal };
