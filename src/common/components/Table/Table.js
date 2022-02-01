import oView from 'ojs-view';
import { o } from 'ojs-core';
import './Table.scss';
import { OButton } from 'ojs-components';

class Table extends oView {
  constructor(props) {
    super(props);
    const { headers, body } = props;
    this.props = props;
    this.tableHeaders = this.mapHeaders(headers || []);
    this.tableBody = this.mapBody(body || []);
  }

  mapHeaders(headers) {
    return o('tr').add(
      headers.map(({ title, displayTitle }) => o('th').text(displayTitle || title)),
    );
  }

  additionalButtons() {}

  rowButtons(body, index) {
    const removeRowButton = new OButton({
      text: 'Usuń',
      type: 'primary-cancel',
      click: () => body.splice(index, 1),
    });

    if (Array.isArray(this.additionalButtons(body, index))) {
      return [...this.additionalButtons(body, index), removeRowButton];
    }

    return [removeRowButton];
  }

  mapBody(body) {
    const { headers } = this.props;
    return body.map((cell, index) => o('tr').class('tableRow').add(
      Object.values(headers).map(({ title: key }) => {
        key = key.toLowerCase();
        if (key === 'actions') {
          return;
        }

        return o('td').attr({ 'data-name': key }).text(cell[key] || '-');
      }),
      o('td').class('actionCell').add(
        this.rowButtons(body, index),
      ),
    ));
  }

  build() {
    return o('table').class('table').add(
      this.tableHeaders,
      this.tableBody,
    ).init();
  }
}

export { Table };
